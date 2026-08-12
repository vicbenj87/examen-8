/* ==========================================================================
   config.js — Ajustes generales
   Este es el único archivo que necesitas tocar para poner el examen en marcha.
   ========================================================================== */

window.EX = window.EX || {};

EX.CONFIG = {
  /* --- Registro en Google Sheets ---------------------------------------
     1. Abre tu hoja de cálculo.
     2. Extensiones ▸ Apps Script y pega el contenido de apps-script/Codigo.gs
     3. Implementar ▸ Nueva implementación ▸ Aplicación web
        · Ejecutar como: Yo
        · Quién tiene acceso: Cualquier persona
     4. Copia la URL que termina en /exec y pégala aquí abajo.
     Mientras esté vacío, el examen funciona igual y guarda los resultados
     en este dispositivo (los puedes descargar en CSV al terminar).          */
  urlAppsScript: 'https://script.google.com/macros/s/AKfycbx5-15bhhh8xXPXXFUbX_Z8_3UU1X3m4PEXcySMFl49FqyKwDnPdU48OXXdLwlURHV0/exec',

  hojaCalculo: {
    id: '1xtsQyxeNEno3EJ8s-7o0RqXdHr3HORiRuI5vUCOv-gE',
    hoja: 'RC8',
    url: 'https://docs.google.com/spreadsheets/d/1xtsQyxeNEno3EJ8s-7o0RqXdHr3HORiRuI5vUCOv-gE/edit?gid=0#gid=0'
  },

  /* --- Tiempos (milisegundos) --- */
  segundosPorPregunta: 40,
  segundosExplicacion: 15,
  msRevelacion: 3400,        // cuánto se ve la respuesta correcta antes de avanzar
  msRevelacionLarga: 5200,   // para preguntas con varias partes

  /* --- Comportamiento --- */
  mezclarSecciones: true,    // el orden de las secciones cambia en cada intento
  mezclarPreguntas: true,    // el orden dentro de cada sección cambia
  mezclarOpciones: true,     // el orden de las alternativas cambia
  aprobadoDesde: 70,         // porcentaje mínimo para aprobar
  sonidoInicial: true,

  /* --- Textos del resultado según el porcentaje --- */
  veredictos: [
    { desde: 90, titulo: 'Dominio del capítulo', nota: 'Conoces el ciclo de Jueces y sus protagonistas con claridad. Enseña esto a alguien más: es la mejor forma de fijarlo.' },
    { desde: 70, titulo: 'Aprobado con solvencia', nota: 'Tienes la estructura del capítulo. Repasa los puntos marcados en rojo y quedará redondo.' },
    { desde: 50, titulo: 'Vas por buen camino', nota: 'Reconoces las ideas grandes, pero los detalles se te escapan. Vuelve al ciclo de cinco pasos y a los nombres de los jueces.' },
    { desde: 0,  titulo: 'Toca releer el capítulo', nota: 'No te desanimes: el capítulo 8 tiene muchos nombres y fechas. Lee otra vez la sección de los ciclos y vuelve a intentarlo.' }
  ]
};
