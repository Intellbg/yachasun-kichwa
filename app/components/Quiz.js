"use client"
import React, { useState, useEffect } from "react";
import Question from "./Question";
import lectureQuestionsI from '../lectures/intermediate/lectureQuestions'
import lecturesI from '../lectures/intermediate/data'
import lectureQuestionsB from '../lectures/basic/lectureQuestions'
import lecturesB from '../lectures/basic/data'
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { USER_ENDPOINT } from "@/constants.js"
import ComicSpeechBubble from "@/app/components/ComicSpeechBubble/ComicSpeechBubble.js"

const lectureQuestions = [...lectureQuestionsI, ...lectureQuestionsB]
const lectures = [...lecturesI, ...lecturesB]

function getQuestions(lecture) {
  var questions = lectureQuestions.filter((element) => (element.slug == lecture))
  return questions
}

export default function Quiz({ lecture }) {
  const { level, addLevel, id, key } = useAuthStore(
    (state) => state,
  )
  const lectureData = lectures.find((element) => (element.lectures.find(
    (element) => element.slug == lecture
  ))).lectures.find((element) => element.slug == lecture)

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]);
  const [result, setResult] = useState(null);
  const [humuExpression, setHumuExpression] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

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
      if (lectureData.score_required >= level) {
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
    setQuestions(getQuestions(lecture))
  }, []);
  useEffect(() => {
    setIsCorrect(Array(questions.length).fill(true))
  }, [questions]);

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
            incorrect={isCorrect[index]}
            onSelectAnswer={handleSelectAnswer}
          />
        ))}
        <button className={`btn btn-success ${isAnswerCorrect ? "d-none" : ""}`} onClick={checkAnswers} level={level}>Enviar</button>

        {result && <ComicSpeechBubble text={result} character={humuExpression} />}

      </div>

      {
        ((lectureData.score_required < level) || isAnswerCorrect) &&
        <div className='text-center'>
          <ComicSpeechBubble text="Ya has completado esta lección" character={humuExpression} >
          </ComicSpeechBubble>
          <a href={`${lectureData.next}`} className={`text-center btn btn-success`}>Continuar</a>
        </div>
      }
    </div >
  );
};