"use client"
import React, { useState, useEffect } from "react";
import Question from "@/app/components/Question";
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { USER_ENDPOINT } from "@/constants.js"
import { getQuestionsSentence } from "@/app/lib/getQuestionsSentence.js";
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
      const questions = await await getQuestionsSentence("grammar-2-2,grammar-3-2,grammar-4,grammar-5,grammar-6",10,4);      
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
      if (32 >= level) {
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
      setResult(`Obtuviste ${correctCount} de ${questions.length} correctas`);
      setHumuExpression(`humuSad`);
    }
  };

  useEffect(() => {
    setIsCorrect(Array(questions.length).fill(true))
  }, [questions]);

  return (
    <div className="container">
      <div className={`${(32 < level) | isAnswerCorrect ? "d-none" : ""}`}>
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
      <div className={`${!((32 < level)) ? "d-none" : ""} text-center`}>
        <h1>¡Felicitaciones completaste el módulo 2 del nivel intermedio!</h1>
        <img
          src="/img/humu/humu-talking.png"
          height={300}
          className={`humu-mascot me-4 ${animation.spinnerImage}`}
        /> 
        <br />
        <div className="m-auto text-center">
          <a href={`/lectures/intermediate/es/verbs`} className={`text-center btn btn-success ${(32 < level) | isAnswerCorrect ? "" : "d-none m-auto"}`}>Continuar</a>
        </div>       
      </div>
    </div>
  );
};