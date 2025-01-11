"use client";
import Navbar from "@/app/components/Navbar.js";
import DragDrop from "@/app/components/drag_drop/DragDrop.js";
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
        if (31 >=level && send) {
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
                <DragDrop Lectures="grammar-2-2,grammar-3-2,grammar-4,grammar-5,grammar-6" onSendData={handleChildData}/>
            </div>
            {
                (send || level >= 32) && (
                    <div className="m-auto text-center">
                        <ComicSpeechBubble text="¡Eso estuvo fácil, ¿no?!. Juego superado" character="humu" />
                        <a href="/lectures/intermediate/es/test-2" className='text-center btn btn-success'>Continuar</a>
                    </div>
                )
            }
        </>
    );
}