# JEDPA 2026 — Estado del proyecto y traspaso

> Documento para retomar el trabajo en un chat nuevo. Leer junto con `AGENTS.md`, que contiene las reglas obligatorias de arquitectura y UI.
> Última actualización: 8 de octubre de 2026.

## 1. Qué es el proyecto

Plataforma web administrativa para los **Juegos Escolares Deportivos y Paradeportivos (JEDPA) 2026**, organizados por el IPD/MINEDU (Perú). Sirve para:

1. Registrar participantes y cargar sus documentos.
2. Revisar y aprobar los documentos.
3. Generar la credencial (código único y QR) e imprimirla.
4. Registrar la entrega física, separada de la impresión.
5. Exportar reportes a Excel, con auditoría completa de cada cambio.

Plan original: 4 semanas, con Next.js, PostgreSQL y Cloudinary.

**Estado actual:** solo hay **frontend con datos simulados**. El backend no empezó. La maqueta es navegable y refleja el modelo real del cliente.

### Fuentes del cliente

No están en el repo porque contienen datos personales de menores. Las tiene el usuario.

- `Plan_Desarrollo_JEDPA_2026_Final.docx`: alcance, flujo, módulos, estados, plan de 4 semanas.
- `Respuestas_preguntas.docx`: respuestas del cliente, con tablas en imágenes. Ver la sección 3.
- `CopiaSeguridad2910 - NUEVO - Control de IMPRESIÓN de documentos.xlsx`: planilla operativa de 2024. Ver la sección 3.

## 2. Cómo correrlo

```
npm install
npm run dev   # http://localhost:3000 → /login (cualquier correo y contraseña entran)
```

- Next.js **16.4** (App Router, `cacheComponents` y `partialPrefetching` activados), React 19.3, Tailwind 4 y `lucide-react`.
- **Leer `node_modules/next/dist/docs/` antes de usar APIs de Next**: hay cambios incompatibles con versiones anteriores.
- `useParams`, `usePathname` y `useSearchParams` con rutas dinámicas requieren un `<Suspense>`, y las páginas ya lo tienen.
- Los datos viven en memoria en el cliente: **se reinician al recargar**.
- En la barra superior hay un selector **"Ver como"** (Administrador / Coordinador / Operador). Es solo para probar los permisos; no es una funcionalidad real.

### Particularidades del entorno del usuario

- Windows, carpeta dentro de **OneDrive**: `C:\Users\Admin\OneDrive\Desktop\desktop\Openlabs\jedpa-frontend`.
- Varios archivos quedaron con atributo de **solo lectura**, lo que provocó EPERM al correr `npm install`. Solución: `attrib -r *.* /s`.
- Si se trabaja desde un chat en la nube vinculado al equipo:
  - No correr `npm install` desde el shell remoto, porque es Linux y rompería los binarios de Windows de `node_modules`.
  - La forma de sincronizar que funcionó: compilar y probar en el workspace en la nube, armar un `.tgz` y pasarlo a `node_modules/.cache/`. Luego `tar xzf --overwrite` en la carpeta. Si un archivo da "Permission denied", hacer `rm` y copiarlo. El permiso de borrado se pide al usuario.
- En el sandbox en la nube Google Fonts no responde. Para compilar ahí, quitar temporalmente `next/font` de `app/layout.tsx`. **No subir ese cambio.**
- No se hizo ningún commit. El usuario tiene archivos en stage (`git add`).

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
| `/dashboard` | Inicio: 4 tarjetas de proceso, avance por macro (sin acceso para el operador), estado general y actividad |
| `/registration` | **Paso 1**: cola de integrantes con documentos faltantes u observados, más el alta de integrante de delegación |
| `/review` | **Paso 2**: cola de revisión de documentos |
| `/credentials` | **Paso 3**: pestañas "Por generar", "Por imprimir" e "Impresas" |
| `/deliveries` | **Paso 4**: pestañas "Por entregar" y "Entregadas" |
| `/participants`, `/participants/[id]` | Consulta y **ficha vertical por pasos** (`?from=<cola>` activa la barra "Siguiente participante"; `?step=` abre un paso) |
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
- **Auditoría:** toda mutación pasa por `services/auditContext.ts`.
- **Mock:** 8 macros × 2 delegaciones × 6 integrantes, más 6 credenciales especiales (`mocks/`). La macro M8 no tiene RD cargada, para mostrar el caso bloqueado.

### Estándares de UX/UI acordados

Las reglas están en `AGENTS.md`, sección 5. Resumen:

- **Rojo `#BF0909` (el color del logo):**
  - para la acción principal, que es el único botón rojo;
  - para lo que bloquea o requiere atención: faltantes, observados, conteos pendientes y avance de entrega.
- El negro identifica la fila, el gris da contexto y lo terminado va apagado.
- **Lo hecho se ve apagado y lo pendiente, fuerte.**
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
- **En celular no hay etiquetas por fila.** Cada tabla define una columna oculta en escritorio con `mobile: "title"`, que arma la tarjeta con `RowSummary` (o `ParticipantSummary`). La tarjeta tiene hasta tres niveles de texto (título, contexto y nota tenue) y debajo lo importante. Las tarjetas van separadas y sin avatar. Si hay chips de pendientes, no se repite el estado. Si la fila solo abre la ficha, se muestra una flecha en lugar del botón (`mobileRowAction={false}`).

### Responsive (celular y tablet)

- **Desde 1024 px (`lg`)**: sidebar fijo. **Por debajo**: el mismo sidebar se abre como menú lateral con el botón hamburguesa. Abajo del menú están el usuario y, en celular, el selector "Ver como".
- **En celular (menos de 768 px)**: barra inferior fija con Inicio y los 4 pasos con sus contadores (`BottomNav`).
- **`DataTable`**: en celular cada fila se muestra como tarjeta. Por defecto la primera columna es el título, la columna sin encabezado es la acción y el resto se muestra como "etiqueta: valor". Se ajusta por columna con `mobile` ("title" | "detail" | "action" | "hidden") y `mobileLabel`. Para ocultar una columna en tablet y laptop, se usa `className: "hidden xl:table-cell"`. Las tablas tipo planilla usan `mobileLayout="scroll"`.
- **Modales**: en celular se abren como hoja inferior, con los botones a lo ancho.
- **Filtros** (`FilterBar`): en celular, la búsqueda ocupa una fila y los filtros van de a dos por fila.
- **Ficha**: en celular las acciones de cada documento ocupan todo el ancho. En el paso de credencial, la acción va arriba de la vista previa.
- Las capturas se revisaron a 390 px, 820 px y 1650 px.

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
- **Permisos dentro de cada pantalla:** hoy solo se filtran el menú y las páginas.
- **Diplomas**, si el cliente confirma que entran.

### Backend (no empezado)

- PostgreSQL, autenticación con usuarios individuales, la API que reemplace a `services/` manteniendo las mismas firmas, Cloudinary con acceso protegido, token del QR, auditoría inmutable, importación, generación de PDF, respaldos y deploy.
