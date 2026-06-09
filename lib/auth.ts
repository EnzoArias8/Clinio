import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authConfig } from '@/auth.config';
import { prisma } from '@/lib/prisma';

export async function getCurrentProfesional() {
  const session = await getServerSession(authConfig);
  
  if (!session?.user?.profesionalId) {
    return null;
  }

  const profesional = await prisma.profesional.findUnique({
    where: { id: session.user.profesionalId },
    select: {
      nombreSesion: true,
      duracionSesion: true,
      precioConsulta: true,
      fotoPerfil: true,
      slug: true,
      id: true,
      email: true,
      nombre: true,
      especialidad: true,
      matricula: true,
      activo: true,
      mpAccessToken: true,
      mpUserId: true,
      horarioInicio: true,
      horarioFin: true,
      horarioInicio2: true,
      horarioFin2: true,
      diasAtencion: true,
      suscripcionActiva: true,
      planSuscripcion: true,
      fechaVencimiento: true,
      creadoEn: true,
    },
  });

  return profesional;
}

export async function requireAuth() {
  const profesional = await getCurrentProfesional();
  
  if (!profesional) {
    throw new Error('No autenticado');
  }
  
  if (!profesional.activo) {
    throw new Error('Cuenta desactivada');
  }

  if (!profesional.suscripcionActiva) {
    redirect('/checkout');
  }

  // Verificar que la suscripción no haya vencido
  if (profesional.fechaVencimiento) {
    const now = new Date();
    if (profesional.fechaVencimiento <= now) {
      redirect('/checkout');
    }
  }
  
  return profesional;
}
