"use client";
import Navbar from "@/app/components/Navbar.js";
import Wordle from "@/app/components/games/wordle/Worlde.js";
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { USER_ENDPOINT } from "@/constants.js"
import { useState, useCallback, useEffect } from 'react';

export default function Game1() {
    const { level, addLevel, id, key } = useAuthStore(
        (state) => state,
    )

    const [childData, setChildData] = useState(null);
    const [send, setSend] = useState(null);

    const handleChildData = useCallback((data) => {
        console.log(data);
        setSend(data);
    }, [childData]);

    useEffect(() => {
        if (4 >= level && send) {
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
                <Wordle lectures="animals-2" onSendData={handleChildData} />
            </div>
            {
                (send || level >= 25) && (
                    <div className="m-auto">
                        <a href="/lectures/intermediate/es/test-1-2" className='text-center btn btn-success'>Continuar</a>
                    </div>
                )
            }
        </>
    );
}