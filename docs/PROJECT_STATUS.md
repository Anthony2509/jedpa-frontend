# JEDPA 2026 — Estado del proyecto y traspaso

> Documento para retomar el trabajo en un chat nuevo. Leer junto con `AGENTS.md`, que contiene las reglas obligatorias de arquitectura y UI.
> **El backend ya existe**: repo hermano `../jedpa-backend`, rama `develop`. Su estado, sus endpoints y lo que falta están en `jedpa-backend/docs/PROJECT_STATUS.md`. Para conectar pantallas, ver las secciones 7 y 8 de este documento; la estrategia acordada está en **7.5**.
> Última actualización: 8 de octubre de 2026 (noche, después de conectar las pantallas listas).

## 0. Últimas sesiones (8 de octubre): resumen

### Noche (2): conexión de las pantallas listas

Se conectaron con el backend **solo las pantallas marcadas como "Listo" en 7.3**, sin tocar `jedpa-backend`. Lo demás sigue con datos simulados y queda para el próximo chat (ver **7.6**).

- **Infraestructura:** `shared/lib/apiClient.ts` (cliente HTTP), `shared/lib/useApiQuery.ts` (caché en el cliente sobre `createStore`, sin dependencias nuevas) y `shared/ui/InlineError.tsx`.
- **Sesión real:** login contra `POST /auth/login`, token en memoria y `sessionStorage`, validación con `/auth/me` al recargar, `401` → cierra sesión. `AuthGuard` protege todo `app/(app)`. Se quitó **"Ver como"**.
- **Pantallas conectadas:** login, lugares de entrega, usuarios (con contraseña) y credenciales especiales.
- `next.config.ts`: `experimental.instantInsights.validationLevel = "manual-warning"` (ver 7.6).
- Probado con Playwright contra el backend real, para los 3 roles, a 1440 y 390 px. `tsc` y `eslint` limpios.

### Noche: revisión del backend y plan de conexión

No se tocó código del frontend.

- Se descubrió que el backend **ya existe** en `jedpa-backend`, rama `develop`, y se verificó que funciona: build, lint, 29 tests unitarios y 89 e2e.
- Se escribió `jedpa-backend/docs/PROJECT_STATUS.md`.
- En este documento se agregaron la **sección 7** (cómo conectar cada pantalla, equivalencias de tipos y decisiones pendientes) y la **sección 8** (auditoría del frontend: problemas encontrados).

### Tarde: UI

Se trabajó solo en el frontend, sobre la UI. No hubo cambios de modelo de negocio ni de backend.

1. **Aprovechamiento del espacio en escritorio.**
   - Dashboard: si el usuario no ve el avance por macro (operador), "Actividad reciente" pasa al lado de "Estado general".
   - Ficha del participante: ocupa todo el ancho, con el historial como columna lateral fija desde `xl`.
2. **Responsive completo (celular y tablet).** Incluye menú lateral, barra inferior con los 4 pasos, tablas como tarjetas, modales como hoja inferior, filtros y ficha. Ver la sección 4, "Responsive".
3. **Jerarquía visual de todas las listas.**
   - Lo pendiente pasó de texto plano a chips (`PendingSummary` y `PendingChips`).
   - Las celdas tienen dos niveles.
   - Las tarjetas de celular no llevan etiquetas.
   - Ver la sección 4, "Listas".
4. **Nuevo uso del rojo del logo.**
   - Antes era solo para la acción principal.
   - Ahora también marca lo que requiere atención: faltantes, observados, conteos pendientes y avance de entrega.
   - Los estados terminados ("Entregada", "Activo") pasaron de negro sólido a gris apagado.
   - `AGENTS.md`, sección 5, ya tiene la regla nueva.
5. **Bug corregido: hidratación.** En desarrollo, el servidor sembraba dos veces la auditoría simulada y "Actividad reciente" no coincidía con el navegador. Ahora `seedAuditEntries` (`features/audit/services/auditApi.ts`) es idempotente.

## 1. Qué es el proyecto

Plataforma web administrativa para los **Juegos Escolares Deportivos y Paradeportivos (JEDPA) 2026**, organizados por el IPD/MINEDU (Perú). Sirve para:

1. Registrar participantes y cargar sus documentos.
2. Revisar y aprobar los documentos.
3. Generar la credencial (código único y QR) e imprimirla.
4. Registrar la entrega física, separada de la impresión.
5. Exportar reportes a Excel, con auditoría completa de cada cambio.

Plan original: 4 semanas, con Next.js, PostgreSQL y Cloudinary.

**Estado actual:**

- **Frontend** (este repo): maqueta navegable con **datos simulados en memoria**, que refleja el modelo real del cliente.
- **Backend** (`jedpa-backend`, rama `develop`): API **NestJS** separada, en `http://localhost:4000/api`, con PostgreSQL en Docker. Tiene el Sprint 1 terminado: login JWT, roles, usuarios, catálogos, delegaciones, participantes y auditoría. Todavía **no tiene** documentos, credenciales, QR, entregas, importación ni reportes.
- **Todavía no están conectados.** Ninguna pantalla llama a la API.

### Fuentes del cliente

No están en el repo porque contienen datos personales de menores. Las tiene el usuario.

- `Plan_Desarrollo_JEDPA_2026_Final.docx`: alcance, flujo, módulos, estados, plan de 4 semanas.
- `Respuestas_preguntas.docx`: respuestas del cliente, con tablas en imágenes. Ver la sección 3.
- `CopiaSeguridad2910 - NUEVO - Control de IMPRESIÓN de documentos.xlsx`: planilla operativa de 2024. Ver la sección 3.

## 2. Cómo correrlo

```
npm install
npm run dev   # http://localhost:3000 → /login (con los usuarios del backend: hay que tenerlo corriendo)
```

- Next.js **16.4** (App Router, `cacheComponents` y `partialPrefetching` activados), React 19.3, Tailwind 4 y `lucide-react`.
- **Leer `node_modules/next/dist/docs/` antes de usar APIs de Next**: hay cambios incompatibles con versiones anteriores.
- `useParams`, `usePathname` y `useSearchParams` con rutas dinámicas requieren un `<Suspense>`, y las páginas ya lo tienen.
- Los datos viven en memoria en el cliente: **se reinician al recargar**.
- El login es real: hace falta el backend corriendo (`../jedpa-backend`, `npm run start:dev`). Para probar cada rol, entrar con `admin@jedpa.local`, `coordinador@jedpa.local` u `operador@jedpa.local` (contraseña `password123`). El backend admite **5 intentos de login por minuto por IP**: si se pasa, esperar un minuto.
- **Backend para conectar:** en `../jedpa-backend` (rama `develop`): `docker compose up -d`, `npm run migration:run`, `npm run seed` y `npm run start:dev`. Usuarios de prueba: `admin@jedpa.local`, `coordinador@jedpa.local` y `operador@jedpa.local`, todos con la contraseña `password123`. Swagger en `http://localhost:4000/docs`. En el `.env` del frontend: `NEXT_PUBLIC_API_URL=http://localhost:4000/api`. Detalles y particularidades de Windows en el status del backend.

### Particularidades del entorno del usuario

- Windows, carpeta dentro de **OneDrive**: `C:\Users\Admin\OneDrive\Desktop\desktop\Openlabs\jedpa-frontend`.
- Varios archivos quedaron con atributo de **solo lectura**, lo que provocó EPERM al correr `npm install`. Solución: `attrib -r *.* /s`.
- Si se trabaja desde un chat en la nube vinculado al equipo:
  - No correr `npm install` desde el shell remoto, porque es Linux y rompería los binarios de Windows de `node_modules`.
  - Flujo que funcionó en la última sesión:
    1. En la carpeta del usuario, armar un `.tgz` del código (sin `node_modules`, `.next` ni `.git`) en `node_modules/.cache/` y pasarlo al workspace.
    2. En el workspace: `npm install`, `git init` con un commit base y `next dev`.
    3. Revisar con capturas de Playwright (Chromium en `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`) a 390, 820, 1440 y 1880 px, para cada rol.
    4. Devolver **solo los archivos cambiados** con `device_commit_files`, uno por uno y nunca `app/layout.tsx` ni `AGENTS.md`. El `git status` del workspace dice cuáles son.
  - Los datos y el rol viven en memoria: para capturar otra pantalla sin perder el rol, navegar con `window.next.router.push(ruta)` en lugar de recargar.
  - El servidor `next dev` del workspace a veces se cae entre turnos. Se levanta con `(setsid nohup npx next dev -p 3000 > /tmp/dev.log 2>&1 < /dev/null &)`. **No usar `pkill -f "next dev"`**, porque mata el propio shell.
- En el sandbox en la nube Google Fonts no responde. Para compilar ahí, quitar temporalmente `next/font` de `app/layout.tsx`. **No subir ese cambio.**
- Si después de sincronizar el usuario ve una versión vieja (por ejemplo, sin chips), es el hot reload de Next: recargar con F5 o cerrar y abrir la pestaña.
- Git: hay dos commits (`first commit` y `feat: add new UI components for improved layout and functionality`) que ya incluyen los cambios de esta sesión. Los commits los hace el usuario; no hacerlos sin que lo pida.

## 3. Lo que confirmó el cliente

**8 tipos de participante (credenciales):** Deportista, Acompañante, Delegado, Entrenador, MINEDU, Invitado, Proveedor acceso total y Proveedor acceso parcial.

- "Paradeportista" no es un tipo: es un deportista con datos de discapacidad.
- En el Excel 2024 aparecen "Entrenador / Delegado" y "Coordinador de delegación". **Decisión del usuario: se usan solo los 8 tipos del documento.**

**Documentos obligatorios:**

| Tipo | Obligatorios |
|---|---|
| Deportista | Resolución directoral (RD), DNI, certificado médico, seguro, foto |
| Delegado | RD, DNI, foto |
| Entrenador | RD, DNI |
| Acompañante | "Todos los deportistas que no cumplen con algún documento obligatorio" |
| MINEDU, Invitado, Proveedores | Ninguno: se crean e imprimen directamente |

Los demás documentos (designación, discapacidad, autorización notarial, responsabilidad de participación, uso de imagen, DDJJ entrenador-delegado) son **opcionales** por decisión del usuario. No bloquean la impresión.

**Resolución directoral:**

- Hay **una por macrorregión**: 8 PDF de 8 a 10 páginas.
- "Subirla al perfil" significa **confirmar que la persona figura en ella**. Así se filtra a los inscritos que no aparecen.

**Delegaciones:**

- Código `M1-AJD-B-D` = macro, código de deporte, categoría (A a E) y género (V/D).
- Cada delegación tiene de 3 a 22 integrantes: deportistas, entrenador y delegado.
- **8 macrorregiones (M1 a M8)**. El Excel 2024 tenía 6; se priorizó el documento de respuestas.

**Impresión:**

- Una imprenta entrega las tarjetas ya impresas (**120 × 155 mm**, papel mate de 200 g).
- El sistema solo imprime **los datos encima**, con una Epson L3250: nombre, documento (DNI/CE/Pasaporte), condición, disciplina, categoría, macrorregión, región y foto. Las credenciales especiales llevan servicio/institución y el nivel de acceso.
- **El QR va en el reverso** y debe mostrar el estado de la documentación.
- Se pidieron 6.600 tarjetas.
- En una credencial de 2024 hay texto impreso dos veces y corrido: **la calibración es un riesgo crítico**.

**Entregas:**

- 4 entregas posibles por persona: **original + 3 duplicados**, cada una con su lugar.
- Hay 11 lugares, cargados en `features/administration/mocks/deliveryPlaces.ts`.

**Roles:**

| | Admin | Coordinador | Operador |
|---|:-:|:-:|:-:|
| Participantes y delegados (subir, revisar, aprobar, imprimir) | ✓ | ✓ | ✓ |
| Credenciales especiales | ✓ | ✓ | |
| Diplomas (imprimir datos sobre un diploma preimpreso) | ✓ | ✓ | ✓ |
| Reportería básica (avance) | ✓ | ✓ | |
| Reportería completa y auditoría | ✓ | | |

Usuarios, lugares de entrega y resoluciones se asumen solo para administrador (las resoluciones también para coordinador).

**Excel 2024:**

- La hoja oculta "ID GENERAL" es el **export del sistema de inscripción**: es el formato que habrá que importar.
- Trae columnas **USUARIO/PASSWORD que NO deben importarse**.
- La calidad de los datos es baja (codificación, espacios, mayúsculas). El importador tendrá que normalizar y reportar errores por fila.
- Pruebas y marcas deportivas: **fuera del MVP** (decisión del usuario).

## 4. Qué está hecho (frontend)

### Rutas

| Ruta | Qué es |
|---|---|
| `/login` | Login de prueba |
| `/dashboard` | Inicio: 4 tarjetas de proceso, avance por macro (sin acceso para el operador), estado general y actividad. Sin el avance por macro, la actividad pasa al lado del estado general |
| `/registration` | **Paso 1**: cola de integrantes con documentos faltantes u observados, más el alta de integrante de delegación |
| `/review` | **Paso 2**: cola de revisión de documentos |
| `/credentials` | **Paso 3**: pestañas "Por generar", "Por imprimir" e "Impresas" |
| `/deliveries` | **Paso 4**: pestañas "Por entregar" y "Entregadas" |
| `/participants`, `/participants/[id]` | Consulta (con columna "Pendiente") y **ficha vertical por pasos** (`?from=<cola>` activa la barra "Siguiente participante"; `?step=` abre un paso). Desde `xl` el historial va en una columna lateral fija (`RecordHistoryPanel`); por debajo se abre con el botón "Historial" |
| `/delegations`, `/delegations/[code]` | Listado y detalle con **"Generar e imprimir"** y **"Entregar a la delegación"** en bloque |
| `/special-credentials` | Alta y listado de MINEDU, invitados y proveedores (admin y coordinador) |
| `/resolutions` | Las 8 RD por macro: carga y cantidad de participantes por confirmar |
| `/reports` | Avance por macro y, para admin, detalle con exportación CSV (columnas del Excel 2024) |
| `/audit` | Auditoría filtrable, de solo lectura (admin) |
| `/administration/users`, `/administration/delivery-places` | Configuración (admin) |
| `/verify/[code]` | Página pública que muestra el QR: estado de la documentación, sin número de documento |

### Modelo y reglas

Todo está en `features/participants/domain/`:

- **Estados:** pendiente de documentos → en revisión → observada → lista para generar → **emitida** → impresa → entregada. Se calculan con `getParticipantStatus`; no se guardan.
- **Generar e imprimir son pasos separados.** Imprimir nunca marca como entregada.
- **Copias** (`credentialCopies.ts`): original + hasta 3 duplicados, cada uno con su entrega. Si el duplicado más reciente no fue entregado, el estado vuelve a "Impresa".
- **Colas** (`workQueues.ts`): definen el camino feliz y alimentan el menú numerado y los contadores.
- **Auditoría:** toda mutación pasa por `services/auditContext.ts`. La siembra inicial usa `seedAuditEntries`, que solo carga si el registro está vacío.
- **Pendientes** (`pendingLabels.ts`): `getRegistrationPending`, `getReviewPending` y `getCurrentPending` devuelven un `PendingSummary` (`tone`, `lead`, `items`, `code`), no un texto. Las colas lo reciben con la prop `getPending`; sin ella no se muestra la columna (por ejemplo, en "Por generar").
- **Mock:** 8 macros × 2 delegaciones × 6 integrantes, más 6 credenciales especiales (`mocks/`). La macro M8 no tiene RD cargada, para mostrar el caso bloqueado.

### Estándares de UX/UI acordados

Las reglas están en `AGENTS.md`, sección 5. Resumen:

- **Rojo `#BF0909` (el color del logo):**
  - para la acción principal, que es el único botón rojo;
  - para lo que bloquea o requiere atención: faltantes, observados, conteos pendientes y avance de entrega.
- El negro identifica la fila, el gris da contexto y lo terminado va apagado.
- **Lo hecho se ve apagado y lo pendiente, fuerte.** Así se aplica en los estados (`PARTICIPANT_STATUS_META`):
  - "Pendiente de documentos": contorno rojo.
  - "Observada": rojo suave.
  - "En revisión": contorno gris.
  - "Lista para generar", "Emitida" e "Impresa": contorno negro.
  - "Entregada": gris apagado.
- **Colas:** tarjeta "Siguiente" destacada arriba y tabla tranquila abajo.
- **Ficha vertical por pasos:** el paso actual abierto, los terminados plegados y los bloqueados con su motivo.
- **Acciones de excepción** (duplicado, pasar a acompañante, anular, deshacer entrega) dentro de **"Más acciones"**.
- **Documentos:** solo la acción que corresponde a su estado; los opcionales plegados.
- Sin etiquetas en MAYÚSCULAS. Paleta: blancos, grises, negros y el rojo como único color.

### Listas (jerarquía visual)

- **Lo pendiente es un dato, no un texto.** Los documentos que faltan, que hay que corregir o que están por revisar se modelan como `PendingSummary` (`participants/domain/pendingLabels.ts`) y se muestran con `PendingChips`:
  - chip punteado rojo: falta;
  - chip rojo sólido: corregir;
  - chip negro sobre blanco: por revisar. Es trabajo de rutina, no un problema.
- **Forma de los chips:** cuadrados para documentos y redondeados (`Badge`) solo para estados.
- **Cada celda tiene dos niveles:** el dato principal en oscuro y el contexto debajo, chico y en gris. Por ejemplo, "Deportista" arriba y "M1-AJD-A-D" abajo, en `ParticipantTypeCell`. Los ceros y los "—" van apagados.
- **En celular no hay etiquetas por fila.** Cada tabla define una columna oculta en escritorio con `mobile: "title"`, que arma la tarjeta con `RowSummary` (o `ParticipantSummary`). La tarjeta tiene hasta tres niveles de texto (título, contexto y nota tenue) y debajo lo importante. Las tarjetas van separadas y sin avatar. Si hay chips de pendientes, no se repite el estado. Si la fila solo abre la ficha, se muestra una flecha en lugar del botón (`mobileRowAction={false}`). Si el botón es largo, hay una etiqueta corta para celular (`mobileRowActionLabel`, por ejemplo "Entregar").
- **La flecha de las tarjetas flota en la esquina** para no quitarle ancho al contenido, y los títulos dejan `pr-6` para ella.
- **Tarjetas con cifras** (ejemplo: `DelegationCard`): identidad arriba, dos cifras grandes lado a lado (lo pendiente en rojo) y la barra de avance (`ProgressBar`, en rojo) a todo el ancho.
- **Componentes clave:**
  - `shared/ui`: `DataTable`, `DataTableCards`, `RowSummary` y `ProgressBar`.
  - `participants`: `ParticipantIdentity` (escritorio, con avatar), `ParticipantSummary` (celular, sin avatar), `ParticipantTypeCell`, `PendingChips` y `WorkQueueView`/`WorkQueueTable`.
  - `delegations`: `DelegationCard`, `DelegationIdentity`, `DelegationProgress` y `DelegationPendingDocs`.

### Responsive (celular y tablet)

- **Desde 1024 px (`lg`)**: sidebar fijo. **Por debajo**: el mismo sidebar se abre como menú lateral con el botón hamburguesa. Abajo del menú está el usuario.
- **En celular (menos de 768 px)**: barra inferior fija con Inicio y los 4 pasos con sus contadores (`BottomNav`).
- **`DataTable`**: en celular cada fila se muestra como tarjeta. Por defecto la primera columna es el título, la columna sin encabezado es la acción y el resto se muestra como "etiqueta: valor" (etiqueta a la izquierda y valor a la derecha). En la práctica todas las listas usan una columna `mobile: "title"` propia (ver "Listas"). Se ajusta por columna con `mobile` ("title" | "detail" | "action" | "hidden") y `mobileLabel`. Para ocultar una columna en tablet y laptop, se usa `className: "hidden xl:table-cell"`. Las tablas tipo planilla usan `mobileLayout="scroll"`.
- **Modales**: en celular se abren como hoja inferior, con los botones a lo ancho.
- **Filtros** (`FilterBar`): en celular, la búsqueda ocupa una fila y los filtros van de a dos por fila.
- **Ficha**: en celular las acciones de cada documento ocupan todo el ancho. En el paso de credencial, la acción va arriba de la vista previa.
- **Shell** (`shared/ui/layout`): `AppFrame`, `Topbar`, `Sidebar` (con `footer` y `onNavigate`) y `BottomNav`. El estado del menú vive en `features/navigation/containers/AppShell.tsx`.
- `Button` y `FileUploadButton` no parten el texto (`whitespace-nowrap`). `FileUploadButton` es `relative` para que su `<input>` oculto no estire la página.
- Las capturas se revisaron a 390, 820, 1440, 1650 y 1880 px.

## 5. Supuestos vigentes

Están marcados en el código con `ASSUMPTION`:

1. El acompañante no tiene documentos obligatorios y el paso de deportista a acompañante es **manual** ("Más acciones" → "Pasar a acompañante").
2. Los documentos no marcados son opcionales.
3. Acceso por defecto: MINEDU total, Invitado parcial; los proveedores según su tipo.
4. El QR no cambia al imprimir duplicados.
5. "Anular credencial" y "Deshacer entrega" están visibles pero **deshabilitados** hasta definir la regla.
6. La agrupación de regiones por macro del mock es inventada.

## 6. Qué falta

### Esperando al cliente

Se le envió el PDF `Preguntas_pendientes_JEDPA_2026_ronda2.pdf`, con 15 preguntas:

- Regla de acompañantes.
- Documentos opcionales y si el documento de designación es obligatorio.
- Foto del entrenador.
- Acceso de MINEDU e Invitado.
- Regiones de cada macro.
- Entrega por delegación y significado de "entregador".
- Fecha y formato del export de inscripción.
- Artes 2026, tarjetas de prueba y si la Epson imprime la foto.
- Íconos de accesos.
- Si los duplicados anulan la copia anterior.
- Quién ve el QR.
- Lugar de impresión.
- Reglas para anular y deshacer.
- **Diplomas** (fuera del plan original).
- Pendientes de la primera ronda: protección de datos (Ley 29733 y Cloudinary), después del mes de soporte y notificaciones.

### Frontend

- **Hoja de impresión:** PDF de 120 × 155 mm con solo los datos y la foto, una plantilla por tipo, reverso con QR y **ajuste de márgenes configurable**. Hoy solo existe una vista previa.
- **QR real** (por ejemplo, `qrcode.react`) que apunte a `/verify/<token>`. Hoy es un dibujo de muestra (`credentials/domain/qrPattern.ts`).
- **Importador del Excel/export** con vista previa, normalización y reporte de errores. Hoy el botón está deshabilitado.
- **Edición de datos personales:** el botón existe pero no hace nada.
- Probar el responsive en un teléfono real, en particular la barra inferior y los modales en iOS.
- Detalles de UI pendientes:
  - En escritorio, "Credenciales › Por generar" no tiene columna de pendientes y deja un hueco entre "Tipo" y el botón.
  - `CopiesTable` (copias dentro de la ficha) todavía usa el formato genérico de tarjeta "etiqueta: valor".
  - Varios archivos de tabla tienen más de un componente pequeño (por ejemplo, `Pending` y `ResolutionFile`). `DelegationsTable` ya se separó; convendría hacer lo mismo con los demás para cumplir "un componente por archivo".
- **Permisos dentro de cada pantalla:** hoy solo se filtran el menú y las páginas.
- **Diplomas**, si el cliente confirma que entran.

### Backend

Ya empezó y vive en otro repo: ver `jedpa-backend/docs/PROJECT_STATUS.md`. Lo que falta de su lado para cada pantalla está en la sección 7.3.

## 7. Conexión con el backend

La API real está en `jedpa-backend` (rama `develop`). Contrato completo: `jedpa-backend/docs/PROJECT_STATUS.md` (sección 3) y Swagger (`http://localhost:4000/docs`).

**Advertencia:** la idea original era reemplazar `services/` manteniendo las mismas firmas. **No alcanza.** Hoy las pantallas leen stores síncronos (`useSyncExternalStore`) con **todos** los participantes en memoria, y calculan en el navegador las colas, los contadores, las delegaciones, el dashboard y los reportes (`getWorkQueue`, `buildDelegations`, `buildDashboardSummary`, `buildMacroProgress`, `usePagination`). Con la API serán unos 6.600 participantes, paginados de a 100 como máximo. Esos cálculos tienen que pasar al backend (endpoints de resumen) y el frontend necesita una capa de carga asíncrona.

### 7.1 Infraestructura común (antes de cualquier pantalla)

1. **Cliente HTTP** en `shared/lib/apiClient.ts`:
   - base `NEXT_PUBLIC_API_URL`, cabecera `Authorization: Bearer <token>` y JSON;
   - errores con la forma `{ statusCode, message, error }`, donde `message` puede ser un texto o un **arreglo**: unirlo para mostrarlo;
   - `401` → cerrar sesión y volver a `/login`; `403` → mensaje "Tu rol no tiene acceso"; `409` → mostrar el mensaje del backend (documento o correo duplicado);
   - no puede importar de `features/` (regla de `shared/`).
2. **Sesión real** en `features/auth/services/session.ts`:
   - `login` → `POST /auth/login`; guardar `accessToken` y `user`;
   - al cargar la app → `GET /auth/me`;
   - logout; el token dura 8 horas y no hay refresh.
   - Decisión pendiente: dónde guardar el token. Recomendado: en memoria más `sessionStorage`. Evitar `localStorage`.
3. **Proteger las rutas de `app/(app)`.** Hoy cualquiera entra sin sesión (ver 8.1). Como el token vive en el navegador, el guard tiene que ser del lado del cliente: el layout de `(app)` muestra un "cargando" hasta validar con `/auth/me` y redirige a `/login` si no hay sesión. En Next 16 el antiguo `middleware` se llama `proxy`: **leer `node_modules/next/dist/docs/`** antes de usarlo.
4. **Quitar "Ver como"** (`RoleSwitcherContainer`, que se usa en `TopbarContainer` y en `DrawerFooterContainer`) y `setDemoRole`. El rol viene de `/auth/me`.
5. **Capa de datos asíncrona.** Cada lista pide su página al backend con los filtros en la URL y muestra estados de carga, vacío y error. Hay dos opciones; la decide el equipo porque la segunda agrega una dependencia:
   - un hook propio (`useApiQuery`) sobre `createStore` como caché;
   - TanStack Query.

   Después de cada mutación, volver a pedir los datos en lugar de actualizar el store localmente.
6. **Mappers**, uno por feature (por ejemplo, `features/participants/services/participantMapper.ts`): convierten el DTO del backend al tipo del frontend y al revés (sección 7.2). Así la UI no cambia de golpe.
7. **Borrar la auditoría del lado del cliente** (`auditParticipantChange`, `logAuditEntry`, `seedAuditEntries` y `seedAuditLog`). El backend audita cada cambio dentro de la misma transacción; una auditoría escrita por el navegador se puede falsear y quedaría duplicada.
8. **No guardar datos por usuario en módulos del servidor.** Los stores de `createStore` son variables de módulo: si una página los llena durante el render en el servidor, los comparte entre **todas** las peticiones y usuarios. Con datos reales, cargarlos solo en el cliente o por petición.
9. Retirar los mocks (`features/*/mocks`) a medida que se conecta cada pantalla. Conservarlos solo para tests o para Storybook, si se agrega.

### 7.2 Equivalencias de tipos (frontend → backend)

| Frontend | Backend | Notas |
|---|---|---|
| `Role`: `admin`, `coordinator`, `operator` | `role`: `ADMIN`, `COORDINADOR`, `OPERADOR` | En `/users` el rol es un objeto `{ id, name }`; al crear o editar se envía `roleId` (de `GET /roles`) |
| `User.name`, `User.active` | `fullName`, `isActive` | También `lastLoginAt` |
| `ParticipantType`: `athlete`, `companion`, `delegate`, `coach`, `minedu`, `guest`, `supplier_full`, `supplier_partial` | `participantType.code`: `DEPORTISTA`, `ACOMPANANTE`, `DELEGADO`, `ENTRENADOR`, `MINEDU`, `INVITADO`, `PROVEEDOR_TOTAL`, `PROVEEDOR_PARCIAL` | Al escribir se envía `participantTypeId` (UUID de `GET /participant-types`), no el código |
| `idType`: `dni`, `ce`, `passport` | `documentType`: `DNI`, `CE`, `PASAPORTE` | **Cuidado con el nombre:** en el backend, `documentType` del participante es el tipo de documento de **identidad**; el catálogo de documentos a subir es otra cosa (`document-types`) |
| `idNumber` | `documentNumber` | CE y pasaporte: 6 a 12 caracteres alfanuméricos (el frontend hoy acepta 6 o más de cualquier tipo) |
| `firstName` | `firstNames` | |
| `lastName` (un solo campo) | `paternalLastName` (obligatorio) y `maternalLastName` (opcional) | Hay que separar el campo en el formulario y en `getFullName` |
| — | `gender` (`FEMALE`/`MALE`) y `birthDate` (`AAAA-MM-DD`) | **Obligatorios para los regulares.** El frontend no los tiene: sin ellos el alta da `400` |
| `school` | `schoolName` | También existen `schoolModularCode`, `ugel`, `province`, `district`, `phone`, `email`, `disabilityType` y `disabilityClass` |
| `delegation.region` | `region` **del participante** | La región no es parte de la delegación en el backend |
| `delegation` (`macro`, `sport`, `sportCode`, `category`, `gender` `V`/`D`) | `delegationId` y `delegation` (`code`, `macroRegion.code`, `sport.name`/`sport.code`, `category`, `gender` `D`/`V`) | En el backend la delegación es una entidad: hay que elegir una existente (o crearla, ver 7.4) |
| `institution` | `institution` | Igual. Solo para especiales |
| `access` (por participante) | `participantType.accessLevel` (`TOTAL`/`PARTIAL`/`null`), **por tipo** | Ver 7.4 |
| `DocumentType`: `directoral_resolution`, `designation_document`, `dni`, `medical_certificate`, `disability_certificate`, `insurance`, `notarial_authorization`, `participation_responsibility`, `image_use_authorization`, `coach_delegate_affidavit`, `photo` | `RESOLUCION_DIRECTORAL`, `DOCUMENTO_DESIGNACION`, `DNI`, `CERTIFICADO_MEDICO`, `CERTIFICADO_DISCAPACIDAD`, `SEGURO`, `AUTORIZACION_NOTARIAL`, `RESPONSABILIDAD_PARTICIPACION`, `AUTORIZACION_USO_IMAGEN`, `DDJJ_ENTRENADOR_DELEGADO`, `FOTO` | Mismo orden. Los obligatorios por tipo vienen de `GET /document-requirements`: dejar de usar `REQUIRED_DOCUMENTS` cuando esté conectado |
| `DocumentStatus`: `pending`, `approved`, `observed`, `not_applicable` | `PENDING`, `APPROVED`, `OBSERVED`, `NOT_APPLICABLE` | El módulo de documentos aún no tiene API |
| `ParticipantStatus`: `pending_documents`, `in_review`, `observed`, `ready_to_print`, **`issued`**, `printed`, `delivered` | `PENDING_DOCUMENTS`, `IN_REVIEW`, `OBSERVED`, `READY_TO_PRINT`, `PRINTED`, `DELIVERED` | **`issued` no existe en el backend** (ver 7.4). El estado lo calcula y guarda el backend: en las listas usar su `status` y no `getParticipantStatus` |
| `Credential.code` (`JEDPA-2026-0001`) | `credential_copies.verificationToken`, aleatorio y **por ejemplar** | Sin API todavía. Ver 7.4 y 8.4 |
| `DeliveryPlace.active` | `isActive` | |
| `AuditEntry` (`userName`, `participantName`, `field`, `before`, `after`) | `{ user: { fullName }, participantId, action, entity, changes: { campo: { old, new } } }` | Un registro del backend puede traer **varios campos**: mostrar una línea por campo. El backend no devuelve el nombre del participante (pendiente de su lado) |
| `AuditAction`: `participant_created`, `participant_updated`, `document_uploaded`, `document_approved`/`document_observed`, `credential_issued`, `credential_printed`, `credential_reprinted`, `credential_delivered` | `CREATE` (con `entity: "Participant"`), `UPDATE`, sin equivalente, `DOCUMENT_REVIEW`, sin equivalente, `PRINT`, `REPRINT`, `DELIVER` | También existen `ACTIVATE`, `DEACTIVATE`, `IMPORT`, `STATUS_CHANGE` y `DIPLOMA_PRINT`. Hay que ampliar `AUDIT_ACTION_LABELS` |
| Fechas | ISO 8601 (`timestamptz`) | Igual que hoy |

### 7.3 Plan por pantalla

Estado: **Listo** = el backend ya tiene todo; **Parcial** = una parte se puede conectar ya; **Bloqueado** = falta el módulo del backend.

| Pantalla | Estado | Endpoints | Qué hay que hacer |
|---|---|---|---|
| `/login` | Listo | `POST /auth/login`, `GET /auth/me` | 7.1, puntos 2 a 4. Mostrar el mensaje genérico del backend y el `429` ("Demasiados intentos, espera un minuto") |
| Menú lateral y barra inferior (contadores de los 4 pasos) | Bloqueado | — | Hoy cuentan con `getWorkQueue` sobre todos los participantes. Necesita un endpoint de conteos por cola (backend §5, punto 9) |
| `/dashboard` | Bloqueado | — | Las tarjetas de proceso, "Estado general" y "Avance por macro" necesitan endpoints de resumen. **"Actividad reciente" usa `/audit-logs`, que es solo para ADMIN**: el coordinador y el operador recibirían `403`. Ocultarla para ellos o pedir un endpoint propio |
| `/participants` | Parcial | `GET /participants` (`search`, `status`, `participantTypeId`, `macroRegionId`, `delegationId`, `page`, `limit`) | Mover la búsqueda, los filtros y la paginación al servidor: reemplazar `matchesSearch` y `usePagination`, y poner los filtros en la URL. Los selectores de tipo y macro salen de `/participant-types` y `/macro-regions` (por UUID). La columna "Pendiente" necesita documentos (bloqueada) |
| `/participants/[id]` (ficha) | Parcial | `GET /participants/:id`, `PATCH /participants/:id` | Datos personales: conectar ya. **"Editar datos"** (hoy no hace nada) → formulario con `PATCH`. "Pasar a acompañante" → `PATCH` con el `participantTypeId` de `ACOMPANANTE` (es la misma categoría, así que el backend lo permite). Pasos de documentos, credencial y entrega: bloqueados. **Historial: `/audit-logs?participantId=` es solo para ADMIN**; para los otros roles hace falta un endpoint de historial del participante o mostrarlo solo al admin |
| `/registration` (paso 1) | Parcial | `POST /participants`, `GET /delegations`, catálogos | **Alta de integrante:** agregar apellido materno, género de la persona y fecha de nacimiento; elegir la delegación de una lista (`GET /delegations?macroRegionId=&sportId=…`) en vez de escribir el código del deporte; mover la región al participante. La cola necesita documentos (bloqueada) |
| `/review` (paso 2) | Bloqueado | — | Módulo de documentos y revisión (Sprint 2 del backend) |
| `/credentials` (paso 3) | Bloqueado | — | Módulo de credenciales (PDF y QR). Antes, decidir lo de "Emitida" (7.4) |
| `/deliveries` (paso 4) | Bloqueado | `GET /delivery-places` (ya sirve para el selector) | Módulo de entregas |
| `/delegations` | Parcial | `GET /delegations` | El listado se puede conectar, pero las tarjetas muestran cifras (pendientes, listos, por entregar y entregados) que hoy salen de `buildDelegations`. Necesita el resumen por delegación del backend |
| `/delegations/[code]` | Parcial | `GET /participants?delegationId=` | El backend no busca por código exacto (solo por `id` o "contiene"). Pedir `?code=` o cambiar la ruta a `/delegations/[id]`. "Generar e imprimir" y "Entregar a la delegación" en bloque: bloqueados |
| `/special-credentials` | Listo (con ajuste) | `POST /participants` (tipo especial, `institution`), `GET /participants?participantTypeId=` | Solo ADMIN y COORDINADOR (el backend responde `403` al operador). El listado necesita un filtro por categoría o 4 consultas, una por tipo. El selector de acceso por participante choca con el modelo del backend (7.4) |
| `/resolutions` | Bloqueado | — | Carga de RD por macro y vinculación (backend §6) |
| `/reports` | Bloqueado | — | Avance por macro y exportación. La exportación CSV actual (`downloadCsv`) arma el archivo con todos los participantes en el navegador: pasa a ser un Excel generado por el backend |
| `/audit` | Parcial | `GET /audit-logs` (`userId`, `action`, `participantId`, `from`, `to`, paginado) | Conectar con paginación del servidor. El filtro por usuario pasa a ser por `userId` (selector de `GET /users`). **La búsqueda de texto por nombre de participante no existe en el backend** y la respuesta no trae ese nombre |
| `/administration/users` | Listo (con ajuste) | `GET/POST/PATCH /users`, `PATCH /users/:id/active`, `GET /roles` | **Agregar el campo contraseña**: obligatorio al crear (12 a 72 caracteres, con letra y número) y opcional al editar. Mostrar los errores del backend: "No puede cambiar su propio rol", "No puede desactivar su propio usuario" y el del último ADMIN |
| `/administration/delivery-places` | Listo | `GET/POST/PATCH /delivery-places`, `PATCH /delivery-places/:id/active` | Conectar tal cual. Es la mejor primera pantalla para probar el cliente HTTP |
| `/verify/[code]` | Bloqueado | — | Hoy busca entre todos los participantes cargados en el navegador. Pasará a `GET /verify/:token` (público) |

**Orden sugerido:**

1. Infraestructura (7.1).
2. Login.
3. Lugares de entrega.
4. Usuarios.
5. Consulta de participantes.
6. Ficha (datos personales y edición).
7. Alta de integrante y credenciales especiales.
8. Auditoría.
9. Lo demás, a medida que el backend agregue documentos, credenciales, entregas y resúmenes.

### 7.4 Decisiones pendientes entre frontend y backend

Hay que acordarlas antes de construir esos módulos. También están en el status del backend (§5).

1. **Paso "Emitida" (`issued`).** El frontend separa "Generar" de "Imprimir"; el backend no tiene ese estado y crea el token del QR **por ejemplar** al imprimir. El supuesto 4 del frontend dice que el QR no cambia con los duplicados. Propuesta: token por participante, creado al generar, con la impresión registrada por ejemplar.
2. **Nivel de acceso.** El frontend lo elige por participante; el backend lo fija por tipo, con MINEDU en `null`. Pregunta P7 al cliente.
3. **Documentos opcionales.** El frontend los lista por tipo (`OPTIONAL_DOCUMENTS`); el backend todavía no los tiene sembrados (`is_required = false`).
4. **Alta en una delegación nueva.** En el frontend cualquier rol registra un integrante escribiendo los datos de la delegación; en el backend solo el ADMIN y el COORDINADOR crean delegaciones. Opciones: un selector de delegaciones existentes con "Crear delegación" solo para ellos, o "buscar o crear" en el backend.
5. **Historial y actividad para roles que no son ADMIN** (ver la tabla de 7.3).
6. **Dónde guardar el token** (7.1, punto 2).

### 7.5 Estrategia acordada: conectar sin tocar el backend

Decisión del 8 de octubre (noche): **se conecta el frontend usando solo lo que el backend ya tiene.** No se cambia nada en `jedpa-backend`. Lo que le falta al backend se resuelve con soluciones provisorias del lado del frontend, o la pantalla se queda con datos simulados.

**Se conecta tal cual:**

- Login, sesión real y protección de rutas; se quita "Ver como".
- Lugares de entrega.
- Usuarios, agregando el campo de contraseña.
- Consulta de participantes, con búsqueda, filtros y paginación en el servidor.
- Ficha del participante: datos personales, "Editar datos" (`PATCH`) y "Pasar a acompañante".
- Credenciales especiales y alta de integrante. El formulario suma fecha de nacimiento, género y apellido materno, y la delegación se elige de una lista.
- Auditoría (solo ADMIN).

**Soluciones provisorias** (marcarlas en el código con `// TEMP(backend):` para retirarlas cuando el backend tenga la versión definitiva):

| Falta en el backend | Solución provisoria en el frontend |
|---|---|
| Buscar una delegación por código exacto | `GET /delegations?search=<código>` y quedarse con la que coincide exacto |
| Nombre del participante en `/audit-logs` | Pedir `GET /participants/:id` por cada `participantId` distinto de la página (20 filas como máximo) |
| Historial y actividad para roles que no son ADMIN | Mostrar el historial de la ficha y "Actividad reciente" **solo al ADMIN** |
| Que el operador cree una delegación | El operador solo elige entre las existentes; ADMIN y COORDINADOR pueden crearla desde el mismo formulario (`POST /delegations`) |
| Nivel de acceso por participante | Usar el `accessLevel` del tipo y quitar el selector de acceso del formulario de especiales |
| Filtro por categoría (especiales) | Filtrar por cada tipo especial (`participantTypeId`) y unir los resultados |

**Se quedan con datos simulados** hasta que exista el módulo del backend: revisión de documentos, credenciales y QR, entregas, resoluciones, reportes, `/verify/[code]` y los contadores del menú y del dashboard.

**Período de transición:** convivirán dos fuentes de datos. Los participantes creados en la API **no aparecen** en las colas simuladas (revisión, credenciales y entrega), y viceversa. Para que no confunda, mostrar en esas pantallas un aviso "Usa datos de prueba: pendiente de conexión con el backend".

**Capa de datos:** hook propio (`useApiQuery`) sobre el `createStore` existente, sin dependencias nuevas, salvo que el equipo prefiera TanStack Query.

**Orden de trabajo:**

1. Cliente HTTP (`shared/lib/apiClient.ts`), sesión real y guard de rutas.
2. Lugares de entrega, para probar el circuito completo.
3. Usuarios.
4. Consulta de participantes.
5. Ficha: datos personales y edición.
6. Alta de integrante y credenciales especiales.
7. Auditoría.

Cada paso se prueba contra el backend corriendo (en el workspace de la nube o en la PC con `npm run start:dev`). Se devuelven solo los archivos cambiados y sin commits.

### 7.6 Qué se conectó y qué queda (8 de octubre, noche)

**Conectado:**

| Pantalla | Endpoints | Notas |
|---|---|---|
| `/login` y sesión | `POST /auth/login`, `GET /auth/me` | `features/auth/services/session.ts`. El `429` muestra "Demasiados intentos…". Si ya hay sesión en la pestaña, `/login` lleva al dashboard |
| Protección de rutas | — | `features/auth/containers/AuthGuard.tsx` en `app/(app)/layout.tsx`: muestra "Verificando tu sesión…" y redirige a `/login` si no hay sesión |
| `/administration/delivery-places` | `GET /delivery-places?includeInactive=true`, `POST`, `PATCH /:id/active` | `useDeliveryPlaces()` ahora lee la API, así que **los modales de entrega simulados ya muestran los lugares reales** |
| `/administration/users` | `GET /users` (paginado de a 20), `POST`, `PATCH /:id`, `PATCH /:id/active`, `GET /roles` | Contraseña obligatoria al crear y opcional al editar (12 a 72, letra y número). Al editar, el rol solo se envía si cambió. Los errores del backend ("No puede cambiar su propio rol", "No puede desactivar su propio usuario", el del último ADMIN) se muestran tal cual |
| `/special-credentials` | `GET /participant-types`, `GET /participants?participantTypeId=`, `POST /participants` | Formulario con apellido paterno y materno; el acceso sale del tipo |

**Piezas nuevas para reutilizar:**

- `apiGet`, `apiPost` y `apiPatch` (`shared/lib/apiClient.ts`): agregan el token, unen `message` cuando es arreglo y lanzan `ApiError` con `status`. Los mensajes del backend ya vienen en español y se muestran tal cual; solo el `429` tiene texto fijo.
- `useApiQuery(key, fetcher)` (`shared/lib/useApiQuery.ts`): carga una vez por clave y comparte el resultado. Después de una mutación, `invalidateQueries(prefijo)` vuelve a pedir los datos manteniendo los anteriores en pantalla. `clearQueryCache()` se llama al cerrar sesión. La caché solo se llena desde efectos: nunca se comparte en el servidor.
- `features/participants/services/participantMapper.ts`, `participantDtos.ts` y `participantsApi.ts`: mapeo de tipos, documento de identidad y estado. `Participant.status` (opcional) es el estado guardado por el backend; los mocks no lo tienen.
- `fromApiRole` y `toApiRole` (`features/auth`).

**Soluciones provisorias (`TEMP(backend)` en el código):**

- Credenciales especiales: una consulta por tipo especial (primera página, hasta 100 por tipo) unida y ordenada por apellido. Si hay más, se avisa "Se muestran N de M".
- Credenciales especiales: las filas **no abren la ficha**, porque `/participants/[id]` sigue leyendo los mocks y no encontraría a los participantes reales. Reactivar `onRowClick` al conectar la ficha.
- Nivel de acceso: sale del tipo. MINEDU muestra "Acceso por definir" (P7).

**Validación de instant navigation (Next 16):** como el token vive en el navegador, el servidor nunca renderiza las pantallas de `app/(app)` y Next las reportaba como "dropped segment" en cada página. `instant = false` en el layout no alcanza (lo pide en cada página), así que en `next.config.ts` se pasó a `validationLevel: "manual-warning"`: solo se validan los segmentos que exporten `instant`.

**Período de transición:** las pantallas simuladas (colas, ficha, dashboard, delegaciones) siguen leyendo los mocks y conviven con los datos reales. Las credenciales especiales creadas en la API **no aparecen** en "Credenciales", y las 6 especiales simuladas no aparecen en `/special-credentials`. Los contadores del menú siguen saliendo de los mocks.

**Siguiente chat, en este orden** (7.5, pasos 4 a 7):

1. Consulta de participantes (`/participants`): búsqueda, filtros y paginación en el servidor.
2. Ficha: datos personales, "Editar datos" (`PATCH`) y "Pasar a acompañante". Después, reactivar el clic en las filas de especiales.
3. Alta de integrante (`/registration`): apellido materno, género, fecha de nacimiento y delegación elegida de la lista.
4. Auditoría (solo ADMIN), con el nombre del participante por `GET /participants/:id` (TEMP).
5. Agregar el aviso "Usa datos de prueba: pendiente de conexión con el backend" en las pantallas simuladas.
6. Borrar la auditoría del lado del cliente (7.1, punto 7) cuando ninguna pantalla conectada dependa de ella.

## 8. Auditoría del frontend: problemas encontrados (8 de octubre)

Revisión del código completo: 257 archivos. `tsc` y `eslint` limpios. El único error de `tsc` sin `.next` es `LayoutProps` en `app/layout.tsx`, un tipo global que genera Next al compilar, así que no es un problema real.

### 8.1 Seguridad (bloquean producción)

1. ~~**No hay protección de rutas.**~~ **Resuelto** (8 de octubre, noche): `AuthGuard` y login real.
2. ~~**"Ver como" permite cambiar de rol.**~~ **Resuelto**: se quitó.
3. **Los permisos solo se aplican en el menú, en `RequirePermission` (páginas) y en dos casos puntuales** (`reports_full` en reportes y `reports_basic` en el dashboard). Dentro de las pantallas no hay más control. Ejemplos concretos:
   - el operador puede abrir desde `/participants` la ficha de una credencial especial (MINEDU, invitado o proveedor) y ver sus acciones, aunque el backend le responderá `403`;
   - el historial de la ficha (`RecordHistoryPanel`) se muestra a todos los roles, pero en el backend la auditoría es solo para ADMIN.

   Las acciones que el rol no puede ejecutar deben ocultarse (ya estaba en la sección 6).
4. **La auditoría se escribe en el navegador** (`auditContext.ts`). Hay que borrarla al conectar (7.1, punto 7).
5. **El código de la credencial es secuencial y adivinable** (`JEDPA-2026-0001`, armado con el `id` en `credentialsApi.ts`), y `/verify/[code]` lo usa como llave pública. Con ese esquema se podrían recorrer todas las credenciales. El QR debe llevar el token aleatorio del backend y nunca el código visible.

### 8.2 Arquitectura y datos

1. **Todo se calcula con la lista completa** de participantes en memoria: colas, contadores del menú, dashboard, delegaciones, reportes, paginación (`usePagination` corta el arreglo) y búsqueda (`matchesSearch`). Ver el inicio de la sección 7.
2. **El estado lo calcula el frontend** (`getParticipantStatus`). En el backend se guarda y lo recalcula el servidor. Mantener la función solo para la ficha mientras no haya API de documentos, y luego usar el `status` del backend.
3. **Las reglas de negocio están duplicadas.** `REQUIRED_DOCUMENTS`, `OPTIONAL_DOCUMENTS`, `DEFAULT_ACCESS`, `SPORTS` y `MACROS` están escritas en el código; en el backend son datos editables (`document-requirements`, `participant-types`, `sports`, `macro-regions`). Al conectar, leerlos de la API para que un cambio del cliente no requiera desplegar el frontend.
4. **`ParticipantsDataProvider`** solo fuerza la carga del mock; su comentario ya dice que ahí irá el proveedor de datos.
5. **Stores de módulo y SSR** (7.1, punto 8).

### 8.3 Reglas de `AGENTS.md`

1. **Un componente por archivo:** 10 archivos tienen más de uno.
   - `administration/components/UsersTable.tsx` (3)
   - `resolutions/components/ResolutionsTable.tsx` (3)
   - `reports/components/MacroProgressTable.tsx` (3)
   - `credentials/components/PrintedCredentialsTable.tsx`
   - `credentials/components/CredentialCard.tsx`
   - `delegations/components/DelegationMembersTable.tsx`
   - `participants/components/ParticipantsTable.tsx`
   - `audit/components/AuditTable.tsx`
   - `participant-record/components/RecordStepSection.tsx`
   - `shared/ui/layout/SidebarMarkers.tsx`
2. **Tamaño:** ningún archivo pasa de 150 líneas. Solo `participants/types.ts` pasa el objetivo de 120 (132), y va a crecer con los campos nuevos: separarlo en `types/participant.ts`, `types/documents.ts`, etc.
3. Cumple el resto: no hay imports internos entre features (todo pasa por `index.ts`), `shared/` no importa de `features/` y ningún componente de `components/` usa services ni stores.

### 8.4 Funcionalidad y validación

1. **El formulario de alta no tiene los campos que exige el backend**: apellido materno, género de la persona y fecha de nacimiento. Además, el código del deporte se escribe a mano en vez de salir del catálogo.
2. **Validación de CE y pasaporte:** el frontend acepta 6 o más caracteres de cualquier tipo; el backend exige de 6 a 12 alfanuméricos. Igualar la validación para dar el error antes de enviar.
3. **El formulario de usuarios no tiene contraseña** (`UserDraft = Omit<User, "id">`).
4. **"Editar datos"** en la ficha (`PersonalDataPanel`) no hace nada.
5. **Las regiones por macro del mock son inventadas** (supuesto 6). Con la API, la región pasa a ser un campo del participante.
6. **"Anular credencial" y "Deshacer entrega"** siguen deshabilitados hasta que el cliente defina la regla (supuesto 5).
