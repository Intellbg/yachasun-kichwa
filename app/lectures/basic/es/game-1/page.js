'use client'
import Navbar from "@/app/components/Navbar.js"
import Wordle from "@/app/components/games/wordle/Worlde.js"
import Helper from "@/app/components/helper/Helper.js"
import WordleInstructions from "@/app/components/instructions/wordle/WordleInstructions.js"
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { useState, useRef, useEffect } from 'react';

export default function Game1() {
    const { level } = useAuthStore(
        (state) => state,
    )
    const [childData, setChildData] = useState(null);
    const handleChildData = (data) => {
        setChildData(data);
    };
    return (
        <>
            <Helper imageSrc="\img\humu\humu-happy.png" >
                <WordleInstructions />
            </Helper>
            <Navbar />

            <h1 className="text-center">Wordle</h1>
            <div className="container d-flex justify-content-center align-items-center h-75">
                <Wordle level={level} onSendData={handleChildData} />
            </div>
            {
                childData && (
                    <a href="/lectures/basic/es/test-2" className='text-center btn btn-success'>Enviar</a>
                )
            }
        </>
    )
}
