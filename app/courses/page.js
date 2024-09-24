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
                    <div className="card mb-3 blocked">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="/img/goal.png" height={"200px"} className="cover" alt="start-flag" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Logros</h5>
                                    <p className="card-text">Entra y mira todas las insignias que haz conseguido a lo largo de tu aprendizaje</p>
                                    <a href="/achievements" className="btn btn-primary bg-primary-custom mx-2" role="button" >Iniciar</a>
                                    <a href="#" className="btn btn-warning" role="button" data-bs-toggle="button" aria-pressed="true">Conoce más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3 blocked">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="/img/goal.png" height={"200px"} className="cover" alt="start-flag" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Juegos prueba</h5>
                                    <p className="card-text">Juegos</p>
                                    <a href="/game" className="btn btn-primary bg-primary-custom mx-2" role="button" >Iniciar</a>
                                    <a href="#" className="btn btn-warning" role="button" data-bs-toggle="button" aria-pressed="true">Conoce más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <img src="/img/humu/humu-happy.png" alt="Humu Happy" height={400} />
                    </div>
                </div>
            </div>
            );
        </>
    )
}
