import activities from "./data";
import Navbar from "../../components/Navbar"
import LectureCard from "@/app/components/lecture_card/LectureCard";
import { getSessionData } from "../../lib/getSession"

export default async function Lectures() {
    const data = await getSessionData()
    let currentScore = data['app_score']
    return (
        <>
            <Navbar />
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="row">
                    <div className="col overflow-column">
                        {
                            activities.map(element => {
                                return <LectureCard key={element.name} data={element} currentScore={currentScore} />
                            })
                        }
                    </div>
                    <div className="col">
                        <img src="/img/mascot.png" alt="Humita Happy" />
                    </div>
                </div>
            </div>
        </>
    );
}
