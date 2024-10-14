'use client'
import Navbar from "@/app/components/Navbar.js"
import Crossword from "@/app/components/crossword/Crossword.js"
import Helper from "@/app/components/helper/Helper.js"
import CrosswordInstructions from "@/app/components/instructions/corssword/CrosswordInstructions.js"
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { useState, useRef, useEffect } from 'react';
import { getQuestions } from "@/app/lib/getQuestions.js";

export default function Game1() {
    const { level } = useAuthStore(
        (state) => state,
    )
    const [childData, setChildData] = useState(null);
    const handleChildData = (data) => {
        setChildData(data);
    };
    const [questions, setQuestion] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const questions = await getQuestions("animals,body,grammar-2");
            const randomQuestion = questions[0]
            setQuestion(randomQuestion);
        };
        fetchData()
    }, [level]);
    return (
        <>
            <Helper imageSrc="\img\humu\humu-happy.png" >
                <CrosswordInstructions />
            </Helper>
            <Navbar />

            <h1 className="text-center">Crucigrama</h1>
            <div className="container d-flex justify-content-center align-items-center h-75">
                {/* <Crossword words={questions} onSendData={handleChildData} /> */}
            </div>
            {
                childData && (
                    <a href="/lectures/basic/es/test-2" className='text-center btn btn-success'>Enviar</a>
                )
            }
        </>
    )
}
