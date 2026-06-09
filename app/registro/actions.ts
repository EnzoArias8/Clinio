'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

function slugify(text: string) {
  return text
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

// Schema for form validation
const profesionalSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  especialidad: z.string().min(2, 'La especialidad debe tener al menos 2 caracteres'),
  matricula: z.string().optional(),
  direccionConsultorio: z.string().optional(),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export async function registrarProfesional(formData: FormData) {
  try {
    // Extract and validate form data
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const especialidad = formData.get('especialidad') as string;
    const matricula = formData.get('matricula') as string;
    const direccionConsultorio = formData.get('direccionConsultorio') as string;
    const password = formData.get('password') as string;

    const validatedData = profesionalSchema.parse({
      nombre,
      email,
      especialidad,
      matricula: matricula || undefined,
      direccionConsultorio: direccionConsultorio || undefined,
      password,
    });

    // Check if professional with this email already exists
    const existingProfesional = await prisma.profesional.findUnique({
      where: { email: validatedData.email },
    });

    if (existingProfesional) {
      return {
        success: false,
        error: 'Ya existe un profesional registrado con este email',
      };
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create new professional with user account
    try {
      // Generate unique slug based on nombre
      const baseSlug = slugify(validatedData.nombre || validatedData.email.split('@')[0]);
      let slugCandidate = baseSlug;
      let counter = 1;
      // Check uniqueness and append number if needed
      while (
        slugCandidate &&
        (await prisma.profesional.findUnique({ where: { slug: slugCandidate } }))
      ) {
        counter += 1;
        slugCandidate = `${baseSlug}-${counter}`;
      }

      const profesional = await prisma.profesional.create({
        data: {
          nombre: validatedData.nombre,
          slug: slugCandidate || undefined,
          email: validatedData.email,
          especialidad: validatedData.especialidad,
          matricula: validatedData.matricula,
          direccionConsultorio: validatedData.direccionConsultorio,
          password: hashedPassword,
          activo: true,
          user: {
            create: {
              email: validatedData.email,
            },
          },
        },
      });

      // Return success result
      return { success: true, data: profesional };
    } catch (prismaError: any) {
      // Handle Prisma specific errors
      if (prismaError.code === 'P2002') {
        // Unique constraint failed (email already exists)
        return {
          success: false,
          error: 'Este correo electrónico ya está registrado. Por favor, inicia sesión.',
        };
      }
      
      // Handle other Prisma errors
      if (prismaError.code) {
        console.error('Prisma error:', prismaError);
        return {
          success: false,
          error: 'Ocurrió un error en la base de datos. Por favor, intenta nuevamente.',
        };
      }
      
      // Re-throw if it's not a Prisma error to be caught by outer catch
      throw prismaError;
    }
    
  } catch (error) {
    console.error('Error al registrar profesional:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || 'Datos inválidos',
      };
    }

    // Handle any other unexpected errors
    return {
      success: false,
      error: 'Ocurrió un error al crear la cuenta. Por favor, intenta nuevamente.',
    };
  }
}
