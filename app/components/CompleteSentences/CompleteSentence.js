"use client";
import { useState, useEffect, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Helper from "@/app/components/helper/Helper.js";
import { getSentence } from "@/app/lib/getSentence.js";
import CompleteSentenceInstructions from "@/app/components/instructions/completesentence/CompleteSentenceInstructions.js";
import styles from "./style.module.css";
import animation from '@/app/animation.module.css';

const CompleteSentence = ({ Lectures, onSendData }) => {
  const [sentenceData, setSentenceData] = useState(null);
  const [sentence, setSentence] = useState([]);
  const [missingWordIndex, setMissingWordIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [interacted, setInteracted] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchedRef = useRef(false); // Para evitar llamadas repetidas

  useEffect(() => {
    if (fetchedRef.current) return; // Evita ejecutar nuevamente
    fetchedRef.current = true;

    const fetchData = async () => {
      try {
        const data = await getSentence(Lectures);

        if (Array.isArray(data) && data.length > 0) {
          const sentenceObj = data[0]; // Extraer el primer elemento del array

          if (
            sentenceObj &&
            typeof sentenceObj.kichwa === "string" &&
            Array.isArray(sentenceObj.options) &&
            sentenceObj.options.length > 0
          ) {
            console.log("Datos válidos recibidos:", sentenceObj);

            const words = sentenceObj.kichwa.split(" ");
            const randomIndex = Math.floor(Math.random() * words.length);

            setSentenceData({
              kichwa: sentenceObj.kichwa,
              options: sentenceObj.options,
              spanish: sentenceObj.spanish || "",
            });

            setSentence(words.map((word, index) => (index === randomIndex ? "" : word)));
            setMissingWordIndex(randomIndex);
          } else {
            console.error("El objeto de la oración no tiene las propiedades necesarias:", sentenceObj);
          }
        } else {
          console.error("El array recibido desde getSentence está vacío o es inválido:", data);
        }
      } catch (error) {
        console.error("Error fetching sentence:", error);
      } finally {
        setLoading(false); // Asegurar que el estado de carga siempre se actualice
      }
    };

    fetchData();
  }, [Lectures]);

  // Manejar el evento de soltar la palabra
  const handleDrop = (item) => {
    if (missingWordIndex === null) return;

    const newSentence = [...sentence];
    newSentence[missingWordIndex] = item.word; // Colocar la palabra en el espacio vacío
    setSentence(newSentence); // Actualizar la oración
    setInteracted(true); // Indicar que hubo interacción

    checkAnswer(newSentence);
  };

  // Verificar si la respuesta es correcta
  const checkAnswer = (newSentence) => {
    if (!sentenceData || missingWordIndex === null) return;

    const correctWord = sentenceData.kichwa.split(" ")[missingWordIndex];
    const isAnswerCorrect = newSentence[missingWordIndex] === correctWord;

    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      onSendData(true);
    }
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (!sentenceData || sentence.length === 0 || !sentenceData.options) {
    return <div>Error al cargar los datos. Inténtalo nuevamente.</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <div className="container text-center bg-white text-dark p-4" style={{ maxWidth: '700px' }}>
      <div class="d-flex align-items-center justify-content-center my-4">
          <h1 class="me-3">Completa y gana</h1>
          <div>
            <Helper imageSrc="/img/humu/humu-happy.png" className={`${animation.spinnerImage}`}>
              <CompleteSentenceInstructions />
            </Helper>               
            </div>                    
        </div>        
        <h2 className="text my-4">Arrastra la palabra correcta para completar la oración</h2>
        <h5 className="text my-4">Significado en español: {sentenceData.spanish}</h5>        
        <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
          {sentence.map((word, index) => (
            <Word
              key={index}
              word={word}
              isMissing={index === missingWordIndex}
              onDrop={handleDrop}
            />
          ))}
        </div>
        <div className="d-flex justify-content-center mb-4">
          {sentenceData.options.map((option, index) => (
            <DraggableWord key={index} word={option} />
          ))}
        </div>
        {interacted && (
          <div className={`alert ${isCorrect ? "alert-success" : "alert-danger"}`} role="alert">
            {isCorrect
              ? "¡Felicidades! La oración es correcta."
              : "La oración es incorrecta. Intenta de nuevo."}
          </div>
        )}
      </div> 
      </div>     
    </DndProvider>
  );
};

// Componente para palabras arrastrables
const DraggableWord = ({ word }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "word",
    item: { word },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={styles.option}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {word}
    </div>
  );
};

// Componente para las palabras en la oración
const Word = ({ word, isMissing, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "word",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <span className={styles.word}>
      {isMissing ? (
        <div
          ref={drop}
          className={styles.dropArea}
          style={{
            backgroundColor: isOver ? "#f0f0f0" : "transparent",
          }}
        >
          {word || "____"}
        </div>
      ) : (
        word
      )}
    </span>
  );
};

export default CompleteSentence;
