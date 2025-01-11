"use client";
import Navbar from "@/app/components/Navbar.js";
import Helper from "@/app/components/helper/Helper.js";
import SoupLetter from "@/app/components/soupletter/SoupLetter.js";
import { useAuthStore } from '@/providers/auth-store-provider.js';
import { USER_ENDPOINT } from "@/constants.js";
import { useState, useCallback, useEffect } from 'react';
import { getWords } from "@/app/lib/getWords";
import animation from '@/app/animation.module.css';
import SoupLetterInstructions from "@/app/components/instructions/soupletter/SoupLetterInstruction.js";
import ComicSpeechBubble from "@/app/components/ComicSpeechBubble/ComicSpeechBubble";

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
        if (send && level < 12) {
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
            const wordsData = await getWords("grammar-2,body,animals,family,greetings-farewells");
            const { kichwa, spanish } = getRandomWords(wordsData, 10, 5);
            setKichwa(kichwa);
            setSpanish(spanish);
            console.log(kichwa)
        };
        fetchData();
    }, [level]);

    return (
        <>            
            <Navbar />
            <div className="container text-center bg-white text-dark" style={{ maxWidth: '1200px' }}>
            <div class="d-flex align-items-center justify-content-center mb-4">
                <h1 class="me-3">Sopa de Letras</h1>
                <div>
                    <Helper imageSrc="/img/humu/humu-happy.png" className={`${animation.spinnerImage}`}>
                        <SoupLetterInstructions />
                    </Helper>               
                </div>                    
            </div> 
            <h2 className="text my-4"> Busca, encuentra y señala las palabras de la lista </h2>
            <div className="container d-flex justify-content-center align-items-center h-75">
                {
                    !send && <SoupLetter words={kichwa} spanish={spanish} onSendData={handleChildData} size={12} />
                }
            </div>
            </div>
            {(level >= 12 || send) && (
                <div className="m-auto text-center">
                    <ComicSpeechBubble text="" character="humuFeliz" alignment="left" >
                            <p className="h6">¡Eso estuvo fácil, ¿no?!. Juego superado</p>
                        </ComicSpeechBubble>
                    <a href="/lectures/basic/es/test-2" className="btn btn-success">Continuar</a>
                </div>
            )}
        </>
    );
}
