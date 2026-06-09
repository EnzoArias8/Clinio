# 🧪 Guía de Testing - Tres Elementos Críticos

---

## 📋 Checklist de Testing Manual

### 1. GESTIÓN DE SERVICIOS

**Ubicación:** `/dashboard/configuracion`

#### Test 1.1: Visualización de Servicios
```
□ Abre /dashboard/configuracion
□ Busca la sección "Servicios Disponibles"
□ Verifica que aparecen 3 servicios de ejemplo:
  □ "Evaluación Psicopedagógica" | 45 min | $15.000
  □ "Sesión Semanal" | 30 min | $10.000
  □ "Consulta Rápida" | 15 min | $5.000
□ Todos tienen botones [✏️] y [🗑️]
```

#### Test 1.2: Crear Nuevo Servicio
```
□ Haz clic en "+ Nuevo Servicio"
□ Modal se abre correctamente
□ Llena el formulario:
  ├─ Nombre: "Sesión Privada"
  ├─ Duración: 60
  └─ Precio: 25000
□ Haz clic "Crear Servicio"
□ El botón muestra estado "Creando..."
□ Modal se cierra automáticamente
□ ✓ Toast verde aparece: "Servicio 'Sesión Privada' creado correctamente"
□ El nuevo servicio aparece en la lista
```

#### Test 1.3: Validación de Campos
```
□ Haz clic "+ Nuevo Servicio"
□ Intenta crear sin llenar campos
  ├─ Sin nombre + Crear → ✗ Toast rojo: "Por favor completa todos los campos"
  ├─ Sin duración + Crear → ✗ Toast rojo: "Por favor completa todos los campos"
  └─ Sin precio + Crear → ✗ Toast rojo: "Por favor completa todos los campos"
□ Completa los campos → Crear funciona
```

#### Test 1.4: Eliminar Servicio
```
□ En la lista de servicios, haz clic [🗑️] en un servicio
□ El servicio se elimina inmediatamente
□ ✗ Toast rojo aparece: "Servicio '[nombre]' eliminado correctamente"
□ El servicio ya no aparece en la lista
```

#### Test 1.5: Responsive Design
```
Desktop (1024px+):
  □ Grid de 4 columnas (nombre, duración, precio, acciones)
  □ Botones alineados a la derecha

Tablet (768px):
  □ Sigue viendo bien
  □ Botones aún accesibles

Mobile (375px):
  □ Stack vertical (nombre arriba, duración/precio abajo)
  □ Botones aún funcionales
  □ Modal se adapta al ancho
```

---

### 2. NOTIFICACIONES VISUALES (TOASTS)

**Ubicación:** `/components-showcase` → Tab "Toasts"

#### Test 2.1: Toast de Éxito
```
□ Abre /components-showcase
□ Navega al tab "Toasts"
□ Haz clic "Mostrar Toast de Éxito"
□ Verifica que:
  ├─ Aparece en esquina inferior derecha
  ├─ Es de color VERDE
  ├─ Título: "Éxito"
  ├─ Mensaje: "¡Paciente guardado con éxito!"
  ├─ Desaparece después de 3 segundos
  └─ No hay duplicados si haces clic varias veces rápido
```

#### Test 2.2: Toast de Error
```
□ En el tab "Toasts"
□ Haz clic "Mostrar Toast de Error"
□ Verifica que:
  ├─ Es de color ROJO
  ├─ Título: "Error"
  ├─ Mensaje: "Falta completar el email"
  ├─ Tiene ícono de error (AlertCircle)
  └─ Desaparece automáticamente
```

#### Test 2.3: Toast de Info
```
□ Haz clic "Mostrar Toast de Info"
□ Verifica:
  ├─ Es de color AZUL
  ├─ Título: "Información"
  ├─ Mensaje: "Tu contraseña se actualizó correctamente"
  └─ Auto-desaparece
```

#### Test 2.4: Toast de Advertencia
```
□ Haz clic "Mostrar Toast de Advertencia"
□ Verifica:
  ├─ Es de color AMARILLO
  ├─ Título: "Advertencia"
  ├─ Mensaje: "Este cambio afectará tu agenda"
  └─ Auto-desaparece
```

#### Test 2.5: Toasts en Componentes Reales
```
□ Ve a /dashboard/configuracion → Servicios
□ Crea un nuevo servicio:
  ├─ Llena datos
  └─ Haz clic "Crear Servicio"
  □ ✓ Toast de éxito aparece correctamente

□ Elimina un servicio:
  └─ Haz clic [🗑️]
  □ ✗ Toast de error aparece correctamente
```

#### Test 2.6: Stack de Múltiples Toasts
```
□ En el tab "Toasts"
□ Haz clic rápidamente múltiples botones
□ Verifica que:
  ├─ Los toasts se apilan verticalmente
  ├─ No se superponen
  └─ Cada uno desaparece independientemente
```

---

### 3. FOOTER CORPORATIVO

**Ubicación:** `/` (Landing Page)

#### Test 3.1: Visualización del Footer
```
□ Abre la landing page (/)
□ Scrollea al final
□ Verifica que el footer contiene:
  ├─ Logo de Clinio (lado izquierdo)
  ├─ Texto "Simplificando la salud"
  ├─ Sección "Legal" con:
  │  ├─ Términos y Condiciones
  │  └─ Privacidad
  ├─ Sección "Soporte" con:
  │  ├─ Contacto
  │  └─ Soporte
  ├─ Sección "Estado" con:
  │  └─ 🟢 Todos los sistemas operativos
  ├─ Divider horizontal
  ├─ Copyright: "© 2026 Clinio. Todos los derechos reservados."
  └─ Social links: Twitter, LinkedIn, GitHub
```

#### Test 3.2: Estilo Visual
```
□ Color de fondo: Azul profesional (sidebar color)
□ Texto gris oscuro (readable)
□ Enlaces en gris oscuro (no azul fuerte)
□ Al pasar sobre enlaces: color azul primario
□ Buen contraste (accesibilidad)
```

#### Test 3.3: Hover Effects
```
□ Pasa el mouse sobre cada enlace:
  ├─ Términos y Condiciones → color primario + smooth transition
  ├─ Privacidad → color primario + smooth transition
  ├─ Contacto → color primario + smooth transition
  ├─ Soporte → color primario + smooth transition
  ├─ Twitter → color primario + smooth transition
  ├─ LinkedIn → color primario + smooth transition
  └─ GitHub → color primario + smooth transition
□ Las transiciones son suaves (no abruptas)
```

#### Test 3.4: Responsive Design
```
Desktop (1024px+):
  □ Footer en 4 columnas
  □ Divider horizontal visible
  □ Copyright a la izquierda
  □ Social links a la derecha
  □ Todo bien alineado

Tablet (768px):
  □ Footer sigue mostrándose bien
  □ Las columnas se ajustan
  □ Copyright y social en su lugar

Mobile (375px):
  □ Columnas se apilan verticalmente
  □ Logo arriba
  □ Secciones (Legal, Soporte, Estado) apiladas
  □ Divider visible
  □ Copyright arriba
  □ Social links abajo
  □ Todo es legible y clickeable
```

#### Test 3.5: Logo en Footer
```
□ Logo se ve igual que en el navbar
□ Logo es clickeable (links a /)
□ Logo se muestra correctamente en mobile
□ Tamaño es proporcional (56x56px)
```

#### Test 3.6: Copyright Dinámico
```
□ El año en el copyright es 2026 (o el año actual)
□ No está hardcodeado (se actualiza cada año)
□ Verifica en el código: new Date().getFullYear()
```

---

## 🔍 Pruebas de Navegación

### Test de Rutas
```
✓ Servicios accesibles desde:
  └─ Dashboard → Configuración → Servicios Disponibles
  └─ Ruta directa: /dashboard/configuracion

✓ Toasts disponibles en:
  └─ Componentes Showcase → Tab "Toasts"
  └─ Ruta directa: /components-showcase
  └─ Automáticamente al crear/eliminar servicios

✓ Footer visible en:
  └─ Landing Page
  └─ Ruta directa: /
```

---

## 🎯 Pruebas de Integración

### Test 3.1: Flujo Completo de Servicios
```
1. Login a /dashboard
2. Ve a Configuración
3. Ve la sección de Servicios
4. Crea un nuevo servicio
   └─ Toast de éxito
5. Intenta crear sin datos
   └─ Toast de error
6. Elimina un servicio
   └─ Toast de confirmación
7. Verifica responsive en mobile
```

### Test 3.2: Flujo de Toasts
```
1. Ve a componentes-showcase
2. Haz clic cada botón de toast
3. Observa comportamiento correcto
4. Ve a Configuración
5. Crea servicio → Toast automático
6. Elimina servicio → Toast automático
```

### Test 3.3: Flujo de Footer
```
1. Ve a landing page
2. Scrollea a footer
3. Verifica todos los elementos
4. Haz hover sobre enlaces
5. Redimensiona ventana (responsive)
6. Verifica en mobile
```

---

## 📱 Responsive Testing

### Breakpoints a Probar:
- iPhone 12 (390px)
- iPad (768px)
- Desktop (1024px)
- Large Desktop (1440px)

### Herramientas:
```bash
# Chrome DevTools
F12 → Responsive Design Mode → Ctrl+Shift+M

# Verificar en dispositivos reales si es posible
# Usar un proxy si necesitas testear en mobile
```

---

## ⚡ Performance Testing

```
□ Servicios Management:
  ├─ Cargar página: < 1s
  ├─ Abrir modal: instantáneo
  ├─ Crear servicio: < 500ms con animación
  └─ Eliminar: inmediato

□ Toasts:
  ├─ Aparecen: instantáneo
  ├─ Desaparecen: suave (3s)
  └─ Sin memory leaks

□ Footer:
  ├─ Cargar: < 100ms
  ├─ No afecta performance
  └─ CSS optimizado
```

---

## ✅ Checklist Final

```
GESTIÓN DE SERVICIOS:
  □ Visualizar servicios
  □ Crear servicio
  □ Validación
  □ Eliminar servicio
  □ Responsive

TOASTS:
  □ Toast éxito
  □ Toast error
  □ Toast info
  □ Toast advertencia
  □ Stack múltiples
  □ En componentes reales

FOOTER:
  □ Visualización
  □ Estilo
  □ Hover effects
  □ Responsive
  □ Logo clickeable
  □ Copyright dinámico

GENERAL:
  □ Sin errores en console
  □ Navegación funciona
  □ Performance OK
  □ Responsive OK
  □ Accesibilidad OK
```

---

## 🚀 Deployment Testing

Antes de deployar a producción:

```
□ Todas las pruebas manuales pasadas
□ Responsive en móvil real
□ Sin errores en console
□ Todos los links funcionan
□ Toasts aparecen correctamente
□ Servicios se guardan/eliminan
□ Footer se ve profesional
□ SEO optimizado (metadata)
```

---

**Fecha:** 2 de Mayo de 2026
**Estado:** Listo para QA y Testing
