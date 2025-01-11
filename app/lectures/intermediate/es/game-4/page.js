"use client";
import Navbar from "@/app/components/Navbar.js";
import CompleteSentence from "@/app/components/CompleteSentences/CompleteSentence.js";
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { USER_ENDPOINT } from "@/constants.js"
import { useState, useCallback, useEffect } from 'react';
import ComicSpeechBubble from "../../../../components/ComicSpeechBubble/ComicSpeechBubble"

export default function Game1() {
    const { level, addLevel, id, key } = useAuthStore(
        (state) => state,
    )

    const [childData, setChildData] = useState(null);
    const [send, setSend] = useState(null);

    const handleChildData = useCallback((data) => {
        setSend(data);
    }, [childData]);

    useEffect(() => {
        if (45 >= level && send) {
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

    return (
        <>            
            <Navbar />            
            <div className="container d-flex justify-content-center align-items-center h-75">
            <CompleteSentence Lectures="grammar-7,grammar-8.grammar-9" onSendData={handleChildData}  />
            </div>
            {
                (send || level >= 46) && (
                    <div className="m-auto text-center">
                        <ComicSpeechBubble text="¡Eso estuvo fácil, ¿no?!. Juego superado" character="humu" />
                        <a href="/lectures/intermediate/es/test-4" className='text-center btn btn-success'>Continuar</a>
                    </div>
                )
            }
        </>
    );
}