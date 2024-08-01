"use client"
import React, { useState, useEffect } from "react";

export const shuffleArray = (array) => {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

export default function Question({ questionData, index, selectedAnswer, onSelectAnswer }){
    const [shuffledOptions, setShuffledOptions] = useState([]);
    useEffect(() => {
        setShuffledOptions(shuffleArray(questionData.options));
    }, [questionData.options]);

    return (
        <div className="mb-3" key={questionData.question}>
            <label className="form-label">{questionData.question}</label>
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
