'use server'

import { MercadoPagoConfig, Preference } from 'mercadopago'
import { getCurrentProfesional } from '@/lib/auth'

export async function crearPreferenciaPago(plan: 'mensual' | 'anual' = 'mensual') {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN
    if (!accessToken) {
      throw new Error('MP_ACCESS_TOKEN no está configurado')
    }

    const profesional = await getCurrentProfesional()
    if (!profesional?.id) {
      throw new Error('Profesional no autenticado')
    }

    // Configurar precio según el plan
    let title: string
    let unitPrice: number

    if (plan === 'anual') {
      title = 'Suscripción Anual Clinio'
      unitPrice = 200000
    } else {
      title = 'Suscripción Mensual Clinio'
      unitPrice = 20000
    }

    // Inicialización correcta para el SDK v2
    const client = new MercadoPagoConfig({ accessToken })
    const preference = new Preference(client)

    // Creamos la preferencia con la estructura estricta
    const response = await preference.create({
      body: {
        items: [
          {
            id: `plan_${plan}`,
            title: title,
            quantity: 1,
            unit_price: unitPrice,
            currency_id: 'ARS',
          },
        ],
        external_reference: String(profesional.id),
        back_urls: {
          success: 'https://clinio-app.com/dashboard',
          pending: 'https://clinio-app.com/dashboard',
          failure: 'https://clinio-app.com/dashboard',
        },
        notification_url: 'https://two-rabbits-sing.loca.lt/api/webhooks/mercadopago',
        auto_return: 'approved',
      },
    })

    return {
      success: true,
      // En la v2, la URL viene directo en la respuesta, no adentro de "body"
      url: response.init_point || response.sandbox_init_point || '',
    }
  } catch (error: any) {
    // Le pedimos que nos devuelva el error exacto que manda Mercado Pago en texto
    console.error('Error en Mercado Pago:', error);
    throw new Error(`Error real de MP: ${JSON.stringify(error)}`);
  }
}
