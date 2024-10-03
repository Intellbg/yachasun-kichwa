"use client";
import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from './ActivityFlow.css';

const DragDrop = dynamic(() => import('../components/drag_drop/DragDrop'), {
  loading: () => <p>LCargando la actividad...</p>,
  ssr: false
});
const Wordle = dynamic(() => import('../components/wordle/Wordle'), {
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
      props: {}
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
    <div className="container-fluid text-center d-flex flex-column justify-content-between" style={{ height: "100vh" }}>
  {/* Barra superior con X y puntos */}
  <div className="d-flex align-items-center justify-content-between" style={{ height: "20vh" }}>
    <Link href="/lectures_intermedio">
      <button className="btn btn-link text-dark text-decoration-none" aria-label="Volver al menú">
        X
      </button>
    </Link>

    {/* Barra de progreso */}
    <div className="progress flex-grow-1 mx-3" style={{ height: "10px" }}>
      <div
        className="progress-bar bg-warning"
        role="progressbar"
        style={{ width: `${((currentIndex + 1) / activities.length) * 100}%` }}
        aria-valuenow={currentIndex + 1}
        aria-valuemin="0"
        aria-valuemax={activities.length}
      ></div>
    </div>

    {/* Puntos */}
    <div className="points text-warning">
      {points} puntos
    </div>
  </div>

  {/* Actividad principal (ocupa el 60% del espacio) */}
  <div className="flex-grow-1" style={{ height: "60vh" }}>
    <CurrentActivityComponent {...currentProps} />
  </div>

  {/* Botón de continuar (ocupa el 20% del espacio) */}
  <div className="d-flex justify-content-center align-items-center" style={{ height: "20vh" }}>
    <button
      onClick={handleNextActivity}
      className="btn btn-primary animate-btn"
    >
      Continuar
    </button>
  </div>
</div>

  );
}

