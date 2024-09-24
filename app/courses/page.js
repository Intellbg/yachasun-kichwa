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
            <div className="container d-flex justify-content-center align-items-center h-75">
                <div className="row">
                    <div className="col">
                        {courses.map((item) => <CourseCard key={item.title} data={item} currentScore={level} />)}
                    </div>
                </div>
                <div className="col">
                    <img src="/img/humu/humu-happy.png" alt="Humu Happy" height={400} />
                </div>
            </div>

            <div className="container w-100 text-center">
                <div className="row d-flex justify-content-center ">

                <a href="/achievements" className="text-decoration-none col-3">
                    <div className="card hover-div w-100">
                        <div className="d-flex flex-column">
                            <div className="card-body">
                                <h1 className="display-1">
                                    <i className="bi bi-trophy-fill "></i>
                                </h1>
                                <h5 className="card-title">Logros</h5>
                                <p className="card-text">Revisa tus insignias</p>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="/game" className="text-decoration-none col-3">
                    <div className="card hover-div w-100">
                        <div className="d-flex flex-column">
                            <div className="card-body">
                                <h1 className="display-1">
                                    <i className="bi bi-joystick"></i>
                                </h1>
                                <h5 className="card-title">Juegos</h5>
                                <p className="card-text">Practica tus habilidades</p>
                            </div>
                        </div>
                    </div>
                </a>
                </div>
            </div >
        </>
    )
}
