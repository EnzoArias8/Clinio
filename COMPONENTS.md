# Clinio - Componentes Premium UI/UX

Este documento describe todos los componentes visuales premium agregados a la plataforma Clinio para mejorar la experiencia del usuario.

## 📋 Índice

1. [Logo Component](#logo-component)
2. [Loading States (Skeletons)](#loading-states-skeletons)
3. [Empty States](#empty-states)
4. [Modal Components](#modal-components)
5. [Usage Guide](#usage-guide)

---

## Logo Component

### Descripción
Un componente de logo SVG minimalista que fusiona salud y tecnología, usando un diseño abstracto con una cruz médica estilizada y ondas de pulso.

### Ubicación
`components/logo.tsx`

### Exportaciones

#### `<Logo />`
Logo solo en formato SVG (32x32px por defecto)

```tsx
import { Logo } from '@/components/logo'

export default function MyComponent() {
  return <Logo />
}
```

#### `<LogoWithText />`
Logo con el texto "Clinio" integrado

```tsx
import { LogoWithText } from '@/components/logo'

export default function Header() {
  return <LogoWithText />
}
```

### Integración Actual
- **Landing Page**: Navbar principal
- **Dashboard**: Sidebar logo area
- **Showcase**: Componentes showcase page

### Características
- Diseño SVG vectorial escalable
- Colores ajustados al tema (utiliza `text-primary`)
- Responsive y flexible
- Minimalista y profesional

---

## Loading States (Skeletons)

### Descripción
Componentes de esqueleto (skeleton screens) que simularán el estado de carga mientras se cargan los datos. Usan animación `animate-pulse` de Tailwind para crear un efecto visual agradable.

### Ubicación
`components/skeleton-loaders.tsx`

### Componentes Disponibles

#### `<DashboardSkeleton />`
Skeleton para la página principal del dashboard

```tsx
import { DashboardSkeleton } from '@/components/skeleton-loaders'

export default function DashboardLoading() {
  return <DashboardSkeleton />
}
```

Estructura:
- Titulo y subtítulo en skeleton
- 4 tarjetas de estadísticas con skeleton
- Sección de "Próximos Turnos" con 3 filas skeleton

#### `<PatientTableSkeleton />`
Skeleton para la tabla de pacientes

```tsx
import { PatientTableSkeleton } from '@/components/skeleton-loaders'

export default function PatientsLoading() {
  return <PatientTableSkeleton />
}
```

Estructura:
- Encabezado y búsqueda en skeleton
- Tabla con headers skeleton
- 4 filas de skeleton para pacientes

#### `<AgendaSkeleton />`
Skeleton para la página de agenda

```tsx
import { AgendaSkeleton } from '@/components/skeleton-loaders'

export default function AgendaLoading() {
  return <AgendaSkeleton />
}
```

Estructura:
- Encabezado en skeleton
- Selector de fecha en skeleton
- 8 horarios con skeleton
- 3 tarjetas de estadísticas diarias

### Archivos de Loading
Se han creado archivos `loading.tsx` en las siguientes rutas:
- `app/dashboard/loading.tsx`
- `app/dashboard/pacientes/loading.tsx`
- `app/dashboard/agenda/loading.tsx`

---

## Empty States

### Descripción
Componentes que se muestran cuando no hay datos disponibles. Incluyen iconografía, mensajes amigables y botones de acción para invitar al usuario a crear contenido.

### Ubicación
`components/empty-states.tsx`

### Componentes Disponibles

#### `<EmptyPatientsState />`
Se muestra cuando no hay pacientes registrados

```tsx
import { EmptyPatientsState } from '@/components/empty-states'

export default function PatientsPage() {
  const pacientes = []
  
  if (pacientes.length === 0) {
    return <EmptyPatientsState />
  }
  
  return <PatientsList />
}
```

Incluye:
- Icono grande de usuarios (Users)
- Título: "Aún no tienes pacientes"
- Descripción útil
- Botón CTA: "+ Agregar Primer Paciente"

#### `<EmptyAgendaState />`
Se muestra cuando la agenda está vacía

```tsx
import { EmptyAgendaState } from '@/components/empty-states'

export default function AgendaPage() {
  const appointments = []
  
  if (appointments.length === 0) {
    return <EmptyAgendaState />
  }
  
  return <AgendaList />
}
```

Incluye:
- Icono grande de calendario (Calendar)
- Título: "Tu agenda está vacía"
- Descripción útil
- Botón CTA: "+ Agendar Primer Turno"

#### `<EmptySearchState />`
Se muestra cuando una búsqueda no devuelve resultados

```tsx
import { EmptySearchState } from '@/components/empty-states'

export default function SearchResults() {
  const results = []
  
  if (results.length === 0) {
    return <EmptySearchState />
  }
  
  return <ResultsList />
}
```

Incluye:
- Icono pequeño de búsqueda sin resultados
- Título: "No se encontraron resultados"
- Texto de soporte

### Características
- Iconografía clara y consistente
- Mensajes amigables y útiles
- Colores acordes al tema
- Botones de acción integrados

---

## Modal Components

### Descripción
Componentes de diálogo modal para crear nuevos pacientes y agendar turnos. Incluyen formularios completos, validación básica y estados de carga.

### Ubicación
`components/modals.tsx`

### Componentes Disponibles

#### `<AddPatientModal />`
Modal para agregar un nuevo paciente

```tsx
import { AddPatientModal } from '@/components/modals'

export default function PatientsPage() {
  return (
    <div>
      <AddPatientModal />
      {/* resto del contenido */}
    </div>
  )
}
```

Formulario incluye:
- Campo: Nombre Completo (requerido)
- Campo: Correo Electrónico (requerido)
- Campo: Teléfono (requerido)
- Campo: Fecha de Nacimiento (requerido)

Estados:
- Estado de reposo: Botón azul "+ Nuevo Paciente"
- Estado de carga: Botón con spinner y texto "Guardando..."
- Deshabilitados durante carga: inputs y botones

#### `<AddAppointmentModal />`
Modal para agendar un nuevo turno

```tsx
import { AddAppointmentModal } from '@/components/modals'

export default function AgendaPage() {
  return (
    <div>
      <AddAppointmentModal />
      {/* resto del contenido */}
    </div>
  )
}
```

Formulario incluye:
- Select: Seleccionar Paciente (requerido)
- Select: Tipo de Servicio (requerido)
- Campo: Fecha (requerido)
- Campo: Hora (requerido)

Opciones predefinidas:
- Pacientes: Carlos López, María García, Juan Rodriguez, Ana Martínez
- Servicios: Consulta General, Seguimiento, Revisión Especializada, Procedimiento

Estados:
- Estado de reposo: Botón azul "+ Nuevo Turno"
- Estado de carga: Botón con spinner y texto "Agendando..."

### Características
- Diálogos accesibles con Dialog de shadcn/ui
- Formularios limpios y bien espaciados
- Estados de carga con spinner animado
- Inputs deshabilitados durante petición
- Botones de Cancel/Submit claros
- Descripción contextual en el header

### Integración Actual
- **Pacientes Page**: Modal de agregar paciente
- **Agenda Page**: Modal de agendar turno

---

## Usage Guide

### Implementar Empty States en Páginas Existentes

```tsx
import { EmptyPatientsState } from '@/components/empty-states'
import { Card } from '@/components/ui/card'

export default function PatientsPage() {
  const pacientes = [] // tu lógica para obtener pacientes

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pacientes</h1>
        <AddPatientModal />
      </div>

      {/* Mostrar empty state o tabla */}
      {pacientes.length === 0 ? (
        <EmptyPatientsState />
      ) : (
        <Card>
          {/* Tabla de pacientes */}
        </Card>
      )}
    </div>
  )
}
```

### Customizar Colores de Empty States

Los empty states usan clases Tailwind estándar. Para cambiar colores:

```tsx
// En components/empty-states.tsx
<div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4">
  <Users className="w-8 h-8 text-slate-400" />
</div>

// Cambiar bg-slate-200 y text-slate-400 por tus colores preferidos
```

### Personalizar Mensajes de Empty States

Crear variantes personalizadas:

```tsx
import { Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CustomEmptyState({ title, description, actionText }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4">
        <Users className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        {description}
      </p>
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
        {actionText}
      </Button>
    </div>
  )
}
```

---

## Vista Completa de Componentes

Para ver todos los componentes en acción, visita:

**`/components-showcase`**

Esta página incluye:
- Galería de logo en diferentes tamaños
- Todos los empty states
- Modales interactivos
- Previsualizaciones de skeletons
- Ejemplos de variantes de botones
- Enlaces de navegación a páginas reales

---

## Notas de Implementación

### Accesibilidad
- Todos los modales usan `Dialog` de shadcn/ui para accesibilidad WCAG
- Los empty states incluyen iconografía clara y texto descriptivo
- Los skeletons respetan el tema de colores para mejor contraste

### Performance
- Los skeletons usan `animate-pulse` de Tailwind (optimizado)
- Los modales son lazy-loaded cuando se abre el Dialog
- Los empty states no incluyen datos innecesarios

### Theming
- Todos los componentes usan tokens de diseño (`--primary`, `--foreground`, etc.)
- Los colores son consistentes con la paleta azul y blanca de Clinio
- Adaptables a cambios de tema sin modificar código

---

## Próximas Mejoras Sugeridas

1. **Integración Backend**: Conectar modales con APIs reales
2. **Validación Mejorada**: Mensajes de error más específicos
3. **Confirmación de Eliminación**: Modal para confirmación antes de borrar
4. **Estados Expandidos**: Variantes para diferentes datos vacíos
5. **Animaciones**: Transiciones más suaves entre estados
