<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Reglas de arquitectura del proyecto (OBLIGATORIAS)

Estas reglas aplican a todo el código de este repositorio, sin excepciones y en cualquier sesión. Si una tarea parece requerir romperlas, hay que detenerse y consultarlo antes.

## 1. Screaming architecture

La estructura de carpetas tiene que mostrar de qué trata el negocio, no qué framework se usa. El código se organiza por **dominio (feature)**, no por tipo técnico.

```
app/                      → SOLO rutas de Next. page.tsx y layout.tsx delgados: importan de features y componen.
features/
  <domain>/               → participants, documents, credentials, deliveries, reports,
                            audit, administration, auth, dashboard…
    components/           → componentes tontos del dominio
    containers/           → conectan datos y lógica con los componentes tontos
    hooks/                → estado y lógica de UI del dominio
    services/             → acceso a la API (o a datos mock mientras no haya backend)
    domain/               → reglas de negocio como funciones puras (estados, validaciones)
    mocks/                → datos de prueba
    types.ts
    index.ts              → API pública del feature; es lo único que se importa desde afuera
shared/
  ui/                     → componentes genéricos sin conocimiento del negocio (Button, Table, Badge, Modal…)
  lib/                    → utilidades genéricas
  types/
```

- `app/` no contiene lógica ni componentes propios: solo enruta y delega en `features/`.
- Un feature no importa archivos internos de otro feature: solo a través de su `index.ts`.
- `shared/` nunca importa de `features/`.
- Si algo solo lo usa un feature, vive en ese feature, no en `shared/`.

## 2. Componentes tontos (presentacionales)

- Reciben todo por **props** y comunican acciones por **callbacks** (`onApprove`, `onSubmit`…).
- **Prohibido** dentro de un componente tonto: fetch o llamadas a services, acceso a stores o contexto de negocio, reglas de negocio, y decidir estados del flujo.
- Solo se permite estado visual efímero e inevitable (por ejemplo, un tooltip abierto). Se prefieren componentes controlados.
- La lógica va en `hooks/`, la orquestación en `containers/` y las reglas en `domain/`, como funciones puras.
- `"use client"` solo donde haga falta interactividad (normalmente en containers), no por defecto.

## 3. Tamaño de archivos

- **Un componente por archivo.**
- Objetivo: menos de **120 líneas** por archivo. **Máximo: 150.** Si se pasa, se divide (subcomponentes, hooks o helpers) antes de seguir.
- Nada de archivos "dios" con cientos de líneas mezclando UI, estado y lógica.

## 4. Convenciones

- **Todos los nombres de código van en inglés**: carpetas, archivos, componentes, funciones, variables, tipos y claves (`features/participants`, `features/deliveries`, `DeliveryModal`, `getParticipantStatus`).
- Solo el texto visible para el usuario (etiquetas, mensajes) va en español.
- Los estados y catálogos (estados del participante, estados de documento, lugares de entrega) se definen **una sola vez**, en `domain/`, como constantes tipadas.
- Mientras no exista backend, los `services/` devuelven datos de `mocks/` con la misma firma que tendrá la API real, para que reemplazarlos no toque la UI.

## 5. Estándares de UX/UI (acordados con el equipo)

- **Rojo `#BF0909` (el color del logo) para dos cosas:**
  - la acción principal de cada pantalla, que es el único botón rojo;
  - lo que necesita atención: documentos que faltan u observados, conteos pendientes, avance de entrega y estados "Pendiente de documentos" y "Observada".
- El negro es para acciones secundarias y para el dato que identifica la fila. El contorno es para opciones y el gris para el contexto. Lo terminado ("Entregada", "Activo") va en gris apagado. Paleta: blancos, grises, negros y ese rojo.
- **Lo hecho se ve apagado y lo pendiente, fuerte.**
- Las pantallas de proceso siguen el camino feliz: Registro → Revisión → Credenciales → Entrega. Cada cola muestra una tarjeta "Siguiente" destacada y el resto en una tabla discreta.
- La ficha del participante es vertical, por pasos: el actual abierto, los terminados plegados y los bloqueados con su motivo.
- Las acciones de excepción van en "Más acciones", nunca compitiendo con el camino feliz.
- Mostrar solo la acción que corresponde al estado de cada elemento, no todas.
- Sin etiquetas en MAYÚSCULAS. Textos en español, en tono directo y con verbos de acción.

## 6. Estado del proyecto

El contexto del cliente, lo hecho, los supuestos y lo pendiente están en **`docs/PROJECT_STATUS.md`**. Hay que leerlo al empezar un chat nuevo.
