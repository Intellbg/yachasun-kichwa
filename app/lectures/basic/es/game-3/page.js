"use client";
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/app/components/Navbar.js";
import Crossword from "@/app/components/crossword/Crossword.js";
import CrosswordInstructions from "@/app/components/instructions/crossword/CrosswordInstructions.js";
import Helper from "@/app/components/helper/Helper.js";
import { useAuthStore } from "@/providers/auth-store-provider.js";
import { USER_ENDPOINT } from "@/constants.js";

const data = [
    { word: "ACEITE", question: "¿Cuál es la traducción de 'yakuwira'?" },
    { word: "COCINA", question: "¿Cuál es la traducción de 'yananunauku'?" },
    { word: "PALTA", question: "¿Cuál es la traducción de 'aguacate'?" },
    { word: "PUNANAUKU", question: "¿Cuál es la traducción de 'dormitorio'?" },
    { word: "KILLKANAKASPI", question: "¿Cuál es la traducción de 'lápiz'?" },
    { word: "KILLKAKATINA", question: "¿Cuál es la traducción de 'leer'?" },
    { word: "KAWATU", question: "¿Cuál es la traducción de 'cama'?" },
    { word: "ALLPA", question: "¿Cuál es la traducción de 'suelo'?" },
];

export default function Game3() {
    console.log(data)
    const { level, addLevel, id, key } = useAuthStore((state) => state);
    const [send, setSend] = useState(false);

    const handleChildData = useCallback((isComplete) => {
        console.log("Crossword completed:", isComplete);
        setSend(isComplete);
    }, []);

    useEffect(() => {
        if (send && level <= 4) {
            fetch(USER_ENDPOINT + `${id}/level`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: key,
                },
                body: JSON.stringify({ level: level + 1 }),
            })
                .then(() => addLevel())
                .catch((error) => console.error("Error updating level:", error));
        }
    }, [send, level, id, key, addLevel]);

    return (
        <>
            <Helper imageSrc="/img/humu/humu-happy.png">
                <CrosswordInstructions />
            </Helper>
            <Navbar />
            <h1 className="text-center">Crucigrama</h1>
            <div className="container d-flex justify-content-center align-items-center h-75">
                <Crossword data={data} onComplete={handleChildData} />
            </div>
            {(send || level >= 19) && (
                <div className="m-auto">
                    <a href="/lectures/basic/es/test-3" className="text-center btn btn-success">
                        Continuar
                    </a>
                </div>
            )}
        </>
    );
}
