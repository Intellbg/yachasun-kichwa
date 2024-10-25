"use client";
import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './style.module.css';

const CompleteSentence = ({ sentence, missingWordIndex, options, onResolve }) => {
  // Inicializar la oración con el espacio vacío
  const initialWords = sentence.split(' ').map((word, index) => 
    index === missingWordIndex ? '' : word
  );

  const [completedSentence, setCompletedSentence] = useState(initialWords);
  const [isCorrect, setIsCorrect] = useState(null); // Estado para el mensaje de corrección
  const [interacted, setInteracted] = useState(false); // Estado para verificar si el usuario interactuó

  // Función para manejar cuando se suelta la palabra
  const handleDrop = (item) => {
    const newSentence = [...completedSentence];
    newSentence[missingWordIndex] = item.word; // Actualizamos el espacio vacío
    setCompletedSentence(newSentence); // Actualizamos la oración
    setInteracted(true); // Marcamos que el usuario interactuó
    checkSentence(newSentence); // Verificamos la oración
  };

  // Función para verificar si la oración es correcta
  const checkSentence = (newSentence) => {
    const correctWord = sentence.split(' ')[missingWordIndex]; // Palabra correcta
    const isSentenceCorrect = newSentence[missingWordIndex] === correctWord;
    setIsCorrect(isSentenceCorrect); // Estado de corrección
    onResolve(isSentenceCorrect); // Notificación del resultado
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2 className="text-uppercase mb-4">Arrastra la palabra correcta para completar la oración</h2>
        <div className="mb-4">
          <img src="/img/humu/humu-happy.png" alt="Character" style={{ maxWidth: "150px" }} />
        </div>
        <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
          {completedSentence.map((word, index) => (
            <Word 
              key={index} 
              word={word} 
              isMissing={index === missingWordIndex} 
              onDrop={handleDrop} 
            />
          ))}
        </div>
        <div className="d-flex justify-content-center mb-4">          
          {options.map((option, index) => (
            <DraggableWord key={index} word={option} />
          ))}
        </div>

        {/* Mostramos mensajes de corrección solo si el usuario ha interactuado */}
        {interacted && (
          <div className={`alert ${isCorrect ? 'alert-success' : 'alert-danger'}`} role="alert">
            {isCorrect ? '¡Felicidades! La oración es correcta.' : 'La oración es incorrecta, intenta de nuevo.'}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

// Componente para las palabras arrastrables
const DraggableWord = ({ word }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'word',
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

// Componente para las palabras dentro de la oración
const Word = ({ word, isMissing, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'word',
    drop: (item) => onDrop(item), // Permite el reemplazo continuo del espacio vacío
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
            backgroundColor: isOver ? '#f0f0f0' : 'transparent',
          }}
        >
          {word === '' ? '____' : word} {/* Permite mostrar la palabra o mantener el espacio vacío */}
        </div>
      ) : (
        word
      )}
    </span>
  );
};

export default CompleteSentence;



