"use client";
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './ActivityFlow.css';

const DragDrop = dynamic(() => import('../components/drag_drop/DragDrop'), {
  loading: () => <p>LCargando la actividad...</p>,
  ssr: false
});
const Wordle = dynamic(() => import('../components/games/wordle/Worlde'), {
  loading: () => <p>Cargando la actividad...</p>,
  ssr: false
});
const Crossword = dynamic(() => import('../components/crossword/Crossword'), {
  loading: () => <p>Cargando la actividad...</p>,
  ssr: false
});
const SoupLetter = dynamic(() => import('../components/soupletter/SoupLetter'), {
  loading: () => <p>Cargando la actividad...</p>,
  ssr: false
});

const wordsArray = [
  { word: 'ACROPOLIS', row: 0, col: 0, direction: 'across' },
  { word: 'RIN', row: 0, col: 0, direction: 'down' },
  { word: 'CITO', row: 1, col: 1, direction: 'down' },
  { word: 'AS', row: 8, col: 0, direction: 'across' }

];

const clues = {
  across: [
    { number: 1, text: 'Sitio más alto y fortificado de las ciudades griegas.' },
    { number: 3, text: 'Uno de la baraja.' }
  ],
  down: [
    { number: 1, text: 'Río de Suiza que pasa por Berna.' },
    { number: 2, text: 'Copia genética.' }
  ]
};


export default function ActivityFlow() {
  const activities = [
    {
      id: 'drag-drop',
      component: DragDrop,
      props: { phrase: "ñukanchik tushunkapak rinchik" }
    },
    {
      id: 'wordle',
      component: Wordle,
      props: { word: "ALLKU" }
    },
    {
      id: 'crossword',
      component: Crossword,
      props: { words: wordsArray, size: 10, clues: clues}
    },
    {
      id: 'soup-letter',
      component: SoupLetter,
      props: { words: ["ALLKU", "OTHER", "WORDS"] }
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [points, setPoints] = useState(5);

  const handleNextActivity = () => {
    if (currentIndex < activities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const CurrentActivityComponent = activities[currentIndex].component;
  const currentProps = activities[currentIndex].props;

  return (
    <div className="container-fluid text-center d-flex flex-column justify-content-between">  
  <div className="d-flex align-items-center justify-content-between" style={{ height: "5vh" }}>
    <Link href="/intermediate/lecture">
      <button className="btn btn-link text-dark text-decoration-none" aria-label="Volver al menú">
        X
      </button>
    </Link>
    <div className="progress flex-grow-1 mx-3" >
      <div
        className="progress-bar bg-warning"
        role="progressbar"
        style={{ width: `${((currentIndex + 1) / activities.length) * 100}%` }}
        aria-valuenow={currentIndex + 1}
        aria-valuemin="0"
        aria-valuemax={activities.length}
      ></div>
    </div>
    <div className="points text-warning">
      {points} puntos
    </div>
  </div>
  <div className="flex-grow-1">
    <CurrentActivityComponent {...currentProps} />
  </div>
  <div className="d-flex justify-content-center align-items-center">
    <button
      onClick={handleNextActivity}
      className="btn btn-success animate-btn"
    >
      Continuar
    </button>
  </div>
</div>

  );
}

