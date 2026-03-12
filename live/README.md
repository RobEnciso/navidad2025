# CREAFILMS LIVE — Guía de Operación

Sistema de transmisión en vivo para bodas con sala virtual personalizada.

---

## 📋 Contenido

1. [Setup Inicial](#setup-inicial-solo-una-vez)
2. [Antes de Cada Boda](#antes-de-cada-boda)
3. [El Día del Evento](#el-día-del-evento)
4. [Después del Evento](#después-del-evento)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Setup Inicial (solo una vez)

### Paso 1: Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto:
   - Nombre: `creafilms-live`
   - Contraseña: guárdala en un lugar seguro
   - Región: elige la más cercana a México (Sao Paulo o Virginia)

### Paso 2: Ejecutar el SQL

1. En Supabase, ve a **SQL Editor** (ícono `<>` en el menú lateral)
2. Clic en **New Query**
3. Abre el archivo `sql-supabase.sql` de este proyecto
4. Copia **TODO** el contenido
5. Pégalo en el editor de Supabase
6. Clic en **Run** (o presiona Ctrl+Enter)
7. Deberías ver: `Success. No rows returned`

Esto creó las tablas `eventos` y `comentarios` con todas las políticas de seguridad.

### Paso 3: Habilitar Realtime

1. En Supabase, ve a **Database** → **Replication**
2. Busca la tabla `comentarios`
3. Activa el switch en la columna **Realtime**
4. Guarda los cambios

### Paso 4: Obtener credenciales

1. En Supabase, ve a **Settings** → **API**
2. Encontrarás dos valores:

```
Project URL:
https://abcdefghijklmnop.supabase.co

anon / public key:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Copia estos valores

### Paso 5: Configurar el sitio

1. Abre el archivo `/live/config.js`
2. Reemplaza los valores:

```javascript
supabaseUrl: 'https://TU-PROYECTO.supabase.co',
supabaseKey: 'eyJhbGci...' // Tu anon key completa
```

3. También actualiza:

```javascript
whatsappNumero: '5213221234567', // Tu número con código de país
```

4. Guarda el archivo
5. Haz commit y push a GitHub
6. Netlify detectará los cambios y desplegará automáticamente

---

## 📅 Antes de Cada Boda

### Paso 1: Obtener el youtube_id

**Si ya tienes el video grabado:**
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- El ID es: `dQw4w9WgXcQ` (lo que viene después de `v=`)

**Si vas a transmitir en vivo:**
1. Ve a [YouTube Studio](https://studio.youtube.com)
2. Clic en **Crear** → **Transmitir en vivo**
3. Configura el stream (título, descripción, privacidad)
4. **Importante**: Configura como **No listado** (no privado, no público)
5. Copia la URL del stream
6. Extrae el ID (parte después de `v=`)

### Paso 2: Crear el evento en Supabase

**Método 1 - Desde Table Editor (más fácil):**

1. Ve a Supabase → **Table Editor**
2. Selecciona la tabla `eventos`
3. Clic en **Insert** → **Insert row**
4. Llena los campos:
   - `nombre_pareja`: "Ana & Carlos"
   - `fecha`: "Sábado 15 de Marzo, 2025"
   - `lugar`: "Hacienda Los Arcos, Puerto Vallarta"
   - `youtube_id`: "dQw4w9WgXcQ"
   - `mensaje_bienvenida`: "Gracias por acompañarnos..." (personalizar)
   - `activo`: **false** (déjalo en false por ahora)
5. Clic en **Save**

**Método 2 - SQL directo:**

```sql
INSERT INTO eventos (nombre_pareja, fecha, lugar, youtube_id, mensaje_bienvenida, activo)
VALUES (
  'Ana & Carlos',
  'Sábado 15 de Marzo, 2025',
  'Hacienda Los Arcos, Puerto Vallarta',
  'dQw4w9WgXcQ',
  'Gracias por acompañarnos en este día tan especial. Su presencia, aunque virtual, nos llena de alegría.',
  false
);
```

### Paso 3: Preparar el link para invitados

El link que compartirás es **siempre el mismo**:

```
https://estudiocreafilms.com/live/sala/
```

Compártelo con los novios para que lo envíen a sus invitados.

### Paso 4: Generar código QR (opcional)

1. Ve a [qr-code-generator.com](https://www.qr-code-generator.com/)
2. Pega el link: `https://estudiocreafilms.com/live/sala/`
3. Descarga el QR en alta resolución
4. Envíalo a los novios para que lo impriman en invitaciones

---

## 🎥 El Día del Evento

### Antes de que comience la ceremonia

#### 1. Iniciar el stream en YouTube

1. Ve a [YouTube Studio](https://studio.youtube.com)
2. Inicia la transmisión en vivo
3. **ESPERA** a que YouTube confirme que estás transmitiendo
4. Verifica que el video se vea bien

#### 2. Activar el evento en Supabase

**Opción A - Desde Table Editor:**

1. Ve a Supabase → **Table Editor** → tabla `eventos`
2. Busca el evento de hoy
3. Haz doble clic en la celda `activo`
4. Cambia de `false` a `true`
5. Presiona Enter para guardar

**Opción B - SQL:**

```sql
-- Primero, desactiva cualquier otro evento
UPDATE eventos SET activo = false WHERE activo = true;

-- Luego, activa el evento de hoy (cambia el nombre de la pareja)
UPDATE eventos
SET activo = true,
    youtube_id = 'TU_ID_SI_CAMBIO'
WHERE nombre_pareja = 'Ana & Carlos';
```

#### 3. Verificar que funciona

1. Abre una **ventana de incógnito** en tu navegador
2. Ve a: `https://estudiocreafilms.com/live/sala/`
3. Deberías ver:
   - ✅ Nombres de los novios en el header
   - ✅ Fecha y lugar
   - ✅ Video de YouTube reproduciéndose
   - ✅ Contador de espectadores (mínimo 1: tú)
   - ✅ Formulario de comentarios

#### 4. Avisar a los invitados

Los invitados que ya tenían el link pueden entrar directamente.
Si es necesario, envía recordatorio:

```
¡La transmisión ya comenzó!
https://estudiocreafilms.com/live/sala/
```

---

## ✅ Después del Evento

### Desactivar el evento

**Opción 1 - Inmediatamente:**

Si no quieres que más personas vean el video:

```sql
UPDATE eventos
SET activo = false
WHERE nombre_pareja = 'Ana & Carlos';
```

**Opción 2 - Dejar activo 24-48 horas:**

Puedes dejarlo activo para que quienes se lo perdieron puedan verlo después.
El video de YouTube quedará disponible automáticamente.

### Entregar a los novios

1. El video queda guardado automáticamente en YouTube
2. Envía a los novios:
   - Link del video en YouTube
   - Opcionalmente: exporta los comentarios desde Supabase

### Exportar comentarios (opcional)

1. Ve a **Table Editor** → tabla `comentarios`
2. Filtra por `evento_id` del evento
3. Clic en el menú `⋮` → **Download as CSV**
4. Envía el archivo a los novios

### Limpiar para el próximo evento

**NO es necesario** eliminar eventos antiguos.

Simplemente asegúrate de que solo **UN** evento esté con `activo = true` a la vez.

Si quieres eliminar un evento antiguo:

```sql
DELETE FROM eventos WHERE nombre_pareja = 'Ana & Carlos';
```

Esto eliminará también todos los comentarios (por el `ON DELETE CASCADE`).

---

## 🔧 Troubleshooting

### ❌ El video no carga

**Problema:** Aparece error de YouTube o video en negro.

**Causas posibles:**
1. El `youtube_id` es incorrecto
2. El video está en **Privado** (debe ser Público o No listado)

**Solución:**
1. Verifica el ID:
   - URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - ID: `dQw4w9WgXcQ`
2. Verifica privacidad del video en YouTube Studio
3. Actualiza en Supabase:
   ```sql
   UPDATE eventos
   SET youtube_id = 'ID_CORRECTO'
   WHERE activo = true;
   ```

### ❌ Los comentarios no aparecen

**Problema:** Los comentarios no se muestran o no se envían.

**Causa 1:** Realtime no está activado.

**Solución:**
1. Ve a Supabase → **Database** → **Replication**
2. Activa Realtime para la tabla `comentarios`

**Causa 2:** Políticas RLS no están configuradas.

**Solución:**
1. Ve a **Authentication** → **Policies**
2. Verifica que existan las políticas para `comentarios`:
   - "Comentarios son visibles públicamente" (SELECT)
   - "Cualquiera puede agregar comentarios" (INSERT)
3. Si no existen, vuelve a ejecutar el SQL completo

### ❌ El contador de espectadores está en 0

**Problema:** Siempre muestra "0 personas viendo".

**Causa:** Presence no está funcionando.

**Solución:**
1. Verifica que Realtime esté activado en Supabase
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que `supabaseUrl` y `supabaseKey` sean correctos en `config.js`

### ❌ Aparece "La transmisión comenzará pronto"

**Problema:** Aunque ya activaste el evento, sigue apareciendo la pantalla de "próximamente".

**Causa:** El evento no está realmente activo o hay problemas de caché.

**Solución:**
1. Verifica en Supabase:
   ```sql
   SELECT * FROM eventos WHERE activo = true;
   ```
2. Debe devolver **1 fila**
3. Si no devuelve nada, activa el evento
4. Recarga la página con `Ctrl + F5` (hard refresh)
5. Prueba en modo incógnito

### ❌ Error "CONFIG no está configurado"

**Problema:** Aparece error en consola.

**Causa:** Las credenciales en `config.js` no están actualizadas.

**Solución:**
1. Abre `/live/config.js`
2. Verifica que los valores NO sean los por defecto:
   - ❌ `'TU_SUPABASE_URL_AQUI'`
   - ✅ `'https://abcdefg.supabase.co'`
3. Actualiza y guarda
4. Haz commit y push
5. Espera a que Netlify despliegue

---

## 📞 Soporte

**Si tienes problemas no cubiertos aquí:**

1. Revisa los logs en consola del navegador (F12 → Console)
2. Revisa los logs en Supabase (SQL Editor → History)
3. Verifica que todas las tablas estén creadas correctamente

---

## 📝 Notas Adicionales

### Privacidad del video en YouTube

- **Público:** Cualquiera puede encontrarlo en búsquedas
- **No listado:** ✅ **RECOMENDADO** - Solo quien tenga el link puede verlo
- **Privado:** ❌ NO funcionará con la sala virtual

### Límites de YouTube

- Necesitas **verificar tu cuenta** en YouTube para transmisiones largas (+15 min)
- Las transmisiones en vivo tienen un delay natural de 10-30 segundos (es normal)
- Puedes hacer stream de hasta **12 horas continuas**

### Capacidad de Supabase (tier gratuito)

- Base de datos: hasta **500 MB**
- Realtime: hasta **200 conexiones simultáneas**
- Para bodas grandes (>200 invitados online), considera upgrade a plan Pro

### Backup de comentarios

Los comentarios quedan guardados en Supabase permanentemente.

**Para exportarlos:**
1. Ve a **Table Editor** → `comentarios`
2. Filtra por el `evento_id` que necesites
3. Menú `⋮` → **Download as CSV**

---

**✨ ¡Listo! Sistema operativo y documentado.**
