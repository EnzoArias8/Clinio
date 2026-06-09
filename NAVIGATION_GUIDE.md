# Guía de Navegación - Clinio SaaS

## Rutas Principales

### Landing Page
**URL:** `/`  
**Descripción:** Página de inicio con hero section, características y pricing  
**Nuevas Features:**
- Sección de precios con dos planes (Mensual/Anual)
- Badge "Ahorras 2 meses" en plan anual
- Links a todas las vistas principales

**Acceso rápido:**
```
Logo (Click) → Inicio
"Comenzar Ahora" → /login
"Ver Vista de Pacientes" → /reserva
"Ver Componentes Premium" → /components-showcase
```

---

### Autenticación

#### Login
**URL:** `/login`  
**Descripción:** Formulario de acceso para profesionales existentes  
**Campos:** Email, Contraseña  

#### Registro
**URL:** `/registro`  
**Descripción:** Formulario para nuevos profesionales  
**Campos:** Nombre, Profesión, Email, Teléfono, Contraseña  

---

### Booking Público

#### Formulario de Reserva
**URL:** `/reserva`  
**Descripción:** Interfaz pública para que pacientes reserven turnos  
**Flujo:**
1. Seleccionar servicio (Consulta, Terapia, Chequeo)
2. Seleccionar fecha y hora
3. Ingresar datos personales
4. Confirmar reserva

#### Confirmación de Éxito
**URL:** `/reserva/exito`  
**Descripción:** Pantalla de confirmación POST-reserva  
**Elementos:**
- ✓ Confirmación visual de turno
- 📅 Resumen del turno (Fecha, Hora, Profesional)
- 🔒 **Nuevo:** Botón "Pagar Turno Ahora" (Mercado Pago #009EE3)
- 🔄 Botón "Volver al Inicio"

---

### Dashboard Profesional

#### Home
**URL:** `/dashboard`  
**Descripción:** Página principal del profesional  
**Elementos:**
- 📊 Stats cards (Turnos hoy, Pacientes activos, etc.)
- 📋 Lista de próximas citas
- 🎯 CTAs rápidos

**Acceso desde:**
- Logo en sidebar (click)
- "Inicio" en menú lateral

#### Pacientes
**URL:** `/dashboard/pacientes`  
**Descripción:** Gestión de registro de pacientes  
**Elementos:**
- 🔍 Búsqueda por nombre/email
- 📋 Tabla con información de pacientes
- **Nuevo:** Botón "+ Nuevo Paciente" abre modal
- 📞 Datos de contacto, últimas visitas

**Modal Agregar Paciente:**
- Nombre completo
- Email
- Teléfono
- Fecha de nacimiento
- Botón "Guardar" con spinner durante carga

#### Agenda
**URL:** `/dashboard/agenda`  
**Descripción:** Vista de calendario y horarios  
**Elementos:**
- 📅 Vista diaria con franjas horarias
- ✅ Estado de confirmación de citas
- **Nuevo:** Botón "+ Nuevo Turno" abre modal
- 📊 Stats de ocupación del día

**Modal Agregar Turno:**
- Seleccionar paciente
- Seleccionar servicio
- Seleccionar fecha y hora
- Botón "Crear" con spinner

#### Configuración
**URL:** `/dashboard/configuracion`  
**Descripción:** Ajustes de cuenta y preferencias  
**Secciones:**
1. **Información Personal**
   - Nombre, profesión, email, teléfono
   - Dirección del consultorio
   - Botón "Guardar Cambios"

2. **Notificaciones**
   - Toggles para diferentes tipos de alertas
   - Recordatorios, nuevos pacientes, cambios de citas, reportes

3. **Seguridad**
   - Cambio de contraseña
   - Inputs para contraseña actual y nueva

4. **Integración de Pagos (NUEVO)**
   - 💳 Logo Mercado Pago con branding azul/celeste
   - 🔐 Input de Access Token (password)
   - 👁 Botón toggle para mostrar/ocultar token
   - 🟢 Estado "Conectado" (verde con checkmark)
   - 🟡 Estado "Desconectado" (amarillo con warning)
   - 📊 Contador de transacciones (cuando conectado)
   - 🔌 Botón "Conectar" o "Desconectar"

5. **Zona de Peligro**
   - Botón "Eliminar Cuenta" (rojo)
   - Advertencia de irreversibilidad

---

### Demostraciones y Showcase

#### Components Showcase
**URL:** `/components-showcase`  
**Descripción:** Galería de todos los componentes UI premium  
**Tabs:**
- Logo (SVG con pulse)
- Empty States (pacientes, agenda, búsqueda)
- Modales (Agregar paciente, Agregar turno)
- Skeletons (Dashboard, Pacientes, Agenda)
- Botones (Estados y variantes)

**Secciones Nuevas:**
- Link a "/loader-demo" (Global Loader)
- Link a "/dashboard/configuracion" (Mercado Pago)
- Link a "/reserva/exito" (Botón de pago)

#### Global Loader Demo
**URL:** `/loader-demo`  
**Descripción:** Demostración interactiva del componente de carga global  
**Elementos:**
- 🏥 Logo animado (pulsando)
- "Procesando..." (texto personalizable)
- Tres puntos animados
- Overlay blanco semi-transparente

**Funcionalidades:**
- [Mostrar Global Loader] → Se muestra por 3 segundos
- Documentación de propiedades
- Tabla de props
- Código de ejemplo integrable

---

## Estructura de Carpetas

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx                    # Landing con pricing
│   ├── login/page.tsx              # Login
│   ├── registro/page.tsx           # Registro
│   ├── reserva/
│   │   ├── page.tsx                # Formulario reserva
│   │   ├── exito/page.tsx          # Éxito + botón pago
│   │   └── loading.tsx
│   ├── dashboard/
│   │   ├── layout.tsx              # Sidebar + nav
│   │   ├── page.tsx                # Home/Inicio
│   │   ├── loading.tsx
│   │   ├── pacientes/
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   ├── agenda/
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   └── configuracion/
│   │       ├── page.tsx            # + MercadoPago
│   │       └── loading.tsx
│   ├── components-showcase/page.tsx # Showcase
│   ├── loader-demo/page.tsx        # Demo global loader
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/ (shadcn/ui)
│   ├── logo.tsx                    # Logo con size prop
│   ├── global-loader.tsx           # 🆕 Pantalla carga
│   ├── pricing-section.tsx         # 🆕 Sección precios
│   ├── mercado-pago-integration.tsx # 🆕 Integración MP
│   ├── empty-states.tsx
│   ├── modals.tsx
│   └── skeleton-loaders.tsx
├── public/
└── docs/
    ├── SAAS_FEATURES.md
    ├── BUSINESS_FEATURES_SUMMARY.md
    ├── NAVIGATION_GUIDE.md
    ├── COMPONENTS.md
    ├── QUICK_REFERENCE.md
    └── PREMIUM_UI_IMPLEMENTATION.md
```

---

## Flujos de Usuario

### Flujo: Nuevo Paciente Reservando Turno
```
/ (Landing)
  ├─ "Ver Vista de Pacientes"
  └─→ /reserva (Booking Form)
      ├─ Selecciona servicio
      ├─ Selecciona fecha/hora
      ├─ Ingresa datos
      └─→ /reserva/exito (Success)
          ├─ Ve confirmación
          ├─ Ve resumen del turno
          ├─ [Pagar Turno Ahora] ← Mercado Pago
          └─ [Volver al Inicio]
```

### Flujo: Nuevo Profesional Registrándose
```
/ (Landing)
  ├─ "Registrarse"
  └─→ /registro (Sign Up)
      ├─ Ingresa datos
      ├─ Crea contraseña
      └─→ /dashboard (Home)
          ├─ Ve bienvenida
          ├─ [Ir a Configuración]
          └─→ /dashboard/configuracion
              ├─ Conecta Mercado Pago
              ├─ Ingresa Access Token
              └─ Estado "Conectado" ✓
```

### Flujo: Profesional Gestionando Pacientes
```
/dashboard (Home)
  ├─ Ícono "Pacientes" (sidebar)
  └─→ /dashboard/pacientes
      ├─ [+ Nuevo Paciente] → Modal abierto
      ├─ Ingresa datos
      ├─ [Guardar] → Carga spinner
      └─ Lista actualizada
```

### Flujo: Profesional Gestión de Agenda
```
/dashboard (Home)
  ├─ Ícono "Agenda" (sidebar)
  └─→ /dashboard/agenda
      ├─ [+ Nuevo Turno] → Modal abierto
      ├─ Selecciona paciente
      ├─ Selecciona servicio
      ├─ Selecciona fecha/hora
      ├─ [Crear] → Carga spinner
      └─ Agenda actualizada
```

---

## Componentes por Ubicación

| Componente | Ubicación(es) |
|------------|---------------|
| Logo | Header todas las páginas |
| Pricing Section | / (Landing) |
| Mercado Pago Integration | /dashboard/configuracion |
| Botón Pagar | /reserva/exito |
| Global Loader | /loader-demo (+ cualquier página) |
| Empty States | /dashboard/pacientes, /dashboard/agenda |
| Modales | /dashboard/pacientes, /dashboard/agenda |
| Skeleton Loaders | /dashboard/*, /dashboard/pacientes, /dashboard/agenda |

---

## Búsqueda Rápida

**¿Dónde veo los precios?**  
→ `/` (Landing Page) - Sección "Planes Simples y Transparentes"

**¿Dónde conecto Mercado Pago?**  
→ `/dashboard/configuracion` - Sección "Integración de Pagos"

**¿Dónde pago el turno?**  
→ `/reserva/exito` - Botón celeste "Pagar Turno Ahora"

**¿Dónde veo todos los componentes?**  
→ `/components-showcase` - Galería completa

**¿Dónde pruebo el loader?**  
→ `/loader-demo` - Demo interactiva con botón

**¿Cómo agrego un paciente?**  
→ `/dashboard/pacientes` - Click "+ Nuevo Paciente"

**¿Cómo agrego un turno?**  
→ `/dashboard/agenda` - Click "+ Nuevo Turno"

**¿Dónde cambio mi contraseña?**  
→ `/dashboard/configuracion` - Sección "Seguridad"

---

## Atajos de Teclado (Sugeridos para Futura Implementación)

```
Ctrl/Cmd + P → Ir a /dashboard/pacientes
Ctrl/Cmd + A → Ir a /dashboard/agenda
Ctrl/Cmd + S → Ir a /dashboard/configuracion
Ctrl/Cmd + L → Toggle Global Loader (dev)
Escape → Cerrar modal actual
```

---

## Colores por Sección

| Sección | Color Primario | Uso |
|---------|---------------|-----|
| Landing/Pricing | Blue (okclh) | Headers, CTAs |
| Dashboard | Blue (okclh) | Sidebar, accents |
| Mercado Pago | Celeste (#009EE3) | Token input, button |
| Success | Primary (Blue) | Confirmación |
| Payment Button | Celeste (#009EE3) | "Pagar Turno" |
| States | Verde/Amarillo/Rojo | Conectado/Desconectado |

---

## Testing Checklist

- [ ] `/` - Landing visible con pricing
- [ ] `/login` - Login funcional
- [ ] `/registro` - Registro funcional
- [ ] `/reserva` - Flujo de reserva completo
- [ ] `/reserva/exito` - Botón pago visible en azul celeste
- [ ] `/dashboard` - Home carga bien
- [ ] `/dashboard/pacientes` - Modal de paciente abre/cierra
- [ ] `/dashboard/agenda` - Modal de turno abre/cierra
- [ ] `/dashboard/configuracion` - Toggle Mercado Pago funciona
- [ ] `/components-showcase` - Links a nuevas features funcionan
- [ ] `/loader-demo` - Botón muestra loader 3 segundos
- [ ] Responsive mobile (375px) - Layout adaptado
- [ ] Responsive tablet (768px) - Dos columnas
- [ ] Responsive desktop (1024px+) - Full layout

---

**Última actualización:** Mayo 2024  
**Versión:** 1.0
