/**
 * Recibe los resultados del examen "La Era de los Jueces"
 * y los guarda en la pestaña RC8 de la hoja de cálculo.
 *
 * CÓMO ACTUALIZARLO (mantiene la misma URL /exec):
 *   1. Abre la hoja > Extensiones > Apps Script.
 *   2. Reemplaza todo el contenido por este código y guarda.
 *   3. Implementar > Administrar implementaciones > ✏️ (lápiz)
 *      > Versión: "Nueva versión" > Implementar.
 *   4. Listo: la URL que termina en /exec sigue siendo la misma.
 */

var SPREADSHEET_ID = "1xtsQyxeNEno3EJ8s-7o0RqXdHr3HORiRuI5vUCOv-gE";
var SHEET_NAME = "RC8";

var HEADERS = [
  "Fecha y Hora",
  "Nombre",
  "Apellido",
  "IBM / Hogar / Barrio",
  "Puntaje",
  "Total Preguntas",
  "Porcentaje",
  "Detalle de Respuestas"
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet(data.hoja || SHEET_NAME);

    sheet.appendRow([
      new Date(),
      data.nombre || "",
      data.apellido || "",
      data.ibm || "",
      data.puntaje,
      data.total,
      data.porcentaje + "%",
      data.respuestas || ""
    ]);

    return respond({ ok: true });
  } catch (error) {
    return respond({ ok: false, error: String(error) });
  }
}

/** Permite probar la implementación abriendo la URL en el navegador. */
function doGet() {
  return respond({ ok: true, mensaje: "El script está activo. Escribe en la hoja " + SHEET_NAME });
}

function getSheet(name) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
