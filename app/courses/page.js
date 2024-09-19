'use client'
import CourseCard from "../components/course_card/CourseCard"
import Navbar from "../components/Navbar"
import { courses } from './data.js'
import { useAuthStore } from '@/providers/auth-store-provider.js'

export default function Courses() {
    const { level } = useAuthStore(
        (state) => state,
    )
    return (
        <>
            <Navbar />
            <div className="container d-flex justify-content-center align-items-center h-100">
                <div className="row">
                    <div className="col">
                        {courses.map((item) => <CourseCard key={item.title} data={item} currentScore={level} />)}
                    </div>
                    <div className="col">
                        <img src="/img/humu/humu-happy.png" alt="Humu Happy" height={400}/>
                    </div>
                </div>
            </div>
            );
        </>
    )
}
