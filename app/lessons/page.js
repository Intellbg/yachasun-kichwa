import activities from "./data";
export default function Courses() {
    let actual_user_score = 20
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row">
                <div className="col overflow-column">
                    {
                        activities.map(element => {
                            return (
                                <div className={`${element.unlock_score > actual_user_score ? "blocked" : element.unlock_score == actual_user_score ? "current" : "passed"} card mb-3`} >
                                    <div className="row g-0">
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{element.name}</h5>
                                                <p className="card-text">Este curso esta diseñado para continuar con el lenguaje</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex align-items-center">
                                        <a href="/lectures" className={`${element.unlock_score > actual_user_score ? "disabled" : ""} btn btn-primary bg-primary-custom mx-auto`} role="button">Iniciar</a>
                                            {/* <a href="#" className={`${element.unlock_score > actual_user_score ? "disabled" : ""} btn btn-primary bg-primary-custom mx-auto`} role="button" data-bs-toggle="button">Iniciar</a> */}
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
