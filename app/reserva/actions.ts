'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/prisma';

// Schema for public booking validation
const bookingSchema = z.object({
  servicioId: z.string().min(1, 'Debe seleccionar un servicio'),
  fechaHora: z.string().min(1, 'Debe seleccionar una fecha y hora'),
  tutorNombre: z.string().min(2, 'El nombre del tutor debe tener al menos 2 caracteres'),
  tutorEmail: z.string().email('Email del tutor inválido'),
  tutorWhatsapp: z.string().min(5, 'El WhatsApp debe tener al menos 5 caracteres'),
  pacienteNombre: z.string().min(2, 'El nombre del paciente debe tener al menos 2 caracteres'),
  pacienteFechaNac: z.string().optional(),
});

export async function crearReservaPublica(formData: FormData) {
  try {
    // Extract and validate form data
    const servicioId = formData.get('servicioId') as string;
    const fechaHora = formData.get('fechaHora') as string;
    const tutorNombre = formData.get('tutorNombre') as string;
    const tutorEmail = formData.get('tutorEmail') as string;
    const tutorWhatsapp = formData.get('tutorWhatsapp') as string;
    const pacienteNombre = formData.get('pacienteNombre') as string;
    const pacienteFechaNac = formData.get('pacienteFechaNac') as string;

    const validatedData = bookingSchema.parse({
      servicioId,
      fechaHora,
      tutorNombre,
      tutorEmail,
      tutorWhatsapp,
      pacienteNombre,
      pacienteFechaNac: pacienteFechaNac || undefined,
    });

    // Find the first professional
    const profesional = await prisma.profesional.findFirst({
      orderBy: { creadoEn: 'asc' },
    });

    if (!profesional) {
      return {
        success: false,
        error: 'No hay profesionales disponibles en este momento.',
      };
    }

    // Verify service exists
    const servicio = await prisma.servicio.findFirst({
      where: {
        id: validatedData.servicioId,
        profesionalId: profesional.id,
      },
    });

    if (!servicio) {
      return {
        success: false,
        error: 'El servicio seleccionado no está disponible.',
      };
    }

    // Check if there's already a turn at the same time
    const existingTurno = await prisma.turno.findFirst({
      where: {
        profesionalId: profesional.id,
        fechaHora: new Date(validatedData.fechaHora),
        estado: {
          not: 'CANCELADO',
        },
      },
    });

    if (existingTurno) {
      return {
        success: false,
        error: 'Ya existe un turno agendado para esta fecha y hora. Por favor, seleccione otro horario.',
      };
    }

    // Find or create tutor
    let tutor = await prisma.tutor.findUnique({
      where: { email: validatedData.tutorEmail },
    });

    if (!tutor) {
      // Create new tutor
      tutor = await prisma.tutor.create({
        data: {
          nombre: validatedData.tutorNombre,
          email: validatedData.tutorEmail,
          whatsapp: validatedData.tutorWhatsapp,
        },
      });
    } else {
      // Update existing tutor info if needed
      tutor = await prisma.tutor.update({
        where: { id: tutor.id },
        data: {
          nombre: validatedData.tutorNombre,
          whatsapp: validatedData.tutorWhatsapp,
        },
      });
    }

    // Find or create patient
    let paciente = await prisma.paciente.findFirst({
      where: {
        nombre: validatedData.pacienteNombre,
        tutorId: tutor.id,
        profesionalId: profesional.id,
      },
    });

    if (!paciente) {
      // Create new patient
      paciente = await prisma.paciente.create({
        data: {
          nombre: validatedData.pacienteNombre,
          fechaNac: validatedData.pacienteFechaNac ? new Date(validatedData.pacienteFechaNac) : null,
          tutorId: tutor.id,
          profesionalId: profesional.id,
        },
      });
    }

    // Create the turn
    const turno = await prisma.turno.create({
      data: {
        fechaHora: new Date(validatedData.fechaHora),
        estado: 'PENDIENTE_PAGO',
        tokenReserva: uuidv4(),
        pacienteId: paciente.id,
        servicioId: validatedData.servicioId,
        profesionalId: profesional.id,
      },
      include: {
        paciente: {
          include: {
            tutor: true,
          },
        },
        servicio: true,
        profesional: {
          select: {
            nombre: true,
            especialidad: true,
          },
        },
      },
    });

    // Redirect to success page with token
    redirect(`/reserva/exito?token=${turno.tokenReserva}`);
    
  } catch (error) {
    console.error('Error al crear reserva pública:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || 'Datos inválidos',
      };
    }

    return {
      success: false,
      error: 'Error al procesar la reserva. Intente nuevamente.',
    };
  }
}

// Function to get professional info for public page
export async function getProfesionalPublic() {
  try {
    const profesional = await prisma.profesional.findFirst({
      orderBy: { creadoEn: 'asc' },
      select: {
        id: true,
        nombre: true,
        especialidad: true,
      },
    });

    if (!profesional) {
      return { success: false, error: 'No hay profesionales disponibles' };
    }

    return { success: true, data: profesional };
  } catch (error) {
    console.error('Error al obtener información del profesional:', error);
    return { success: false, error: 'Error al cargar la información' };
  }
}

// Function to get services for public booking
export async function getServiciosPublic() {
  try {
    // Find the first professional
    const profesional = await prisma.profesional.findFirst({
      orderBy: { creadoEn: 'asc' },
    });

    if (!profesional) {
      return { success: false, error: 'No hay profesionales disponibles' };
    }

    // Get services for this professional
    const servicios = await prisma.servicio.findMany({
      where: {
        profesionalId: profesional.id,
      },
      orderBy: {
        nombre: 'asc',
      },
    });

    return { success: true, data: servicios };
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    return { success: false, error: 'Error al cargar los servicios' };
  }
}

// Function to get turn details by token for success page
export async function getTurnoByToken(token: string) {
  try {
    const turno = await prisma.turno.findUnique({
      where: { tokenReserva: token },
      include: {
        paciente: {
          include: {
            tutor: true,
          },
        },
        servicio: true,
        profesional: {
          select: {
            nombre: true,
            especialidad: true,
          },
        },
      },
    });

    if (!turno) {
      return { success: false, error: 'Turno no encontrado' };
    }

    return { success: true, data: turno };
  } catch (error) {
    console.error('Error al obtener turno:', error);
    return { success: false, error: 'Error al cargar el turno' };
  }
}
