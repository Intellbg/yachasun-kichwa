import React from 'react';
import animation from '@/app/animation.module.css';

const AchievementsInstructions = () => {
    return (
        <div className="container mt-5  justify-content-center">
            <h2 className="text-center display-5">¡Felicidades por tus logros! 🏆</h2>
            <div className="modal-body d-flex align-items-center text-start">
                <img
                src="/img/humu/humu-talking.png"
                height={300}
                className={`humu-mascot me-4 ${animation.spinnerImage}`}
                />
                <div>
                    <p className="lead fs-4">
                        En esta página podrás <strong>ver tu progreso</strong> y revisar todos los
                        logros que has alcanzado en tu camino.
                    </p>
                    <p className="lead fs-4">
                        Cada logro se presenta en forma de una carta.
                        Puedes hacer clic en ellas para descubrir más detalles sobre tus éxitos.
                    </p>
                    <p className="lead fs-4">
                        Además, con cada logro, encontrarás <strong>simbología inspirada en culturas
                        ecuatorianas</strong>, lo que te permitirá aprender más sobre el patrimonio
                        cultural mientras avanzas.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AchievementsInstructions;