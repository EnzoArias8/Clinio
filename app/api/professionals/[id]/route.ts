import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const profesionalId = params.id;

    // Get professional info with their services
    const profesional = await prisma.profesional.findUnique({
      where: { id: profesionalId },
      select: {
        id: true,
        nombre: true,
        especialidad: true,
        email: true,
        activo: true,
        servicios: {
          where: { activo: true },
          orderBy: { nombre: 'asc' },
          select: {
            id: true,
            nombre: true,
            duracionMin: true,
            precio: true,
            activo: true,
          },
        },
      },
    });

    if (!profesional) {
      return NextResponse.json(
        { error: 'Profesional no encontrado' },
        { status: 404 }
      );
    }

    if (!profesional.activo) {
      return NextResponse.json(
        { error: 'Profesional no está activo' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      profesional: {
        id: profesional.id,
        nombre: profesional.nombre,
        especialidad: profesional.especialidad,
        email: profesional.email,
      },
      servicios: profesional.servicios,
    });
  } catch (error) {
    console.error('Error fetching professional:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
