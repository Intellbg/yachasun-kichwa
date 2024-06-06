export default function Logros() {
    return (
        <div className="container-fluid p-0">            
            <main className="container my-5">
                <section className="text-center mb-5">
                    <h2 className="text-success">Logros</h2>                    
                </section>
                <section className="text-center mb-5">
                    <h2 className="text-success">Juegos <span>6/6</span></h2>
                    <div className="d-flex flex-wrap justify-content-center">
                        {/* Agrega las imágenes de los juegos aquí */}
                        <div className="m-2">                            
                            <img src="/img/logro1.png" alt="Juego 1" />
                        </div>
                        <div className="m-2">
                            <img src="/img/logro2.png" alt="Juego 2" />
                        </div>
                        
                    </div>
                </section>
                <section className="text-center">
                    <h2 className="text-success">Examenes <span>6/6</span></h2>
                    <div className="d-flex flex-wrap justify-content-center">
                        {/* Agrega las imágenes de los exámenes aquí */}
                        <div className="m-2">
                            <img src="/img/logro3.png" alt="Examen 1" />
                        </div>
                        <div className="m-2">
                            <img src="/img/logro4.png" alt="Examen 2" />
                        </div>
                        <div className="m-2">
                            <img src="/img/logro5.png" alt="Examen 2" />
                        </div>                        
                    </div>
                </section>
            </main>
        </div>
    );
}
