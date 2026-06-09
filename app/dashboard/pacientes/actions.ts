'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Schema for patient registration validation
const pacienteSchema = z.object({
  nombre: z.string().min(2, 'El nombre del paciente debe tener al menos 2 caracteres'),
  fechaNac: z.string().optional(),
  tutorNombre: z.string().min(2, 'El nombre del tutor debe tener al menos 2 caracteres'),
  tutorEmail: z.string().email('Email del tutor inválido'),
  tutorWhatsapp: z.string().min(5, 'El WhatsApp debe tener al menos 5 caracteres'),
});

export async function crearPaciente(formData: FormData) {
  try {
    // Extract and validate form data
    const nombre = formData.get('nombre') as string;
    const fechaNac = formData.get('fechaNac') as string;
    const tutorNombre = formData.get('tutorNombre') as string;
    const tutorEmail = formData.get('tutorEmail') as string;
    const tutorWhatsapp = formData.get('tutorWhatsapp') as string;

    const validatedData = pacienteSchema.parse({
      nombre,
      fechaNac: fechaNac || undefined,
      tutorNombre,
      tutorEmail,
      tutorWhatsapp,
    });

    // Get current authenticated professional
    const profesional = await requireAuth();

    // Check if tutor with this email already exists
    const existingTutor = await prisma.tutor.findFirst({
      where: { email: validatedData.tutorEmail },
    });

    let tutor;

    if (existingTutor) {
      // Use existing tutor
      tutor = existingTutor;
    } else {
      // Create new tutor
      tutor = await prisma.tutor.create({
        data: {
          nombre: validatedData.tutorNombre,
          email: validatedData.tutorEmail,
          whatsapp: validatedData.tutorWhatsapp,
        },
      });
    }

    // Create new patient
    const paciente = await prisma.paciente.create({
      data: {
        nombre: validatedData.nombre,
        fechaNac: validatedData.fechaNac ? new Date(validatedData.fechaNac) : null,
        tutorId: tutor.id,
        profesionalId: profesional.id,
      },
      include: {
        tutor: true,
        profesional: true,
      },
    });

    // Redirect to patients list on success
    redirect('/dashboard/pacientes');
    
  } catch (error) {
    console.error('Error al crear paciente:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || 'Datos inválidos',
      };
    }

    return {
      success: false,
      error: 'Error al crear el paciente. Intente nuevamente.',
    };
  }
}

// Function to get all patients for the current professional with their tutors
export async function getPacientes() {
  try {
    const profesional = await requireAuth();
    
    const pacientes = await prisma.paciente.findMany({
      where: {
        profesionalId: profesional.id,
      },
      include: {
        tutor: true,
        profesional: {
          select: {
            nombre: true,
            especialidad: true,
          },
        },
      },
      orderBy: {
        nombre: 'asc',
      },
    });

    return { success: true, data: pacientes };
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    return { success: false, error: 'Error al cargar los pacientes' };
  }
}
