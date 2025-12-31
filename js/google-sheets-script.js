// Script de Google Apps Script para recibir suscripciones de newsletter
// Creado para CreaFilms - Blog Newsletter

function doGet(e) {
  return ContentService.createTextOutput('API funcionando correctamente');
}

function doPost(e) {
  try {
    // Obtener la hoja activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Si la hoja está vacía, agregar encabezados
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Fecha', 'Hora', 'Email', 'Fuente', 'IP', 'User Agent']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Obtener datos del POST
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Error al parsear JSON: ' + parseError.toString()
      })).setMimeType(ContentService.MimeType.JSON);
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

    // Verificar que el email no esté vacío
    if (!email) {
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'Email es requerido'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Verificar si el email ya existe (solo si hay más de 1 fila)
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var existingEmails = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
      var emailExists = existingEmails.some(function(row) {
        return row[0] === email;
      });

      if (emailExists) {
        return ContentService.createTextOutput(JSON.stringify({
          'status': 'warning',
          'message': 'Este email ya está suscrito'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Agregar nueva fila con los datos
    sheet.appendRow([mexicoTime, mexicoHour, email, source, ip, userAgent]);

    // Enviar respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Suscripción registrada exitosamente'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // En caso de error, devolver mensaje de error
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba (opcional)
function testDoPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test@ejemplo.com',
        source: 'blog',
        ip: '192.168.1.1',
        userAgent: 'Test Browser'
      })
    }
  };

  var result = doPost(testData);
  Logger.log(result.getContent());
}
