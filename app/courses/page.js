export default function Courses() {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row">

                <div className="col">
                    <div class="card mb-3" >
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="/img/start-flag.png" class="" alt="start-flag" />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Curso Inicial</h5>
                                    <p class="card-text">Este curso esta diseñado para continuar con el lenguaje</p>
                                    <a href="/lectures" class="btn btn-primary bg-primary-custom mx-2" role="button">Iniciar</a>
                                    <a href="#" class="btn btn-warning" role="button" data-bs-toggle="button" aria-pressed="true">Conoce más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-3" className="blocked">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="/img/goal.png" height={"200px"} class="cover" alt="start-flag" />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Curso Intermedio</h5>
                                    <p class="card-text">Continua con tu aprendizaje del lenguaje.</p>
                                    {/* <a href="/lessons" class="btn btn-primary bg-primary-custom mx-2 disabled" role="button" data-bs-toggle="button">Iniciar</a> */}
                                    <a href="/lectures" class="btn btn-primary bg-primary-custom mx-2" role="button">Iniciar</a>
                                    <a href="#" class="btn btn-warning" role="button" data-bs-toggle="button" aria-pressed="true">Conoce más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-3" className="blocked">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="/img/goal.png" height={"200px"} class="cover" alt="start-flag" />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Logros</h5>
                                    <p class="card-text">Mira tus insignias para ver los logros que haz conseguido.</p>
                                    {/* <a href="/lessons" class="btn btn-primary bg-primary-custom mx-2 disabled" role="button" data-bs-toggle="button">Iniciar</a> */}
                                    <a href="/achievements" class="btn btn-primary bg-primary-custom mx-2" role="button">Iniciar</a>
                                    <a href="#" class="btn btn-warning" role="button" data-bs-toggle="button" aria-pressed="true">Conoce más</a>
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
