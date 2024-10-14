import activities from "./data";
import Link from 'next/link'
import { useAuthStore } from '@/providers/auth-store-provider.js'

export default function Courses() {
    const { level } = useAuthStore((state) => state);
    let actual_user_score = level
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row">
                <div className="col overflow-column">                    {
                    activities.map(element => {
                        return (
                            <div className={`${element.unlock_score > actual_user_score ? "blocked" : element.unlock_score == actual_user_score ? "current" : "passed"} card mb-3`} >
                                <div className="row g-0">
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{element.name}</h5>
                                        </div>
                                    </div>
                                    <div className="col-md-4 d-flex align-items-center">
                                        <Link href={`lectures/es/${element.slug}`} className={`${element.unlock_score > actual_user_score ? "disabled" : ""} btn btn-primary bg-primary-custom mx-auto`} >Iniciar</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
                <div className="col">
                    <img src="/img/mascot.png" alt="Humita Happy" />
                </div>
            </div>
        </div>
    );
}
