/* ==========================================================================
   preguntas.js — Contenido del examen
   Capítulo 8: Los Jueces
   --------------------------------------------------------------------------
   Para editar el examen solo hace falta tocar este archivo.
   Tipos disponibles:
     mc         una sola alternativa correcta
     multi      varias alternativas correctas
     vf         verdadero o falso
     completar  huecos para escribir dentro de una frase
     corta      respuesta escrita libre
     orden      colocar los pasos en secuencia
     emparejar  unir dos columnas
     intrusos   tachar las opciones que sobran
     mapa       arrastrar nombres sobre el mapa
   ========================================================================== */

window.EX = window.EX || {};

EX.SECCIONES = [
  {
    id: 'I',
    titulo: 'Selección múltiple',
    resumen: 'Cinco preguntas sobre el relato y los personajes.',
    pasos: [
      'Toca la alternativa que consideres correcta.',
      'Si la pregunta admite varias respuestas, se marcan y luego confirmas con «Responder».',
      'Verás de inmediato cuál era la correcta antes de pasar a la siguiente.'
    ]
  },
  {
    id: 'II',
    titulo: 'Ubicar en el mapa',
    resumen: 'Coloca cada región del Cercano Oriente en su lugar.',
    pasos: [
      'Toca un nombre de la lista y después el círculo del mapa donde va.',
      'También puedes arrastrarlo directamente hasta el círculo.',
      'Para corregir, toca el nombre ya colocado y vuelve a la lista.'
    ]
  },
  {
    id: 'III',
    titulo: 'Verdadero o falso',
    resumen: 'Cuatro afirmaciones sobre la era de los jueces.',
    pasos: [
      'Lee la afirmación completa: un solo detalle puede cambiarlo todo.',
      'Elige «Verdadero» o «Falso»; se responde con un solo toque.',
      'Cuando la respuesta sea falsa, se explica por qué.'
    ]
  },
  {
    id: 'IV',
    titulo: 'Completar el texto',
    resumen: 'Escribe la palabra que falta en cada frase.',
    pasos: [
      'Escribe dentro de la línea dorada; no importan mayúsculas ni tildes.',
      'Algunas frases tienen dos huecos: se puntúa cada uno por separado.',
      'Pulsa Enter o «Responder» para confirmar.'
    ]
  },
  {
    id: 'V',
    titulo: 'Respuesta corta',
    resumen: 'Dos preguntas que se contestan con una palabra o un número.',
    pasos: [
      'Basta un nombre o una cifra: no hace falta escribir una frase.',
      'Los números valen en dígitos o en letras (400 o cuatrocientos).',
      'Pulsa Enter o «Responder» para confirmar.'
    ]
  },
  {
    id: 'VI',
    titulo: 'Emparejamiento y secuencia',
    resumen: 'El ciclo de Jueces y los personajes que lo protagonizan.',
    pasos: [
      'En la secuencia, toca los pasos en el orden correcto: se van numerando.',
      'Para emparejar, toca un personaje y después su descripción.',
      'Si te equivocas, vuelve a tocar la casilla para soltarla.'
    ]
  },
  {
    id: 'VII',
    titulo: 'Elimina los intrusos',
    resumen: 'Tacha lo que no pertenece a la lista.',
    pasos: [
      'Toca las opciones que NO corresponden: quedarán tachadas.',
      'Deja intactas las que sí forman parte de la respuesta.',
      'Cada intruso bien tachado suma; cada acierto tachado por error resta.'
    ]
  }
];

EX.PREGUNTAS = [

  /* ---------------- I. Selección múltiple ---------------- */
  {
    n: 1, seccion: 'I', tipo: 'mc', puntos: 1,
    enunciado: '¿Quién fue «María Basura» según el relato inicial?',
    opciones: [
      { id: 'a', texto: 'Una mujer pobre que heredó una fortuna al final de su vida.' },
      { id: 'b', texto: 'Una millonaria que prefería vivir como una mendiga, buscando en la basura.' },
      { id: 'c', texto: 'Una jueza de Israel conocida por su humildad.' },
      { id: 'd', texto: 'La hija de un abogado que perdió todo su dinero en Kansas.' }
    ],
    correcta: 'b',
    nota: 'Tenía con qué vivir bien y eligió vivir como pobre: la misma contradicción de Israel en los jueces.'
  },
  {
    n: 2, seccion: 'I', tipo: 'mc', puntos: 1,
    enunciado: '¿Cómo define el texto a los «Jueces» de Israel?',
    opciones: [
      { id: 'a', texto: 'Hombres con togas negras que tomaban decisiones legales.' },
      { id: 'b', texto: 'Líderes espirituales que solo se dedicaban a la oración.' },
      { id: 'c', texto: 'Líderes políticos y militares que ejercieron un poder casi absoluto.' },
      { id: 'd', texto: 'Patriarcas que lucharon en Israel antes de Saúl.' }
    ],
    correcta: 'c',
    nota: 'No eran magistrados de tribunal: gobernaban y encabezaban los ejércitos.'
  },
  {
    n: 3, seccion: 'I', tipo: 'multi', puntos: 3,
    enunciado: '¿Qué tres cosas debía hacer Israel para evitar ser corrompida por los cananeos?',
    opciones: [
      { id: 'a', texto: 'Destruir a todos los habitantes.' },
      { id: 'b', texto: 'Tratar de vivir en paz con ellos.' },
      { id: 'c', texto: 'Destruir a los niños que no hacen caso.' },
      { id: 'd', texto: 'Evitar casarse con ellos.' },
      { id: 'e', texto: 'Destruir solo a los filisteos.' },
      { id: 'f', texto: 'Casarse con mujeres extranjeras y formar alianzas.' },
      { id: 'g', texto: 'Huir de la adoración a sus dioses.' }
    ],
    correctas: ['a', 'd', 'g'],
    nota: 'Las tres instrucciones apuntaban a lo mismo: no mezclarse con la idolatría cananea.'
  },
  {
    n: 5, seccion: 'I', tipo: 'mc', puntos: 1,
    enunciado: '¿Qué personaje es descrito como el último juez y el primer profeta?',
    opciones: [
      { id: 'a', texto: 'Josué.' },
      { id: 'b', texto: 'Samuel.' },
      { id: 'c', texto: 'Gedeón.' },
      { id: 'd', texto: 'Moisés.' }
    ],
    correcta: 'b',
    nota: 'Samuel cierra la era de los jueces y abre la de los profetas y los reyes.'
  },
  {
    n: 6, seccion: 'I', tipo: 'mc', puntos: 1,
    enunciado: 'Según el texto, ¿cuál fue el resultado de que el pueblo hiciera «lo que bien le parecía»?',
    opciones: [
      { id: 'a', texto: 'Prosperidad económica y paz de los vecinos.' },
      { id: 'b', texto: 'Bancarrota moral, social y espiritual por casi cuatrocientos años.' },
      { id: 'c', texto: 'Una expansión territorial sin precedentes.' },
      { id: 'd', texto: 'El fortalecimiento de las leyes de Moisés.' }
    ],
    correcta: 'b',
    nota: 'Cuatro siglos de decadencia: esa es la factura de vivir sin referencia.'
  },

  /* ---------------- II. Ubicar en el mapa ---------------- */
  {
    n: 7, seccion: 'II', tipo: 'mapa', puntos: 6,
    enunciado: 'Coloca cada región en su lugar del Cercano Oriente Antiguo.',
    etiquetas: ['Filistea', 'Moab', 'Mesopotamia', 'Canaán', 'Amón', 'Madián'],
    nota: 'Canaán al oeste del Jordán; Amón y Moab al este; Filistea en la costa; Madián al otro lado del golfo de Aqaba.'
  },

  /* ---------------- III. Verdadero o falso ---------------- */
  {
    n: 8, seccion: 'III', tipo: 'vf', puntos: 1,
    enunciado: 'Moisés instruyó a Israel a casarse con los cananeos para mantener la paz.',
    correcta: false,
    nota: 'Al contrario: una de las instrucciones fue evitar casarse con los cananeos, justamente para no caer en su corrupción moral.'
  },
  {
    n: 9, seccion: 'III', tipo: 'vf', puntos: 1,
    enunciado: 'La historia de Rut ocurre durante la era de los jueces.',
    correcta: true,
    nota: 'Es el contrapunto luminoso de una época oscura.'
  },
  {
    n: 10, seccion: 'III', tipo: 'vf', puntos: 1,
    enunciado: 'Se registran exactamente siete ciclos de desventuras en el libro de los Jueces.',
    correcta: true,
    nota: 'Siete vueltas a la misma rueda: pecado, disciplina, clamor, liberación y reposo.'
  },
  {
    n: 11, seccion: 'III', tipo: 'vf', puntos: 1,
    enunciado: 'Sansón es considerado el juez más famoso debido a su fuerza fabulosa.',
    correcta: true,
    nota: 'El más famoso, aunque no el más ejemplar.'
  },

  /* ---------------- IV. Completar el texto ---------------- */
  {
    n: 12, seccion: 'IV', tipo: 'completar', puntos: 1,
    partes: ['El ciclo de los jueces comienza con el ', ' de Israel.'],
    huecos: [{ acepta: ['pecado'], ancho: 10 }],
    nota: 'Todo ciclo arranca en el mismo punto.'
  },
  {
    n: 13, seccion: 'IV', tipo: 'completar', puntos: 1,
    partes: ['Dios disciplinaba a su pueblo mediante la ', ' militar por parte de una nación vecina.'],
    huecos: [{ acepta: ['conquista'], ancho: 12 }],
    nota: 'La disciplina llegaba con ejército propio.'
  },
  {
    n: 14, seccion: 'IV', tipo: 'completar', puntos: 2,
    partes: ['Rut, aunque no era hebrea, fue incluida en el linaje de ', ' a ', '.'],
    huecos: [
      { acepta: ['Abraham'], ancho: 11 },
      { acepta: ['Jesús', 'Jesus', 'Jesucristo'], ancho: 10 }
    ],
    nota: 'Una moabita dentro de la genealogía que va del patriarca al Mesías.'
  },
  {
    n: 15, seccion: 'IV', tipo: 'completar', puntos: 2,
    partes: ['Josué dirigió la ', ' de la ', ' Prometida.'],
    huecos: [
      { acepta: ['conquista'], ancho: 12 },
      { acepta: ['Tierra'], ancho: 10 }
    ],
    nota: 'Josué conquista; los jueces intentan conservar.'
  },
  {
    n: 17, seccion: 'IV', tipo: 'completar', puntos: 1,
    partes: ['La repetición de las desventuras de Israel empezaba de nuevo cuando el juez ', '.'],
    huecos: [{ acepta: ['muere', 'moría', 'moria', 'murió', 'murio', 'fallece'], ancho: 10 }],
    nota: 'La fidelidad duraba lo que duraba el líder.'
  },

  /* ---------------- V. Respuesta corta ---------------- */
  {
    n: 20, seccion: 'V', tipo: 'corta', puntos: 1,
    enunciado: 'Escribe qué juez derrotó a un ejército con solo trescientos hombres.',
    acepta: ['Gedeón', 'Gedeon'],
    marcador: 'Nombre del juez',
    nota: 'Antorchas dentro de cántaros y trompetas: la victoria no dependió del número.'
  },
  {
    n: 22, seccion: 'V', tipo: 'corta', puntos: 1,
    enunciado: '¿Cuántos años duró aproximadamente el periodo de rebelión y jueces?',
    acepta: ['400', 'cuatrocientos', '400 años', 'cuatrocientos años'],
    marcador: 'Años (cifra o palabra)',
    nota: 'Casi cuatro siglos entre la conquista y la monarquía.'
  },

  /* ---------------- VI. Emparejamiento y secuencia ---------------- */
  {
    n: 23, seccion: 'VI', tipo: 'orden', puntos: 5,
    enunciado: 'Ordena cronológicamente los cinco componentes de un «ciclo» en Jueces.',
    items: [
      { id: 'j', texto: 'Dios levanta un juez que los libera.', posicion: 4 },
      { id: 'p', texto: 'Pecado de Israel.', posicion: 1 },
      { id: 'r', texto: 'Dios libera la tierra mientras el juez vive.', posicion: 5 },
      { id: 'c', texto: 'Conquista militar (disciplina de Dios).', posicion: 2 },
      { id: 'a', texto: 'Israel se arrepiente y clama a Dios.', posicion: 3 }
    ],
    nota: 'Pecado → conquista → arrepentimiento → juez libertador → reposo. Y vuelta a empezar.'
  },
  {
    n: 24, seccion: 'VI', tipo: 'emparejar', puntos: 4,
    enunciado: 'Relaciona a cada personaje con su descripción.',
    izquierda: [
      { id: '1', texto: 'Débora' },
      { id: '2', texto: 'Samuel' },
      { id: '3', texto: 'Gedeón' },
      { id: '4', texto: 'Sansón' }
    ],
    derecha: [
      { id: 'a', texto: 'Personaje de transición.' },
      { id: 'b', texto: 'Juez asignado al principio de la era.' },
      { id: 'c', texto: 'El juez más famoso.' },
      { id: 'd', texto: 'Derrotó a miles con 300 hombres.' }
    ],
    pares: { '1': 'b', '2': 'a', '3': 'd', '4': 'c' },
    nota: 'Débora abre la era, Samuel la cierra; Gedeón vence con pocos y Sansón se lleva la fama.'
  },

  /* ---------------- VII. Elimina los intrusos ---------------- */
  {
    n: 25, seccion: 'VII', tipo: 'intrusos', puntos: 3,
    enunciado: 'Tacha lo que NO es uno de los cuatro temas principales de la era de los jueces.',
    opciones: [
      { id: 'a', texto: 'Esclavitud' },
      { id: 'b', texto: 'Jueces' },
      { id: 'c', texto: 'Moabitas' },
      { id: 'd', texto: 'Rut' },
      { id: 'e', texto: 'Ciclos' },
      { id: 'f', texto: 'Monedas' },
      { id: 'g', texto: 'Rebelión' }
    ],
    intrusos: ['a', 'c', 'f'],
    nota: 'Los cuatro temas son: jueces, rebelión, ciclos y Rut.'
  },
  {
    n: 26, seccion: 'VII', tipo: 'intrusos', puntos: 3,
    enunciado: 'Tacha lo que NO es una de las cualidades morales que destaca la historia de Rut.',
    opciones: [
      { id: 'a', texto: 'Fe' },
      { id: 'b', texto: 'Pureza' },
      { id: 'c', texto: 'Teología' },
      { id: 'd', texto: 'Firmeza' },
      { id: 'e', texto: 'Amor' },
      { id: 'f', texto: 'Consagración' }
    ],
    intrusos: ['a', 'c', 'd'],
    nota: 'Las cualidades destacadas son amor, pureza y consagración.'
  }
];
