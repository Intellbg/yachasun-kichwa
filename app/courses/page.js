export default function Courses() {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row">

                <div className="col">
                    <div className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="/img/start-flag.png" className="" alt="start-flag" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Curso Inicial</h5>
                                    <p className="card-text">Este curso esta diseñado para continuar con el lenguaje</p>
                                    <a href="/lectures" className="btn btn-primary bg-primary-custom mx-2" role="button">Iniciar</a>
                                    <a href="#" className="btn btn-warning" role="button" data-bs-toggle="button" aria-pressed="true">Conoce más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3" className="blocked">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="/img/goal.png" height={"200px"} className="cover" alt="start-flag" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Curso Intermedio</h5>
                                    <p className="card-text">Continua con tu aprendizaje del lenguaje.</p>
                                    <a href="#" className="btn btn-primary bg-primary-custom mx-2 disabled" role="button" data-bs-toggle="button">Iniciar</a>
                                    <a href="#" className="btn btn-warning" role="button" data-bs-toggle="button" aria-pressed="true">Conoce más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <img src="/img/mascot.png" alt="Humita Happy" />
                </div>
            </div>
        </div>
    );
}
