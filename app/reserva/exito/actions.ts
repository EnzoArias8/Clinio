'use server';

import { z } from 'zod';
import mercadopago from 'mercadopago';
import { prisma } from '@/lib/prisma';

// Schema for payment preference creation
const paymentPreferenceSchema = z.object({
  tokenReserva: z.string().min(1, 'Token de reserva es requerido'),
});

export async function crearPreferenciaPago(formData: FormData) {
  try {
    // Extract and validate form data
    const tokenReserva = formData.get('tokenReserva') as string;

    const validatedData = paymentPreferenceSchema.parse({
      tokenReserva,
    });

    
    // Find the turn by token
    const turno = await prisma.turno.findUnique({
      where: { tokenReserva: validatedData.tokenReserva },
      include: {
        paciente: {
          include: {
            tutor: true,
          },
        },
        servicio: true,
        profesional: {
          select: {
            id: true,
            nombre: true,
            especialidad: true,
            mpAccessToken: true,
          },
        },
      },
    });

    if (!turno) {
      return {
        success: false,
        error: 'Turno no encontrado. Verifique el token de reserva.',
      };
    }

    // Check if professional has Mercado Pago token configured
    if (!turno.profesional.mpAccessToken) {
      return {
        success: false,
        error: 'El profesional aún no ha configurado sus cobros online. Contacte al profesional para que configure su cuenta de Mercado Pago.',
      };
    }

    // Initialize Mercado Pago with professional's token
    mercadopago.configure({
      access_token: turno.profesional.mpAccessToken,
    });

    // Create payment preference
    const preference = await mercadopago.preferences.create({
      items: [
        {
          id: turno.servicio.id,
          title: `${turno.servicio.nombre} - ${turno.profesional.nombre}`,
          quantity: 1,
          unit_price: Math.round(turno.servicio.precio * 100), // Convert to cents
          currency_id: 'ARS',
          description: `Turno con ${turno.profesional.nombre} - ${turno.servicio.nombre}`,
          picture_url: null,
        },
      ],
      payer: {
        name: turno.paciente.tutor.nombre,
        email: turno.paciente.tutor.email,
        phone: {
          area_code: '54',
          number: turno.paciente.tutor.whatsapp.replace(/\D/g, ''),
        },
        identification: {
          type: 'DNI',
          number: '0', // Optional, can be added later
        },
        address: {
          street_name: 'N/A',
          street_number: '0',
          zip_code: '0',
        },
      },
      external_reference: turno.tokenReserva, // Use tokenReserva as external reference
      auto_return: 'approved',
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/reserva/exito?token=${turno.tokenReserva}&payment=success`,
        pending: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/reserva/exito?token=${turno.tokenReserva}&payment=pending`,
        failure: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/reserva/exito?token=${turno.tokenReserva}&payment=failure`,
      },
      notification_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/webhooks/mercadopago`,
      statement_descriptor: 'Clinio - Sistema de Turnos Médicos',
      expires: false,
      expiration_date_from: null,
      expiration_date_to: null,
      differential_pricing: null,
      binary_mode: false,
    });

    if (!preference || !preference.body || !preference.body.init_point) {
      return {
        success: false,
        error: 'Error al generar la preferencia de pago. Intente nuevamente.',
      };
    }

    return {
      success: true,
      data: {
        initPoint: preference.body.init_point,
        preferenceId: preference.body.id,
      },
    };

  } catch (error) {
    console.error('Error al crear preferencia de pago:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || 'Datos inválidos',
      };
    }

    // Handle Mercado Pago specific errors
    if (error && typeof error === 'object' && 'cause' in error) {
      const mpError = error as any;
      return {
        success: false,
        error: `Error de Mercado Pago: ${mpError.cause?.[0]?.description || 'Error desconocido'}`,
      };
    }

    return {
      success: false,
      error: 'Error al procesar el pago. Intente nuevamente más tarde.',
    };
  }
}

// Function to get turn details with payment status
export async function getTurnoWithPaymentStatus(token: string) {
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
    console.error('Error al obtener turno con estado de pago:', error);
    return { success: false, error: 'Error al cargar la información del turno' };
  }
}

// Function to update turn status after payment
export async function actualizarEstadoTurno(tokenReserva: string, estado: 'CONFIRMADO' | 'CANCELADO' | 'PENDIENTE_PAGO') {
  try {
    const turno = await prisma.turno.update({
      where: { tokenReserva },
      data: { estado },
      include: {
        paciente: {
          include: {
            tutor: true,
          },
        },
        servicio: true,
        profesional: true,
      },
    });

    return { success: true, data: turno };
  } catch (error) {
    console.error('Error al actualizar estado del turno:', error);
    return { success: false, error: 'Error al actualizar el estado del turno' };
  }
}
