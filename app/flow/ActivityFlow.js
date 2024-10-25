"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./ActivityFlow.css";

const DragDrop = dynamic(() => import("../components/drag_drop/DragDrop"), {
  loading: () => <p>Cargando la actividad...</p>,
  ssr: false,
});
const Wordle = dynamic(() => import("../components/games/wordle/Worlde"), {
  loading: () => <p>Cargando la actividad...</p>,
  ssr: false,
});
const Crossword = dynamic(() => import("../components/crossword/Crossword"), {
  loading: () => <p>Cargando la actividad...</p>,
  ssr: false,
});
const SoupLetter = dynamic(() => import("../components/soupletter/SoupLetter"), {
  loading: () => <p>Cargando la actividad...</p>,
  ssr: false,
});
const CompleteSentence = dynamic(() => import("../components/CompleteSentences/CompleteSentence"), {
  loading: () => <p>Cargando la actividad...</p>,
  ssr: false,
});

export default function ActivityFlow({ selectedActivities }) {
  const activityComponents = {
    "drag-drop": DragDrop,
    "wordle": Wordle,
    "crossword": Crossword,
    "soup-letter": SoupLetter,
    "complete-sentence": CompleteSentence,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const finalRedirectUrl = "/pagina-final"; // URL de redirección al finalizar

  const handleNextActivity = useCallback(() => {
    if (currentIndex < selectedActivities.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsCompleted(false);
    }
  }, [currentIndex, selectedActivities.length]);

  const handleWordleCompletion = useCallback((isCorrect) => {
    if (isCorrect) {
      setIsCompleted(true);
    }
  }, []);

  const { id, props: currentProps } = selectedActivities[currentIndex];
  const CurrentActivityComponent = activityComponents[id];

  return (
    <div className="container-fluid text-center d-flex flex-column justify-content-between">
      <div className="d-flex align-items-center justify-content-between" style={{ height: "5vh" }}>
        <Link href="/intermediate/lecture">
          <button className="btn btn-link text-dark text-decoration-none" aria-label="Volver al menú">
            X
          </button>
        </Link>
        <div className="progress flex-grow-1 mx-3">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${((currentIndex + 1) / selectedActivities.length) * 100}%` }}
            aria-valuenow={currentIndex + 1}
            aria-valuemin="0"
            aria-valuemax={selectedActivities.length}
          ></div>
        </div>
      </div>

      <div className="flex-grow-1">
        {CurrentActivityComponent && id === "wordle" ? (
          <Wordle
            level="intermediate"
            onSendData={handleWordleCompletion}
            {...currentProps}
          />
        ) : (
          CurrentActivityComponent && (
            <CurrentActivityComponent
              {...currentProps}
              onResolve={() => setIsCompleted(true)}
            />
          )
        )}
      </div>

      <div className="d-flex justify-content-center align-items-center">
        {currentIndex === selectedActivities.length - 1 ? (
          <Link href={finalRedirectUrl} passHref>
            <button className="btn btn-success animate-btn" disabled={!isCompleted}>
              Finalizar
            </button>
          </Link>
        ) : (
          <button
            onClick={handleNextActivity}
            className="btn btn-success animate-btn"
            disabled={!isCompleted}
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  );
}
