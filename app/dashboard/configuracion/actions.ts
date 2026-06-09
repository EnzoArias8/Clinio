'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Schema for service creation validation
const servicioSchema = z.object({
  nombre: z.string().min(2, 'El nombre del servicio debe tener al menos 2 caracteres'),
  precio: z.number().min(0, 'El precio debe ser un número positivo'),
  duracionMin: z.number().min(15, 'La duración mínima es de 15 minutos').max(300, 'La duración máxima es de 300 minutos'),
});

// Schema for Mercado Pago token validation
const mpTokenSchema = z.object({
  mpAccessToken: z.string().optional(),
});

// Schema for working hours validation
const horariosSchema = z.object({
  horarioInicio: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido'),
  horarioFin: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido'),
  diasAtencion: z.array(z.string()).min(1, 'Debes seleccionar al menos un día'),
});

const horarioYServicioSchema = horariosSchema.extend({
  nombreSesion: z.string().min(1, 'El nombre de la sesión es requerido'),
  duracionSesion: z.number().min(15).max(300),
  precioConsulta: z.number().min(0),
})

export async function crearServicio(formData: FormData) {
  try {
    // Extract and validate form data
    const nombre = formData.get('nombre') as string;
    const precio = parseFloat(formData.get('precio') as string);
    const duracionMin = parseInt(formData.get('duracionMin') as string);

    const validatedData = servicioSchema.parse({
      nombre,
      precio,
      duracionMin,
    });

    // Get current authenticated professional
    const profesional = await requireAuth();

    // Check if service with this name already exists for this professional
    const existingServicio = await prisma.servicio.findFirst({
      where: {
        nombre: validatedData.nombre,
        profesionalId: profesional.id,
      },
    });

    if (existingServicio) {
      return {
        success: false,
        error: 'Ya existe un servicio con este nombre para su perfil.',
      };
    }

    // Create new service
    const servicio = await prisma.servicio.create({
      data: {
        nombre: validatedData.nombre,
        precio: validatedData.precio,
        duracionMin: validatedData.duracionMin,
        profesionalId: profesional.id,
      },
      include: {
        profesional: {
          select: {
            nombre: true,
            especialidad: true,
          },
        },
      },
    });

    // Revalidate the configuration page to show the new service
    revalidatePath('/dashboard/configuracion');
    
    return {
      success: true,
      data: servicio,
    };
    
  } catch (error) {
    console.error('Error al crear servicio:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || 'Datos inválidos',
      };
    }

    return {
      success: false,
      error: 'Error al crear el servicio. Intente nuevamente.',
    };
  }
}

// Function to get all services for the current professional
export async function getServicios() {
  try {
    // Get current authenticated professional
    const profesional = await requireAuth();

    // Get services for this professional
    const servicios = await prisma.servicio.findMany({
      where: {
        profesionalId: profesional.id,
      },
      include: {
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

    return { success: true, data: servicios };
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    return { success: false, error: 'Error al cargar los servicios' };
  }
}

// Function to update Mercado Pago token
export async function actualizarMpToken(formData: FormData) {
  try {
    // Extract and validate form data
    const mpAccessToken = formData.get('mpAccessToken') as string;

    const validatedData = mpTokenSchema.parse({
      mpAccessToken: mpAccessToken || undefined,
    });

    // Get current authenticated professional
    const profesional = await requireAuth();

    // Update professional's Mercado Pago token
    const updatedProfesional = await prisma.profesional.update({
      where: { id: profesional.id },
      data: {
        mpAccessToken: validatedData.mpAccessToken,
      },
      select: {
        id: true,
        nombre: true,
        especialidad: true,
        email: true,
        mpAccessToken: true,
      },
    });

    // Revalidate the configuration page
    revalidatePath('/dashboard/configuracion');
    
    return {
      success: true,
      data: updatedProfesional,
    };
    
  } catch (error) {
    console.error('Error al actualizar token de Mercado Pago:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || 'Datos inválidos',
      };
    }

    return {
      success: false,
      error: 'Error al actualizar el token. Intente nuevamente.',
    };
  }
}

// Function to get professional info
export async function getProfesionalInfo() {
  try {
    const profesional = await requireAuth();
    
    return { success: true, data: profesional };
  } catch (error) {
    console.error('Error al obtener información del profesional:', error);
    return { success: false, error: 'Error al cargar la información del profesional' };
  }
}

// Function to update working hours
export async function actualizarHorarios(data: {
  horarioInicio: string
  horarioFin: string
  diasAtencion: string[]
  nombreSesion: string
  duracionSesion: number | string
  precioConsulta: number | string
  horarioInicio2?: string
  horarioFin2?: string
}) {
  try {
    const validatedData = horarioYServicioSchema.parse({
      ...data,
      duracionSesion: Number(data.duracionSesion),
      precioConsulta: Number(data.precioConsulta),
    });

    const profesional = await requireAuth();

    const updatedProfesional = await prisma.profesional.update({
      where: { id: profesional.id },
      data: {
        horarioInicio: validatedData.horarioInicio,
        horarioFin: validatedData.horarioFin,
        diasAtencion: validatedData.diasAtencion,
        nombreSesion: validatedData.nombreSesion,
        duracionSesion: validatedData.duracionSesion,
        precioConsulta: validatedData.precioConsulta,
        horarioInicio2: validatedData.horarioInicio2,
        horarioFin2: validatedData.horarioFin2,
      },
    });

    revalidatePath('/dashboard/configuracion');
    revalidatePath('/dashboard/agenda');
    
    return {
      success: true,
      data: updatedProfesional,
    };
  } catch (error) {
    console.error('Error al actualizar horarios:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Error al actualizar los horarios' };
  }
}

// Function to delete a service
export async function eliminarServicio(servicioId: string) {
  try {
    const profesional = await requireAuth();

    // Verify that the service belongs to the current professional
    const servicio = await prisma.servicio.findFirst({
      where: {
        id: servicioId,
        profesionalId: profesional.id,
      },
    });

    if (!servicio) {
      return {
        success: false,
        error: 'Servicio no encontrado o no tienes permiso para eliminarlo',
      };
    }

    // Delete the service
    await prisma.servicio.delete({
      where: { id: servicioId },
    });

    // Revalidate the configuration page
    revalidatePath('/dashboard/configuracion');

    return {
      success: true,
      message: `Servicio "${servicio.nombre}" eliminado exitosamente`,
    };
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    return {
      success: false,
      error: 'Error al eliminar el servicio. Intente nuevamente.',
    };
  }
}

// Function to edit a service
export async function editarServicio(servicioId: string, formData: FormData) {
  try {
    const nombre = formData.get('nombre') as string;
    const precio = parseFloat(formData.get('precio') as string);
    const duracionMin = parseInt(formData.get('duracionMin') as string);

    const validatedData = servicioSchema.parse({
      nombre,
      precio,
      duracionMin,
    });

    const profesional = await requireAuth();

    // Verify that the service belongs to the current professional
    const servicio = await prisma.servicio.findFirst({
      where: {
        id: servicioId,
        profesionalId: profesional.id,
      },
    });

    if (!servicio) {
      return {
        success: false,
        error: 'Servicio no encontrado o no tienes permiso para editarlo',
      };
    }

    // Check if another service with the same name exists (excluding current service)
    const existingServicio = await prisma.servicio.findFirst({
      where: {
        nombre: validatedData.nombre,
        profesionalId: profesional.id,
        id: {
          not: servicioId,
        },
      },
    });

    if (existingServicio) {
      return {
        success: false,
        error: 'Ya existe otro servicio con este nombre para su perfil.',
      };
    }

    // Update the service
    const updatedServicio = await prisma.servicio.update({
      where: { id: servicioId },
      data: {
        nombre: validatedData.nombre,
        precio: validatedData.precio,
        duracionMin: validatedData.duracionMin,
      },
    });

    // Revalidate the configuration page
    revalidatePath('/dashboard/configuracion');

    return {
      success: true,
      data: updatedServicio,
      message: 'Servicio actualizado exitosamente',
    };
  } catch (error) {
    console.error('Error al editar servicio:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || 'Datos inválidos',
      };
    }

    return {
      success: false,
      error: 'Error al actualizar el servicio. Intente nuevamente.',
    };
  }
}
