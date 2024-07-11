"use client"
import lectureQuestions from '../lectures/lectureQuestions'
import lectures from '../lectures/basic/data'
import React, { useState } from 'react';
import { shuffle } from '../lib/randomize';

function getQuestions(lecture){
    var questions = lectureQuestions.filter((element) => (element.slug == lecture))
    questions.forEach((element)=>{
        shuffle(element.options)
    })
    return questions
}

export default function MiniTestForm({ lecture }) {
    const questions = getQuestions(lecture)
    const lectureData = lectures.find((element) => (element.slug == lecture))
    if (!questions) { return (<div></div>) }
    if (!questions[0].options) { return (<div></div>) }

    const [response1, setResponse1] = useState(0);
    const [response0, setResponse0] = useState(0);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [message, setMessage] = useState("");

    const handleOptionChange = (event) => {
        const value = event.target.value;
        if (event.target.name == "0") {
            setResponse0(value)
        } else {
            setResponse1(value)
        }
    };


    function validate(event) {
        event.preventDefault()
        if (response1 == questions[1].answer & response0 == questions[0].answer) {
            setIsAnswerCorrect(true)
            setMessage("Felicitaciones puede continuar a la siguiente lección")
            return
        }
        setMessage("Sus respuestas están incorrectas")
        setIsAnswerCorrect(false)
    }

    return (
        <div className="container">
            <h3>Evaluación</h3>
            <form method="POST" className={`${isAnswerCorrect ? "d-none" : ""}`}>
                {
                    questions.map((element, index) => {
                        return (
                            <div className="mb-3" key={element.question + index}>
                                <label className="form-label">{element.question}</label>
                                {element.options.map((option) => (
                                    <div className="form-check custom-radio" key={option}>
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name={index} value={option}
                                                checked={
                                                    index == 0 ? response0 === option : response1 === option
                                                }
                                                onChange={handleOptionChange}
                                            />
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )
                    })
                }
                <button className={`btn btn-success ${isAnswerCorrect ? "d-none" : ""}`} onClick={validate}>Enviar</button>
            </form >
            <div className={`${isAnswerCorrect ? "" : "text-danger"}`} >{message}</div>
            <a href={`/lectures/basic/es/${lectureData.next}`} className={`text-center btn btn-success ${isAnswerCorrect ? "" : "d-none"}`}>Continuar</a>
        </div >
    );
}






