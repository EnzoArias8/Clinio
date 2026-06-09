# Características de Negocio - Clinio SaaS

## Resumen Ejecutivo

Esta documentación describe las características de negocio implementadas en la plataforma Clinio, diseñadas para monetizar el servicio y mejorar la experiencia del usuario final.

---

## 1. Sistema de Precios (Pricing Section)

**Ubicación:** `/` (Landing Page)

### Componente: `PricingSection`
- **Archivo:** `components/pricing-section.tsx`
- **Ubicación en página:** Insertado entre hero section y features grid

### Planes Ofrecidos

#### Plan Mensual
- **Precio:** $20.000 ARS/mes
- **Destacado:** SÍ (escala y gradiente visual)
- **Características:**
  - Agenda ilimitada
  - Cobros directos
  - Recordatorios automáticos
  - Gestión de pacientes
  - Soporte por email

#### Plan Anual
- **Precio:** $200.000 ARS/año
- **Ahorros:** $40.000 (2 meses gratis)
- **Badge:** "Ahorras 2 meses" (verde)
- **Características adicionales:**
  - Todo lo del plan mensual
  - Facturación automática
  - Reportes avanzados
  - API personalizada
  - Soporte prioritario 24/7

### Características del Diseño
- Tarjetas con bordes y estilos diferenciados
- Plan mensual escala a 105% en desktop (destacado visual)
- Botones de CTA específicos por plan
- Gradiente sutil en plan destacado
- Responsive en mobile (stack vertical)

---

## 2. Integración de Mercado Pago

**Ubicación:** `/dashboard/configuracion` (Settings Page)

### Componente: `MercadoPagoIntegration`
- **Archivo:** `components/mercado-pago-integration.tsx`
- **Ubicación en página:** Insertado antes de "Zona de Peligro"

### Flujo de Conexión

#### Estado Desconectado
- Muestra logo/branding de Mercado Pago
- Input para Access Token (tipo password)
- Botón "Conectar Mercado Pago"
- Badge amarillo "Desconectado"
- Tooltip explicativo sobre dónde obtener el token

#### Estado Conectado
- Badge verde "Conectado"
- Información de estado activo
- Contador de transacciones
- Botón para desconectar (rojo)
- Mensaje de confirmación verde

### Características de Seguridad
- Campo password para token (no visible por defecto)
- Botón toggle para mostrar/ocultar token
- Aviso de encriptación (en texto azul)
- Validación básica (no permite conectar con token vacío)

### Diseño Visual
- Card con gradiente azul-cyan en header
- Logo "MP Pay" estilizado en blanco con borde azul
- Colores coherentes con tema azul corporativo

---

## 3. Botón de Pago en Confirmación

**Ubicación:** `/reserva/exito` (Booking Success Page)

### Cambios Implementados

#### Nuevo Botón "Pagar Turno Ahora"
- **Color:** Celeste Mercado Pago (#009EE3)
- **Icono:** Lock (símbolo de seguridad)
- **Posición:** Antes del botón "Volver al Inicio"
- **Tamaño:** Large, ancho completo
- **Efectos:** Sombra y hover con aumento de sombra

#### Ticket-Style Layout
- Resumen de turno presentado como "ticket"
- Detalles: Fecha, Hora, Profesional
- Fondo ligero (secondary/30) con bordes
- Iconos coloreados en primario

---

## 4. Global Loader (Pantalla de Carga)

**Ubicación:** Demo en `/loader-demo`

### Componente: `GlobalLoader`
- **Archivo:** `components/global-loader.tsx`
- **Prop:** `isOpen` (boolean) - Controla visibilidad
- **Prop:** `message` (string, optional) - Texto personalizable

### Características Visuales
- Overlay a pantalla completa
- Fondo blanco semi-transparente (white/80)
- Filtro de desenfoque (backdrop-blur)
- Z-index máximo (9999)

### Animaciones
- Logo con efecto pulse
- Tres puntos animados tipo "bounce" con delay escalonado
- Texto "Procesando..." (personalizable)

### Página de Demo
- URL: `/loader-demo`
- Botón interactivo para probar el loader
- Se cierra automáticamente después de 3 segundos
- Documentación completa de propiedades
- Ejemplo de código integrable

---

## 5. Cómo Integrar Estas Características

### En Landing Page
```tsx
import { PricingSection } from '@/components/pricing-section'

export default function LandingPage() {
  return (
    <>
      {/* ... hero section ... */}
      <PricingSection />
      {/* ... features ... */}
    </>
  )
}
```

### En Settings
```tsx
import { MercadoPagoIntegration } from '@/components/mercado-pago-integration'

export default function ConfiguracionPage() {
  return (
    <div className="space-y-8">
      {/* ... other settings ... */}
      <MercadoPagoIntegration />
      {/* ... danger zone ... */}
    </div>
  )
}
```

### En Cualquier Página
```tsx
'use client'

import { GlobalLoader } from '@/components/global-loader'
import { useState } from 'react'

export default function MyPage() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <GlobalLoader isOpen={isLoading} message="Cargando..." />
      <button onClick={() => setIsLoading(true)}>Cargar</button>
    </>
  )
}
```

---

## 6. Flujos de Negocio

### Flujo del Paciente
1. Paciente accede a landing page (`/`)
2. Ve planes de precios
3. Hace clic en "Ver Vista de Pacientes"
4. Accede a `/reserva` (formulario de reserva)
5. Completa datos y reserva turno
6. Llega a `/reserva/exito` (success page)
7. Ve resumen del turno (como ticket)
8. Opción de "Pagar Turno Ahora" (Mercado Pago)

### Flujo del Profesional
1. Profesional se registra (`/registro`)
2. Accede a dashboard (`/dashboard`)
3. Va a Configuración (`/dashboard/configuracion`)
4. Conecta su cuenta de Mercado Pago
5. Ahora puede recibir pagos directos
6. Los pacientes pueden pagar sus turnos

---

## 7. Monetización

### Modelo de Negocio
- **Suscripción SaaS:** Usuarios pagan $20.000/mes o $200.000/año
- **Comisión en Pagos:** Captura porcentaje de pagos procesados vía Mercado Pago
- **Incremento de Retención:** Plan anual ofrece descuento atractivo

### Ventajas del Modelo
- Ingresos recurrentes por suscripción
- Ingresos adicionales por pagos de pacientes
- Incentivo económico para plan anual (40% descuento)
- Integración nativa reduce fricción (API Mercado Pago)

---

## 8. Archivos Nuevos Creados

| Archivo | Ubicación | Propósito |
|---------|-----------|----------|
| `pricing-section.tsx` | `/components` | Sección de planes |
| `mercado-pago-integration.tsx` | `/components` | Integración de pagos |
| `global-loader.tsx` | `/components` | Pantalla de carga |
| `loader-demo/page.tsx` | `/app` | Página de demostración |
| `SAAS_FEATURES.md` | `/` | Este documento |

---

## 9. Próximos Pasos Sugeridos

1. **Backend Integration**
   - Crear endpoint para procesar pagos
   - Guardar credenciales de Mercado Pago en BD
   - Autenticar pagos con token guardado

2. **Validación de Formularios**
   - Implementar validación real en modal de conexión MP
   - Verificar validez del token con API de MP
   - Mostrar errores descriptivos

3. **Análisis**
   - Trackear cuántos usuarios completan las fases del funnel
   - Medir tasa de conversión en cada paso
   - Monitorear pagos procesados

4. **Mejoras UX**
   - Notificaciones toast para acciones exitosas
   - Animaciones suaves en transiciones
   - Estados de carga en botones

---

## Colores Corporativos Utilizados

- **Azul Primario:** `oklch(0.52 0.2 250)` (azul médico profesional)
- **Celeste Mercado Pago:** `#009EE3` (integración de pagos)
- **Verde (Ahorros):** `#10b981` (beneficio visual)
- **Amarillo (Alerta):** `#f59e0b` (estado desconectado)
- **Rojo (Peligro):** `#ef4444` (acciones destructivas)

---

**Última actualización:** 2024
**Versión:** 1.0
