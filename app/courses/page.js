import CourseCard from "../components/course_card/CourseCard"
import Navbar from "../components/Navbar"
import { getSessionData } from "../lib/getSession"
import { courses } from './data.js'

export default async function Courses() {
    const data = await getSessionData()
    let currentScore = data['app_score']
    return (
        <>
            <Navbar />
            <div className="container d-flex justify-content-center align-items-center h-100">
                <div className="row">
                    <div className="col">
                        {courses.map((item) => <CourseCard key={item.title} data={item} currentScore={currentScore} />)}
                    </div>
                    <div className="col">
                        <img src="/img/mascot.png" alt="Humita Happy" />
                    </div>
                </div>
            </div>
            );
        </>
    )
}
