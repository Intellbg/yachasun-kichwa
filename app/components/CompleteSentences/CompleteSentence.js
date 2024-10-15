"use client";
import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './style.module.css';

const CompleteSentence = ({ sentence, missingWordIndex, options }) => {
  // Crear una copia de las palabras, pero con la palabra por completar vacía
  const initialWords = sentence.split(' ').map((word, index) => 
    index === missingWordIndex ? '' : word
  );

  const [completedSentence, setCompletedSentence] = useState(initialWords);

  // Función para manejar cuando se suelta la palabra
  const handleDrop = (item) => {
    const newSentence = [...completedSentence];
    newSentence[missingWordIndex] = item.word;  // Coloca la palabra soltada en el lugar correcto
    setCompletedSentence(newSentence);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h3>Arrastra la palabra correcta para completar la oración:</h3>
        <div className={styles.sentence}>
          {completedSentence.map((word, index) => (
            <Word 
              key={index} 
              word={word} 
              isMissing={index === missingWordIndex && word === ''} 
              onDrop={handleDrop} 
            />
          ))}
        </div>
        <div className={styles.options}>
          <h4>Opciones:</h4>
          {options.map((option, index) => (
            <DraggableWord key={index} word={option} />
          ))}
        </div>
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
            backgroundColor: isOver ? '#f0f0f0' : 'transparent',
          }}
        >
          {word === '' ? '____' : word}
        </div>
      ) : (
        word
      )}
    </span>
  );
};

export default CompleteSentence;




















