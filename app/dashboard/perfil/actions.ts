'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Schema for profile update validation
const perfilSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  especialidad: z.string().min(2, 'La especialidad debe tener al menos 2 caracteres'),
  fotoPerfil: z.string().optional(),
});

export async function actualizarPerfil(formData: FormData) {
  try {
    const nombre = formData.get('nombre') as string;
    const especialidad = formData.get('especialidad') as string;
    const fotoPerfil = formData.get('fotoPerfil') as string | null;

    const validatedData = perfilSchema.parse({
      nombre,
      especialidad,
      fotoPerfil: fotoPerfil || undefined,
    });

    const profesional = await requireAuth();

    const updatedProfesional = await prisma.profesional.update({
      where: { id: profesional.id },
      data: {
        nombre: validatedData.nombre,
        especialidad: validatedData.especialidad,
        fotoPerfil: validatedData.fotoPerfil,
      },
      select: {
        id: true,
        nombre: true,
        especialidad: true,
        fotoPerfil: true,
        email: true,
      },
    });

    revalidatePath('/dashboard/perfil');
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/layout');
    
    return {
      success: true,
      data: updatedProfesional,
    };
  } catch (error) {
    console.error('Error al actualizar perfil:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || 'Datos inválidos',
      };
    }

    return {
      success: false,
      error: 'Error al actualizar el perfil. Intente nuevamente.',
    };
  }
}
