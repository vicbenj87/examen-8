# Examen — Capítulo 8: Los Jueces

Web de examen con tema nocturno, sonido generado en el navegador y registro
automático en Google Sheets. Funciona **abriendo `index.html` con doble clic**,
sin servidor ni conexión (salvo para enviar los resultados a la hoja).

---

## 1. Ponerlo en marcha en 5 minutos

### a) Descomprime la carpeta y ábrela
Doble clic en `index.html`. Ya puedes rendir el examen: mientras no configures
la hoja, los resultados se guardan en el propio dispositivo y se pueden
descargar en CSV desde la pantalla final.

### b) Conecta la hoja de cálculo RC8

1. Abre tu hoja:
   `https://docs.google.com/spreadsheets/d/1xtsQyxeNEno3EJ8s-7o0RqXdHr3HORiRuI5vUCOv-gE/edit`
2. Menú **Extensiones ▸ Apps Script**.
3. Borra lo que haya y pega todo el contenido de `apps-script/Codigo.gs`. Guarda.
4. **Implementar ▸ Nueva implementación ▸ Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
5. Autoriza. Aparecerá un aviso de «app no verificada»: entra en
   *Configuración avanzada ▸ Ir a … (no seguro)*. Es tu propio script y solo
   toca esta hoja.
6. Copia la URL que termina en `/exec`.
7. Ábrelo en `js/config.js` y pégala:

```js
urlAppsScript: 'https://script.google.com/macros/s/AKfy...aquí.../exec',
```

Listo. La hoja **RC8** se crea sola si no existe, con los encabezados
`nombre · apellido · puntaje · total · porcentaje` (más dos columnas de apoyo,
`id` y `fecha`, que puedes ocultar).

> Cada vez que cambies el código en Apps Script hay que crear una **nueva versión**
> de la implementación para que surta efecto.

### c) Publicarlo para tus alumnos (opcional)
Cualquier hosting estático sirve: sube la carpeta a GitHub Pages, Netlify o
Google Sites. No hay backend que instalar.

---

## 2. Cómo se registra al alumno

| Momento | Qué pasa en la hoja |
|---|---|
| Al pulsar «Comenzar el examen» | Se **crea la fila** con nombre y apellido |
| Al terminar | Se **completa esa misma fila** con puntaje, total y porcentaje |

La comunicación es por JSONP, que es lo único que atraviesa las restricciones
de CORS cuando el archivo se abre desde el disco (`file://`). Además, **siempre**
se guarda una copia local: si internet falla, nadie pierde su resultado y el
botón «Descargar mis resultados» genera un CSV listo para pegar en la hoja.

---

## 3. Cómo funciona el examen

- **21 preguntas · 41 puntos · 40 segundos cada una.**
- El orden de **secciones, preguntas y alternativas cambia en cada intento**.
- Antes de cada sección aparece una **explicación de 15 segundos** con un anillo
  de cuenta atrás; se cierra sola o pulsando «Empezar la sección».
- La barra de tiempo es una **mecha encendida**: se consume de derecha a
  izquierda, la brasa parpadea y todo se vuelve rojo en los últimos 10 segundos.
- Al responder se **muestra la respuesta correcta** y se pasa automáticamente a
  la siguiente (3,4 s, o 5,2 s en las preguntas largas). Se puede adelantar con
  «Continuar ahora».
- Si se acaba el tiempo, se corrige con lo que hubiera puesto y se avanza igual.

### Puntuación

| Tipo | Puntos | Cómo se corrige |
|---|---|---|
| Selección múltiple | 1 | Todo o nada |
| Varias respuestas (nº 3) | 3 | Aciertos menos errores |
| Mapa (nº 7) | 6 | 1 por región bien ubicada |
| Verdadero/Falso | 1 | Todo o nada |
| Completar | 1 o 2 | 1 por hueco; sin distinguir tildes ni mayúsculas |
| Respuesta corta | 1 | Acepta variantes (*400*, *cuatrocientos*…) |
| Secuencia (nº 23) | 5 | 1 por paso en su sitio |
| Emparejar (nº 24) | 4 | 1 por pareja |
| Intrusos (nº 25 y 26) | 3 | Aciertos menos errores |

El criterio «aciertos menos errores» evita que marcarlo todo dé puntos.

### El mapa
Es tu mapa mudo original: recortado al marco y recoloreado para la noche
(tierra en azul profundo, mares y ríos en azul acero). Las seis casillas están
verificadas píxel a píxel:

- **Canaán** entre el Mediterráneo y el Jordán
- **Filistea** en la llanura costera del suroeste
- **Amón** al este del Jordán
- **Moab** al este del mar Muerto
- **Madián** pasado el golfo de Aqaba
- **Mesopotamia** en el punto más ancho entre el Tigris y el Éufrates

Se resuelve tocando el nombre y luego la casilla, o arrastrando. En pantallas
estrechas el mapa se desliza de lado para que las casillas sigan siendo grandes.

---

## 4. Los archivos

```
index.html                      Estructura y carga de módulos
css/base.css                    Colores, tipografía, cielo nocturno
css/layout.css                  Pantallas, cabecera, pie
css/componentes.css             Tarjetas, opciones, mecha, modal, mapa
js/config.js                    ⚙️ Lo único que necesitas tocar
js/utils.js                     Ayudas: azar, texto, CSV, avisos
js/audio.js                     Sonido generado (Web Audio, sin archivos)
js/preguntas.js                 ✏️ El contenido del examen
js/mapa-imagen.js               El mapa en base64 (autogenerado)
js/mapa.js                      Casillas y arrastre
js/render.js                    Dibuja y corrige cada tipo de pregunta
js/sheets.js                    Registro en Google Sheets
js/quiz.js                      Motor: cola, mecha, corrección
js/app.js                       Pantallas de inicio y resultado
assets/mapa-cercano-oriente.png El mapa como archivo suelto
apps-script/Codigo.gs           Lo que va en la hoja de cálculo
```

---

## 5. Editar el examen

Todo el contenido está en **`js/preguntas.js`**. Para añadir una pregunta,
copia una del mismo tipo y cámbiale el texto. Los tipos disponibles son
`mc`, `multi`, `vf`, `completar`, `corta`, `orden`, `emparejar`, `intrusos` y
`mapa`. El total de puntos se recalcula solo.

Ajustes rápidos en **`js/config.js`**:

```js
segundosPorPregunta: 40,   // duración de la mecha
segundosExplicacion: 15,   // duración del pop-up de sección
mezclarSecciones: true,    // ponlo en false para un orden fijo
aprobadoDesde: 70,         // porcentaje mínimo para aprobar
sonidoInicial: true
```

Los colores viven en las variables de `css/base.css` (`--lampara`, `--olivo`,
`--noche-1`…). Cambiando esas seis líneas cambia todo el tema.

---

## 6. Detalles

- **Sonido**: no hay archivos de audio. Un pad grave que respira de fondo,
  arpegios suaves al acertar, un descenso amable al fallar y un tic muy tenue
  en los últimos 10 segundos. El botón de arriba a la derecha lo silencia.
- **Accesibilidad**: foco visible con teclado, `prefers-reduced-motion`
  respetado (se apagan las animaciones), etiquetas en los campos y contraste alto.
- **Navegadores**: Chrome, Edge, Firefox y Safari recientes, en ordenador,
  tableta y móvil.
- Se recuerda el nombre entre intentos para no volver a escribirlo.
