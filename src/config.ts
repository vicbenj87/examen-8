// ────────────────────────────────────────────────────────────────────────
// Configuración de envío a Google Sheets
// ────────────────────────────────────────────────────────────────────────
// Para que los resultados se registren automáticamente en tu Google Sheet,
// debes desplegar el Google Apps Script incluido en:
//   docs/GOOGLE_APPS_SCRIPT.md
// y pegar aquí la URL que te entregue el despliegue como "Web App".
//
// Ejemplo: 'https://script.google.com/macros/s/AKfycbx.../exec'
export const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/REEMPLAZA_CON_TU_ID_DE_DESPLIEGUE/exec';

// Nombres de las pestañas del spreadsheet donde se debe registrar cada fila.
// El Apps Script de referencia escribe la misma fila en ambas pestañas.
export const SHEET_TABS = ['Sheet1', 'RC8'];

export const EXPLANATION_SECONDS = 15;
export const QUESTION_SECONDS = 30;
export const FEEDBACK_SECONDS = 4;
