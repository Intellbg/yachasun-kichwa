import React from 'react';

const CrosswordInstructions = () => {
    return (
        <div className="container mt-5  justify-content-center">
            <div className="text-center">
                <h2>¿Cómo Jugar Crucigrama?</h2>
            </div>
            <ol className="list-group list-group-numbered">
                <li className="list-group-item">
                    <strong>Selecciona una pista:</strong> Cada crucigrama tiene una lista de pistas para las palabras horizontales y verticales.
                </li>
                <li className="list-group-item">
                    <strong>Escribe la respuesta:</strong> Haz clic en las celdas del crucigrama y escribe tu respuesta letra por letra.
                </li>
                <li className="list-group-item">
                    <strong>Corrige tus errores:</strong> Puedes borrar letras o cambiar tu respuesta en cualquier momento.
                </li>
                <li className="list-group-item">
                    <strong>Utiliza pistas si te atascas:</strong> Algunos crucigramas permiten revelar letras o palabras como ayuda.
                </li>
                <li className="list-group-item">
                    <strong>Completa el crucigrama:</strong> El objetivo es llenar todas las celdas con las respuestas correctas.
                </li>
            </ol>
        </div>
    );
};

export default CrosswordInstructions;
