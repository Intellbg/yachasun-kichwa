"use client"
import React, { useState, useEffect } from "react";
import Question from "@/app/components/Question";
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { USER_ENDPOINT } from "@/constants.js"
import { getQuestions } from "@/app/lib/getQuestions.js";
import { getQuestionsSentence } from "@/app/lib/getQuestionsSentence.js";
import { getQuestionTime } from "@/app/lib/getQuestionTime.js";
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
      const questions = await await getQuestions("location,time", 4, 4)
      const questions2 = await await getQuestionTime("grammar-7,grammar-8,grammar-9",3,2);
      const questions3 = await await getQuestionsSentence("grammar-7,grammar-8,grammar-9",3,4);
      var combinedQuestions = questions.concat(questions2); 
      combinedQuestions = combinedQuestions.concat(questions3);  
      console.log(combinedQuestions)
      setQuestions(combinedQuestions);
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
      if (46 >= level) {
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
      <div className={`${(46 < level) | isAnswerCorrect ? "d-none" : ""}`}>
        <h1 className="text-center">Evaluación 4</h1>
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
      <div className={`${!((46 < level)) ? "d-none" : ""} text-center`}>
        <h1>¡Felicitaciones completaste el módulo 4 del nivel intermedio!</h1>
        <img
          src="/img/humu/humu-talking.png"
          height={300}
          className={`humu-mascot me-4 ${animation.spinnerImage}`}
        />
        <br />   
        <h3><a href="/achievements">Revisa tus Logros</a></h3>     
        <div className="m-auto text-center">
          <a href={`/lectures/intermediate/es/grammar-10`} className={`text-center btn btn-success ${(46 < level) | isAnswerCorrect ? "" : "d-none m-auto"}`}>Continuar</a>
        </div>
      </div>
    </div>
  );
};