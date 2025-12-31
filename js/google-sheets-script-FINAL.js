// Script de Google Apps Script para recibir suscripciones de newsletter
// Creado para CreaFilms - Blog Newsletter
// Versión FINAL con manejo completo de CORS y errores

function doGet(e) {
  return ContentService.createTextOutput('API de Newsletter CreaFilms funcionando correctamente ✅');
}

function doPost(e) {
  // Log para debugging
  Logger.log('📨 Nueva petición recibida');
  Logger.log('Datos recibidos: ' + JSON.stringify(e));

  try {
    // Obtener la hoja activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    Logger.log('📄 Hoja obtenida: ' + sheet.getName());

    // Si la hoja está vacía, agregar encabezados
    if (sheet.getLastRow() === 0) {
      Logger.log('📋 Creando encabezados...');
      sheet.appendRow(['Fecha', 'Hora', 'Email', 'Fuente', 'IP', 'User Agent']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
      sheet.setFrozenRows(1);
      Logger.log('✅ Encabezados creados');
    }

    // Obtener datos del POST
    var data;

    // Intentar parsear JSON
    if (e.postData && e.postData.contents) {
      Logger.log('📦 Contenido recibido: ' + e.postData.contents);
      try {
        data = JSON.parse(e.postData.contents);
        Logger.log('✅ JSON parseado correctamente');
      } catch (parseError) {
        Logger.log('❌ Error al parsear JSON: ' + parseError.toString());
        return ContentService.createTextOutput(JSON.stringify({
          'status': 'error',
          'message': 'Error al parsear JSON: ' + parseError.toString()
        })).setMimeType(ContentService.MimeType.JSON);
      }
    } else {
      // Intentar obtener parámetros directamente
      Logger.log('⚠️ No hay postData.contents, intentando con parámetros...');
      data = {
        email: e.parameter.email || '',
        source: e.parameter.source || 'blog',
        ip: e.parameter.ip || 'N/A',
        userAgent: e.parameter.userAgent || 'N/A'
      };
    }

    // Obtener fecha y hora actual de México (UTC-6)
    var now = new Date();
    var mexicoTime = Utilities.formatDate(now, "America/Mexico_City", "yyyy-MM-dd");
    var mexicoHour = Utilities.formatDate(now, "America/Mexico_City", "HH:mm:ss");

    // Datos a guardar
    var email = data.email || '';
    var source = data.source || 'blog';
    var ip = data.ip || 'N/A';
    var userAgent = data.userAgent || 'N/A';

    Logger.log('📧 Email: ' + email);
    Logger.log('🏷️ Fuente: ' + source);

    // Verificar que el email no esté vacío
    if (!email || email === '') {
      Logger.log('❌ Email vacío');
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Email es requerido'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Verificar si el email ya existe (solo si hay más de 1 fila)
    var lastRow = sheet.getLastRow();
    Logger.log('📊 Filas totales: ' + lastRow);

    if (lastRow > 1) {
      var existingEmails = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
      var emailExists = false;

      for (var i = 0; i < existingEmails.length; i++) {
        if (existingEmails[i][0] === email) {
          emailExists = true;
          break;
        }
      }

      if (emailExists) {
        Logger.log('⚠️ Email duplicado: ' + email);
        return ContentService.createTextOutput(JSON.stringify({
          'status': 'warning',
          'message': 'Este email ya está suscrito'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Agregar nueva fila con los datos
    Logger.log('💾 Guardando datos...');
    sheet.appendRow([mexicoTime, mexicoHour, email, source, ip, userAgent]);
    Logger.log('✅ Datos guardados correctamente');

    // Enviar respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Suscripción registrada exitosamente',
      'email': email,
      'timestamp': mexicoTime + ' ' + mexicoHour
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // En caso de error, devolver mensaje de error con detalles
    Logger.log('❌ ERROR GENERAL: ' + error.toString());
    Logger.log('Stack: ' + error.stack);

    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString(),
      'stack': error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba mejorada
function testDoPost() {
  Logger.log('🧪 Iniciando prueba...');

  var testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test-manual@ejemplo.com',
        source: 'test-manual',
        ip: '192.168.1.1',
        userAgent: 'Test Browser Manual'
      })
    }
  };

  var result = doPost(testData);
  var content = result.getContent();

  Logger.log('📤 Respuesta: ' + content);

  // Parsear y mostrar resultado
  try {
    var response = JSON.parse(content);
    Logger.log('✅ Status: ' + response.status);
    Logger.log('📝 Message: ' + response.message);

    if (response.status === 'success') {
      Logger.log('🎉 ¡Prueba exitosa!');
    } else {
      Logger.log('⚠️ Advertencia o error: ' + response.message);
    }
  } catch (e) {
    Logger.log('❌ Error al parsear respuesta: ' + e.toString());
  }

  return content;
}
