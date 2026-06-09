import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')

  if (!code || !state) {
    return NextResponse.json(
      { error: 'Missing code or state in Mercado Pago callback' },
      { status: 400 }
    )
  }

  const clientId = process.env.MP_CLIENT_ID
  const clientSecret = process.env.MP_CLIENT_SECRET
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/mercadopago/callback`

  if (!clientId || !clientSecret || !process.env.NEXT_PUBLIC_APP_URL) {
    console.error('Mercado Pago OAuth configuration is missing')
    return NextResponse.json(
      { error: 'Server configuration missing for Mercado Pago OAuth' },
      { status: 500 }
    )
  }

  try {
    const tokenResponse = await fetch('https://api.mercadopago.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_secret: clientSecret,
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text()
      console.error('Mercado Pago token exchange failed:', tokenResponse.status, errorBody)
      return NextResponse.json(
        { error: 'Failed to exchange Mercado Pago authorization code', details: errorBody },
        { status: 500 }
      )
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token
    const userId = tokenData.user_id

    if (!accessToken || !userId) {
      return NextResponse.json(
        { error: 'Mercado Pago response missing access_token or user_id', details: tokenData },
        { status: 500 }
      )
    }

    await prisma.profesional.update({
      where: { id: state },
      data: {
        mpAccessToken: accessToken,
        mpUserId: String(userId),
      },
    })

    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Error in Mercado Pago OAuth callback:', error)
    return NextResponse.json(
      { error: 'Internal server error processing Mercado Pago callback' },
      { status: 500 }
    )
  }
}
