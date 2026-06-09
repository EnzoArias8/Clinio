import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { prisma } from '@/lib/prisma';

const accessToken = process.env.MP_ACCESS_TOKEN;
const mpClient = new MercadoPagoConfig({ access_token: accessToken ?? '' });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const paymentId = body?.data?.id;

    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID required' }, { status: 400 });
    }

    if (!accessToken) {
      console.error('MP_ACCESS_TOKEN is not configured');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const payment = await new Payment(mpClient).get({ id: paymentId });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    if (payment.status !== 'approved') {
      return NextResponse.json({
        error: 'Payment not approved',
        status: payment.status,
      }, { status: 200 });
    }

    const profesionalId = payment.external_reference;
    if (!profesionalId || typeof profesionalId !== 'string') {
      return NextResponse.json({ error: 'External reference missing or invalid' }, { status: 400 });
    }

    const transactionAmount = Number(payment.transaction_amount);
    let planSuscripcion: string;
    let daysToAdd: number;

    if (transactionAmount === 20000) {
      planSuscripcion = 'mensual';
      daysToAdd = 30;
    } else if (transactionAmount === 200000) {
      planSuscripcion = 'anual';
      daysToAdd = 365;
    } else {
      return NextResponse.json({
        error: 'Unsupported transaction amount',
        transactionAmount,
      }, { status: 400 });
    }

    const fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + daysToAdd);

    await prisma.profesional.update({
      where: { id: profesionalId },
      data: {
        suscripcionActiva: true,
        planSuscripcion,
        fechaVencimiento,
      },
    });

    return NextResponse.json({
      success: true,
      paymentId,
      profesionalId,
      planSuscripcion,
      fechaVencimiento: fechaVencimiento.toISOString(),
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing Mercado Pago webhook:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
