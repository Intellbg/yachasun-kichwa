"use client"

import React, { useState } from "react";
import Question from "./Question";
import lectureQuestions from '../lectures/lectureQuestions'
import lectures from '../lectures/basic/data'

function getQuestions(lecture) {
  var questions = lectureQuestions.filter((element) => (element.slug == lecture))
  return questions
}


export default function Quiz({ lecture }) {
  const lectureData = lectures.find((element) => (element.slug == lecture))
  const questions = getQuestions(lecture)

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const handleSelectAnswer = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const checkAnswers = () => {
    const correctCount = questions.reduce((count, question, index) => {
      if (answers[index] === question.answer) {
        return count + 1;
      }
      return count;
    }, 0);
    if (correctCount == questions.length) {
      setIsAnswerCorrect(true)
      setResult(`Felicitaciones puede continuar a la siguiente lección`);

    } else {
      setResult(`Obtuvo ${correctCount} de ${questions.length} correctas`);
    }
  };

  return (
    <div className="container">
      <h3>Evaluación</h3>
      <div className={`${isAnswerCorrect ? "d-none" : ""}`}>

        {questions.map((questionData, index) => (
          <Question
            key={index}
            index={index}
            questionData={questionData}
            selectedAnswer={answers[index]}
            onSelectAnswer={handleSelectAnswer}
          />
        ))}
        <button className={`btn btn-success ${isAnswerCorrect ? "d-none" : ""}`} onClick={checkAnswers}>Enviar</button>

        {result && <p>{result}</p>}
      </div>
      <a href={`/lectures/basic/es/${lectureData.next}`} className={`text-center btn btn-success ${isAnswerCorrect ? "" : "d-none"}`}>Continuar</a>
    </div>
  );
};



