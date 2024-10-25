// data.js
export const wordsArray = [
    { word: 'ACROPOLIS', row: 0, col: 0, direction: 'across' },
    { word: 'AIN', row: 0, col: 0, direction: 'down' },
    { word: 'CITO', row: 1, col: 1, direction: 'down' },
    { word: 'AS', row: 8, col: 0, direction: 'across' }
  ];
  
  export const clues = {
    across: [
      { number: 1, text: 'Sitio más alto y fortificado de las ciudades griegas.' },
      { number: 3, text: 'Uno de la baraja.' }
    ],
    down: [
      { number: 1, text: 'Río de Suiza que pasa por Berna.' },
      { number: 2, text: 'Copia genética.' }
    ]
  };
  
  export const selectedActivities = [
    { id: 'drag-drop', props: { phrase: "ñukanchik tushunkapak rinchik" } },
    { id: 'drag-drop', props: { phrase: "ñukanchi tushunkapa rinchi" } },
    { id: 'drag-drop', props: { phrase: "ñuknchik tuhunkapak rinhik" } },
    { id: 'wordle', props: { word: "ALLKU" } },
    { id: 'crossword', props: { words: wordsArray, size: 10, clues: clues } },
    { id: 'soup-letter', props: { words: ["ALLKU", "OTHER", "WORDS"] } },
    { id: 'complete-sentence', props: { sentence: "El sol brilla", missingWordIndex: 2, options: ["brilla", "sol", "El"] } }
  ];
  