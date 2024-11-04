"use client"
import React, { useState, useEffect } from "react";
import {shuffleArray} from "@/app/lib/randomize"
import style from "./Question.module.css"

export default function Question({ questionData, index, selectedAnswer, onSelectAnswer, incorrect=false }){
    const [shuffledOptions, setShuffledOptions] = useState([]);
    useEffect(() => {
        setShuffledOptions(shuffleArray(questionData.options));
    }, [questionData.options]);

    return (
        <div className="mb-3" key={questionData.question}>
            <label className={`form-label ${incorrect?"":style.incorrect}`}>{questionData.question}</label>
            {
                shuffledOptions.map((option) => (
                    <div className="form-check custom-radio" key={option}>
                        <label className="form-check-label">
                            <input className="form-check-input"
                                type="radio"
                                name={`question-${index}`} value={option}
                                checked={selectedAnswer === option}
                                onChange={() => onSelectAnswer(index, option)}
                            />
                            {option}
                        </label>
                    </div>
                ))
            }
        </div>
    );
};
