"use client";
import Navbar from "@/app/components/Navbar.js";
import Helper from "@/app/components/helper/Helper.js";
import SoupLetter from "@/app/components/soupletter/SoupLetter.js";
import { useAuthStore } from '@/providers/auth-store-provider.js';
import { USER_ENDPOINT } from "@/constants.js";
import { useState, useCallback, useEffect } from 'react';
import { getWords } from "@/app/lib/getWords";

export default function Game2() {
    const { level, addLevel, id, key } = useAuthStore((state) => state);

    const [send, setSend] = useState(false);
    const [kichwa, setKichwa] = useState([]);
    const [spanish, setSpanish] = useState([]);

    const handleChildData = useCallback((data) => {
        console.log("Game completed:", data);
        setSend(data);
    }, []);

    function getRandomWords(data, maxLength, numPairs) {
        const filteredData = data.filter(
            (entry) =>
                entry.kichwa.length <= maxLength && entry.spanish.length <= maxLength
        );

        if (filteredData.length === 0) return { kichwa: [], spanish: [] };

        const kichwaList = [];
        const spanishList = [];
        const usedIndices = new Set();

        while (kichwaList.length < numPairs && kichwaList.length < filteredData.length) {
            const randomIndex = Math.floor(Math.random() * filteredData.length);
            if (!usedIndices.has(randomIndex)) {
                const entry = filteredData[randomIndex];
                kichwaList.push(entry.kichwa.toUpperCase());
                spanishList.push(entry.spanish.toUpperCase());
                usedIndices.add(randomIndex);
            }
        }

        return { kichwa: kichwaList, spanish: spanishList };
    }

    useEffect(() => {
        if (send && level < 39) {
            fetch(USER_ENDPOINT + `${id}/level`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": key,
                },
                body: JSON.stringify({ level: level + 1 }),
            })
                .then(() => addLevel())
                .catch((error) => console.error("Error updating level:", error));
        }
    }, [send, level, id, key, addLevel]);

    useEffect(() => {
        const fetchData = async () => {
            const wordsData = await getWords("verbs,adjetives,kitchen,city,room");
            const { kichwa, spanish } = getRandomWords(wordsData, 10, 2);
            setKichwa(kichwa);
            setSpanish(spanish);
            console.log(kichwa)
        };
        fetchData();
    }, [level]);

    return (
        <>
            <Helper imageSrc="/img/humu/humu-happy.png">
                <div className="container mt-5">
                    <h1 className="text-center mb-4">Guía para Jugar Sopa de Letras</h1>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <strong>1. Objetivo:</strong> Encuentra todas las palabras ocultas en la cuadrícula.
                        </li>
                        <li className="list-group-item">
                            <strong>2. Direcciones posibles:</strong> Horizontal, Vertical, y Diagonal.
                        </li>
                        <li className="list-group-item">
                            <strong>3. Selección:</strong> Haz clic o arrastra para seleccionar.
                        </li>
                        <li className="list-group-item">
                            <strong>4. Finalización:</strong> Encuentra todas las palabras para completar el juego.
                        </li>
                    </ul>
                </div>
            </Helper>
            <Navbar />
            <h1 className="text-center">Sopa de Letras</h1>
            <div className="container d-flex justify-content-center align-items-center h-75">
                <SoupLetter words={kichwa} spanish={spanish} onSendData={handleChildData} size={12} />
            </div>
            {send && (
                <div className="m-auto">
                    <a href="/lectures/intermediate/es/test-3" className="btn btn-success">Continuar</a>
                </div>
            )}
        </>
    );
}