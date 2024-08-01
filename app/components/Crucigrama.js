"use client";

import { useRef, useState } from "react";
import Crossword from "@jaredreisinger/react-crossword";
import styles from './Crossword.module.css';

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

const CrosswordComponent = () => {
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
      <Crossword
        data={data}
        ref={crosswordRef}
        onCrosswordComplete={(complete) => handleCrosswordComplete(complete)}
      /> 
      {feedback.message && (
       <div className={`alert alert-${feedback.type} mt-3`} role="alert">
          {feedback.message}
        </div>
      )}     
    </div>
    
  );
};

export default CrosswordComponent;






