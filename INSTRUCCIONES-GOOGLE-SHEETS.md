# 📊 Instrucciones para Configurar Google Sheets - Newsletter CreaFilms

## Paso 1: Crear la Hoja de Google Sheets

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja en blanco
3. Nómbrala: **"Newsletter CreaFilms"** (o el nombre que prefieras)
4. Deja la hoja vacía (el script creará automáticamente los encabezados)

---

## Paso 2: Abrir el Editor de Apps Script

1. En tu hoja de Google Sheets, ve al menú superior
2. Click en **Extensiones** → **Apps Script**
3. Se abrirá una nueva pestaña con el editor de código

---

## Paso 3: Pegar el Código

1. En el editor que se abrió, verás un archivo llamado `Code.gs`
2. **Borra todo** el código que aparece por defecto
3. Abre el archivo `google-sheets-script.js` que creé en tu carpeta
4. **Copia TODO el contenido** de ese archivo
5. **Pégalo** en el editor de Apps Script (en `Code.gs`)
6. Click en el icono de **💾 Guardar** (o Ctrl+S)
7. Dale un nombre al proyecto: "Newsletter CreaFilms API"

---

## Paso 4: Implementar como Web App

1. En el editor de Apps Script, click en **Implementar** (Deploy) → **Nueva implementación** (New deployment)
2. Click en el icono de ⚙️ junto a "Seleccionar tipo"
3. Selecciona **Aplicación web** (Web app)
4. Configura lo siguiente:
   - **Descripción:** Newsletter CreaFilms
   - **Ejecutar como:** Yo (tu email)
   - **Quién tiene acceso:** Cualquier persona (Anyone)
5. Click en **Implementar** (Deploy)
6. Te pedirá autorización:
   - Click en **Autorizar acceso**
   - Selecciona tu cuenta de Google
   - Click en **Avanzado** → **Ir a [nombre del proyecto] (no seguro)**
   - Click en **Permitir**
7. **¡IMPORTANTE!** Copia la **URL de la aplicación web** que aparece
   - Se verá algo así: `https://script.google.com/macros/s/AKfycbz.../exec`
   - Guárdala en un lugar seguro

---

## Paso 5: Actualizar el Código del Formulario

Ahora necesitas poner esa URL en tu código:

1. Abre el archivo `blog.html`
2. Busca la línea que dice: `const GOOGLE_SHEETS_URL = 'TU_URL_AQUI';`
3. Reemplaza `TU_URL_AQUI` con la URL que copiaste en el paso anterior
4. Guarda el archivo `blog.html`

**Ejemplo:**
```javascript
// Antes:
const GOOGLE_SHEETS_URL = 'TU_URL_AQUI';

// Después:
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
```

---

## Paso 6: Probar el Formulario

1. Abre tu página `blog.html` en el navegador
2. Baja hasta el formulario de newsletter
3. Ingresa un email de prueba (por ejemplo: `prueba@test.com`)
4. Click en "Suscribirme"
5. Deberías ver el mensaje: "¡Gracias por suscribirte! 🎉"
6. Ve a tu hoja de Google Sheets
7. **Deberías ver una nueva fila** con:
   - Fecha
   - Hora
   - Email
   - Fuente (blog)
   - IP
   - User Agent

---

## 🎉 ¡Listo! Tu Sistema de Newsletter está Funcionando

### ¿Qué pasa ahora cuando alguien se suscribe?

1. El usuario ingresa su email en `blog.html`
2. El email se envía a Google Sheets automáticamente
3. Google Sheets guarda toda la información
4. El usuario ve un mensaje de confirmación
5. **Tú puedes ver todos los emails en tu hoja de Google Sheets**

---

## 📊 Cómo Ver los Emails Recopilados

- Simplemente abre tu hoja de Google Sheets
- Verás una tabla con todos los suscriptores
- Puedes exportar a Excel, CSV, o usar directamente desde Sheets
- Puedes ordenar, filtrar, y analizar los datos

---

## 🔧 Solución de Problemas

### "El formulario no envía los datos"
- Verifica que pegaste correctamente la URL en `blog.html`
- Asegúrate de que la URL termine en `/exec`
- Revisa la consola del navegador (F12) para ver errores

### "Dice que el email ya está suscrito"
- Es normal, el sistema evita duplicados
- Si quieres permitir duplicados, puedes quitar esa validación del script

### "Error de autorización"
- Ve a Apps Script → Implementaciones
- Click en el icono ⚙️ → Administrar implementaciones
- Verifica que "Quién tiene acceso" esté en "Cualquier persona"

---

## 📝 Notas Importantes

- ✅ Los datos se guardan en TU cuenta de Google (privados y seguros)
- ✅ Es completamente GRATIS (Google Sheets es gratuito)
- ✅ Puedes ver los emails en tiempo real
- ✅ El sistema verifica duplicados automáticamente
- ✅ Guarda fecha, hora, IP y navegador del usuario
- ✅ Compatible con todos los navegadores

---

## 🚀 Próximos Pasos (Opcional)

Una vez que tengas emails recopilados, puedes:
1. Exportar los emails a Mailchimp, ConvertKit, etc.
2. Crear campañas de email marketing
3. Enviar newsletters manualmente desde tu email
4. Integrar con servicios de automatización

---

¿Necesitas ayuda? Guarda este archivo para referencia futura.
