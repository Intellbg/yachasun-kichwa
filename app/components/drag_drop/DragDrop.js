"use client";
import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getSentence } from "@/app/lib/getSentence.js";
import Helper from "@/app/components/helper/Helper.js";
import DragDropInstructions from "@/app/components/instructions/drag_drop/DragDropInstruction.js";
import update from 'immutability-helper';
import styles from './style.module.css'; 
import animation from '@/app/animation.module.css';

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Word = ({ word, index, moveWord }) => {
  const [, ref] = useDrag({
    type: 'WORD',
    item: { index }
  });

  const [, drop] = useDrop({
    accept: 'WORD',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveWord(draggedItem.index, index);
        draggedItem.index = index;
      }
    }
  });

  return (
    <div ref={(node) => ref(drop(node))} className={styles.word}>
      {word}
    </div>
  );
};

const Target = ({ index, word, setTargetWord }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'WORD',
    drop: (draggedItem) => {
      setTargetWord(index, draggedItem.index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`${styles.target} ${!word ? styles.targetEmpty : ''} ${isOver ? styles.dropAccepted : ''}`}
    >
      {word || <span>&nbsp;&ndash;&nbsp;</span>}
    </div>
  );
};

const DragAndDrop = ({ Lectures, onSendData }) => {
  const [question, setQuestion] = useState(null);
  const [initialWords, setInitialWords] = useState([]);
  const [words, setWords] = useState([]);
  const [targetWords, setTargetWords] = useState([]);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchQuestions = async () => {
      const questions = await getSentence(Lectures);
      if (isMounted) {
        const randomQuestion = questions[0];
        setQuestion({
          kichwa: randomQuestion.kichwa,
          spanish: randomQuestion.spanish,
        });

        const wordsArray = randomQuestion.kichwa.split(' ').map((word, index) => ({
          id: index,
          word,
        }));
        setInitialWords(wordsArray);
        setWords(shuffleArray(wordsArray));
        setTargetWords(Array(wordsArray.length).fill(''));
      }
    };

    fetchQuestions();

  return () => {
      isMounted = false; // Cancela actualizaciones si el componente se desmonta
    };
  }, [Lectures]);

  const moveWord = (fromIndex, toIndex) => {
    const updatedWords = update(words, {
      $splice: [
        [fromIndex, 1],
        [toIndex, 0, words[fromIndex]]
      ]
    });
    setWords(updatedWords);
  };

  const setTargetWord = (targetIndex, wordIndex) => {
    const newTargetWords = [...targetWords];
    newTargetWords[targetIndex] = words[wordIndex].word;
    setTargetWords(newTargetWords);
  };

  const checkAnswer = () => {
    const correctOrder = initialWords.map(word => word.word);
    const isCorrect = JSON.stringify(targetWords) === JSON.stringify(correctOrder);
        
   setIsCorrectGuess(isCorrect);
   setGameOver(true);
   if (isCorrect){    
    onSendData(isCorrect);
   }  // Llama a onResolve solo si la oración es correcta
  };

  


  useEffect(() => {
    if (targetWords.length > 0 && targetWords.every(word => word !== '')) {
      checkAnswer();
    }
  }, [targetWords]);


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '55vh' }}>
        <div className="container text-center bg-white text-dark p-4" style={{ maxWidth: '600px' }}>
        <div class="d-flex align-items-center justify-content-center my-4">
          <h1 class="me-3">Arrastra y ordena</h1>
          <div>
            <Helper imageSrc="/img/humu/humu-happy.png" className={`${animation.spinnerImage}`}>
                <DragDropInstructions />
            </Helper>               
            </div>                    
        </div>         
          <h2 className="text my-4">Ordena la siguiente oración</h2>
          <h5 className="text my-4">Su significado en español es: {question?.spanish}</h5>          
          <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
            {words.map((item, index) => (
              <Word key={item.id} word={item.word} index={index} moveWord={moveWord} />
            ))}
          </div>
          <div className="d-flex justify-content-center mb-4">
            {targetWords.map((word, index) => (
              <Target key={index} index={index} word={word} setTargetWord={setTargetWord} />
            ))}
          </div>
          {gameOver && isCorrectGuess && (
            <div className="alert alert-success" role="alert">
              ¡Felicidades! La oración es correcta.
            </div>
          )}
          {gameOver && !isCorrectGuess && (
            <div className="alert alert-danger" role="alert">
              ¡Lo siento! La oración es incorrecta.
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default DragAndDrop;


