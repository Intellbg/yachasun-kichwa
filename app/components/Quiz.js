"use client"

import React, { useState } from "react";
import Question from "./Question";
import lectureQuestions from '../lectures/lectureQuestions'
import lectures from '../lectures/basic/data'
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { USER_ENDPOINT } from "@/constants.js"


function getQuestions(lecture) {
  var questions = lectureQuestions.filter((element) => (element.slug == lecture))
  return questions
}


export default function Quiz({ lecture }) {
  const { level, addLevel, id, key } = useAuthStore(
    (state) => state,
  )

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
      console.log(level)
      console.log(lectureData.score_required )
      console.log(lectureData.score_required > level )
      console.log(id )
      console.log(key )
      if (lectureData.score_required > level) {
        addLevel();
        fetch(USER_ENDPOINT + `${id}/level`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "authorization": key,
          },
          redirect: "follow",
          body: JSON.stringify({ "level": level }),
        }).then((r)=>console.log(r))
      }
    } else {
      setResult(`Obtuvo ${correctCount} de ${questions.length} correctas`);
    }
  };

  return (
    <div className="container">
      <div className={`${(lectureData.score_required < level) | isAnswerCorrect ? "d-none" : ""}`}>
        <h3>Evaluación</h3>

        {questions.map((questionData, index) => (
          <Question
            key={index}
            index={index}
            questionData={questionData}
            selectedAnswer={answers[index]}
            onSelectAnswer={handleSelectAnswer}
          />
        ))}
        <button className={`btn btn-success ${isAnswerCorrect ? "d-none" : ""}`} onClick={checkAnswers} level={level}>Enviar</button>

        {result && <p>{result}</p>}
      </div>
      <a href={`/lectures/basic/es/${lectureData.next}`} className={`text-center btn btn-success ${(lectureData.score_required < level) | isAnswerCorrect ? "" : "d-none"}`}>Continuar</a>
    </div>
  );
};



