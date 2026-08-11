# Conectar el examen con Google Sheets

Este proyecto envía los resultados del examen (nombre, apellido, ibm, puntaje,
total, porcentaje) mediante una petición `POST` a un **Google Apps Script**
publicado como aplicación web. Sigue estos pasos:

## 1. Abre tu Google Sheet

Spreadsheet: `1xtsQyxeNEno3EJ8s-7o0RqXdHr3HORiRuI5vUCOv-gE`

Debe contener (al menos) dos pestañas con los encabezados en la fila 1:

```
nombre | apellido | ibm | puntaje | total | porcentaje
```

- Pestaña por defecto (gid=0) — puedes dejarla como `Sheet1` o renombrarla.
- Pestaña `RC8` (gid=1113860030).

## 2. Crea el Apps Script

En tu Sheet ve a `Extensiones → Apps Script` y reemplaza el contenido por:

```javascript
const SHEET_NAMES = ['Sheet1', 'RC8'];

function doPost(e) {
  const data = e.parameter;
  const row = [
    data.nombre || '',
    data.apellido || '',
    data.ibm || '',
    data.puntaje || '',
    data.total || '',
    data.porcentaje || '',
  ];

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  SHEET_NAMES.forEach((name) => {
    const sheet = ss.getSheetByName(name);
    if (sheet) {
      sheet.appendRow(row);
    }
  });

  return ContentService.createTextOutput(
    JSON.stringify({ result: 'success' }),
  ).setMimeType(ContentService.MimeType.JSON);
}
```

> Ajusta `SHEET_NAMES` si tu primera pestaña tiene otro nombre.

## 3. Publica como aplicación web

1. `Implementar → Nueva implementación`.
2. Tipo: **Aplicación web**.
3. Ejecutar como: `Yo (tu cuenta)`.
4. Quién tiene acceso: `Cualquier usuario`.
5. Copia la URL que termina en `/exec`.

## 4. Configura el proyecto

Pega la URL en `src/config.ts`:

```ts
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXX/exec';
```

Vuelve a compilar (`npm run build`) y los resultados se registrarán
automáticamente en ambas pestañas cada vez que un usuario termine el examen.

Si la URL no está configurada, la app seguirá funcionando con normalidad y
ofrecerá un botón para **descargar el resultado en CSV** como respaldo.
