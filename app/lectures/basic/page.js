'use client'
import activities from "./data";
import Navbar from "../../components/Navbar"
import LectureCard from "@/app/components/lecture_card/LectureCard";
import { useAuthStore } from '@/providers/auth-store-provider.js'

export default function Lectures() {
    const { level } = useAuthStore(
        (state) => state,
    )
    return (
        <>
            <Navbar />
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="row">
                    <div className="col overflow-column">
                        {
                            activities.map(element => {
                                return <LectureCard key={element.name} data={element} currentScore={level} />
                            })
                        }
                    </div>
                    <div className="col">
                        <img src="/img/humu/humu-happy.png" alt="Humu Happy"  height={400}/>
                    </div>
                </div>
            </div>
        </>
    );
}
