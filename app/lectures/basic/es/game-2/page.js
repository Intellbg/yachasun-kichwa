"use client";
import Navbar from "@/app/components/Navbar.js";
import Helper from "@/app/components/helper/Helper.js";
import SoupLetter from "@/app/components/soupletter/SoupLetter.js";
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { USER_ENDPOINT } from "@/constants.js"
import { useState, useCallback, useEffect } from 'react';
import { getWords } from "@/app/lib/getWords"

export default function Game2() {
    const { level, addLevel, id, key } = useAuthStore(
        (state) => state,
    )

    const [childData, setChildData] = useState(null);
    const [send, setSend] = useState(null);
    const [kichwa, setKichwa] = useState([]);
    const [spanish, setSpanish] = useState([]);

    const handleChildData = useCallback((data) => {
        setSend(data);
    }, [childData]);

    useEffect(() => {
        if (12 >= level && send) {
            fetch(USER_ENDPOINT + `${id}/level`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": key,
                },
                redirect: "follow",
                body: JSON.stringify({ "level": level + 1 }),
            })
            addLevel();
        }
    }, [send]);
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
        const fetchData = async () => {
            const wordsData = await getWords("grammar-2,body,animals,family,greetings-farewells");
            const { kichwa, spanish } = getRandomWords(wordsData, 10, 6);
            setKichwa(kichwa)
            setSpanish(spanish)
        };
        fetchData();
    }, [level]);

    return (
        <>
            <Helper imageSrc="/img/humu/humu-happy.png">
                <div class="container mt-5">
                    <h1 class="text-center mb-4">Guía para Jugar Sopa de Letras</h1>
                    <ul class="list-group">
                        <li class="list-group-item ">
                            <strong>1. Objetivo:</strong> Encuentra todas las palabras ocultas en la cuadrícula.
                        </li>
                        <li class="list-group-item ">
                            <strong>2. Direcciones posibles:</strong>
                            Las palabras pueden estar colocadas en diferentes direcciones:
                            <ul>
                                <li>Horizontal: de izquierda a derecha o de derecha a izquierda.</li>
                                <li>Vertical: de arriba hacia abajo o de abajo hacia arriba.</li>
                                <li>Diagonal: en cualquiera de las diagonales.</li>
                            </ul>
                        </li>
                        <li class="list-group-item ">
                            <strong>3. Selección:</strong> Haz clic o arrastra sobre las letras para marcar una palabra.
                        </li>
                        <li class="list-group-item ">
                            <strong>4. Finalización:</strong> El juego termina cuando encuentres todas las palabras de la lista.
                        </li>
                        <li class="list-group-item ">
                            <strong>5. Consejo:</strong> Busca primero las palabras más largas para facilitar el juego.
                        </li>
                    </ul>
                </div>
            </Helper>
            <Navbar />

            <h1 className="text-center">Sopa de Letras</h1>
            <div className="container d-flex justify-content-center align-items-center h-75">
                <SoupLetter words={kichwa} spanish={spanish} onSendData={handleChildData} size={12} /> 
            </div>
            {
                (send || level >= 12) && (
                    <div className="m-auto">
                        <a href="/lectures/basic/es/test-2" className='text-center btn btn-success'>Continuar</a>
                    </div>
                )
            }
        </>
    );
}
