"use client"
import React, { useState, useEffect } from "react";
import Question from "@/app/components/Question";
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { USER_ENDPOINT } from "@/constants.js"
import { getQuestions } from "@/app/lib/getQuestions.js";
import ComicSpeechBubble from "@/app/components/ComicSpeechBubble/ComicSpeechBubble.js"
import animation from "@/app/animation.module.css"

export default function Test1() {
  const { level, addLevel, id, key } = useAuthStore(
    (state) => state,
  )
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isCorrect, setIsCorrect] = useState([]);
  const [humuExpression, setHumuExpression] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const questions = await await getQuestions("grammar-2,body,animals,family,greetings-farewells", 10, 4)
      console.log(questions)
      setQuestions(questions);
    };
    fetchData()
  }, []);

  const handleSelectAnswer = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const checkAnswers = () => {
    const correctnessArray = questions.map((question, index) =>
      answers[index] === question.answer
    );
    setIsCorrect(correctnessArray)
    const correctCount = correctnessArray.filter(Boolean).length
    if (correctCount == questions.length) {
      setIsAnswerCorrect(true)
      setResult(`Felicitaciones puede continuar a la siguiente lección`);
      setHumuExpression(`humu`);
      if (12 >= level) {
        addLevel();
        fetch(USER_ENDPOINT + `${id}/level`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "authorization": key,
          },
          redirect: "follow",
          body: JSON.stringify({ "level": level + 1 }),
        })
      }
    } else {
      setResult(`Obtuvo ${correctCount} de ${questions.length} correctas`);
      setHumuExpression(`humuSad`);
    }
  };

  useEffect(() => {
    setIsCorrect(Array(questions.length).fill(true))
  }, [questions]);

  return (
    <div className="container">
      <div className={`${(12 < level) | isAnswerCorrect ? "d-none" : ""}`}>
        <h1 className="text-center">Evaluación 2</h1>
        {questions.map((questionData, index) => (
          <Question
            key={index}
            index={index}
            questionData={questionData}
            selectedAnswer={answers[index]}
            incorrect={isCorrect[index]}
            onSelectAnswer={handleSelectAnswer}
          />
        ))}
        <button className={`btn btn-success ${isAnswerCorrect ? "d-none" : ""}`} onClick={checkAnswers} level={level}>Enviar</button>
        {result && <ComicSpeechBubble text={result} character={humuExpression} />}
      </div>
      <div className={`${(12 >= level) ? "d-none" : ""} text-center`}>
        <h1>¡Felicitaciones ya ha completado el módulo 2 del nivel básico!</h1>
        <img
          src="/img/humu/humu-talking.png"
          height={300}
          className={`humu-mascot me-4 ${animation.spinnerImage}`}
        />
        <br />
        <h3><a href="/achievements">Revisa tus Logros</a></h3>
        <div className="m-auto text-center">
          <a href={`/lectures/basic/es/house`} className={`text-center btn btn-success ${(12 < level) | isAnswerCorrect ? "" : "d-none m-auto"}`}>Continuar</a>
        </div>
      </div>
    </div>
  );
};