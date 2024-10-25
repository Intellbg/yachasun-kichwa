"use client"

import React, { useState } from "react";
import Question from "@/app/components/Question";
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { USER_ENDPOINT } from "@/constants.js"
import { getQuestions } from "@/app/lib/getQuestions.js";
import { useRef, useEffect } from 'react';


export default function Test1() {
  const { level, addLevel, id, key } = useAuthStore(
    (state) => state,
  )
  const [questions, setQuestions] = useState([]);

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const questions = await await getQuestions("numbers,alphabet,grammar-1,colors", 10, 4)
      console.log(questions)
      setQuestions(questions);
    };
    fetchData()
  }, [level]);

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
      if (5 >= level) {
        addLevel();
        fetch(USER_ENDPOINT + `${id}/level`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "authorilectureDatazation": key,
          },
          redirect: "follow",
          body: JSON.stringify({ "level": level + 1 }),
        }).then((r) => console.log(r))
      }
    } else {
      setResult(`Obtuvo ${correctCount} de ${questions.length} correctas`);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Evaluación 1</h1>
      <div className={`${(5 < level) | isAnswerCorrect ? "d-none" : ""}`}>
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
      <a href={`/lectures/basic/es/greetings-farewells`} className={`text-center btn btn-success ${(5 < level) | isAnswerCorrect ? "" : "d-none"}`}>Continuar</a>
    </div>
  );
};