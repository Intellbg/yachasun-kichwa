"use client";

import { useRef, useState } from "react";
import CrosswordComponent from "@jaredreisinger/react-crossword"; // Cambié el nombre aquí
import styles from './style.css';

const data = {
  across: {
    1: { clue: "Sitio más alto y fortificado de las ciudades griegas.", answer: "ACROPOLIS", row: 0, col: 0 },
    8: { clue: "Uno de la baraja.", answer: "AS", row: 2, col: 0 },
  },
  down: {
    1: { clue: "Río de Suiza que pasa por Berna.", answer: "AAR", row: 0, col: 0 },
    2: { clue: "Copia genética.", answer: "CLON", row: 0, col: 2 },
  },
};

const Crossword = () => {
  const crosswordRef = useRef(null);
  const [feedback, setFeedback] = useState({ message: "", type: "" });

  const handleCrosswordComplete = (complete) => {
    if (complete) {
      setFeedback({ message: "¡Felicidades! Has completado el crucigrama correctamente.", type: "success" });
    } else {
      setFeedback({ message: "Algunas palabras no están correctas.", type: "danger" });
    }
  };

  return (
    <div className={styles.crosswordContainer}>
      <CrosswordComponent // Aquí usamos el nuevo nombre
        data={data}
        ref={crosswordRef}
        onCrosswordComplete={handleCrosswordComplete}
      />
      {feedback.message && (
        <div className={`alert alert-${feedback.type} mt-3`} role="alert">
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default Crossword;







