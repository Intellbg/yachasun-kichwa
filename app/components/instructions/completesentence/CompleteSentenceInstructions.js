import React from 'react';

const CompleteSentenceInstructions = () => {
    return (
        <div className="container mt-5  justify-content-center">
            <div className="text-center">
                <h2>¿Cómo Jugar "Completa la oración"?</h2>
            </div>
            <ol className="list-group list-group-numbered">
                <li className="list-group-item">
                    <strong>Lee atentamente la oración:</strong> Observa el espacio vacío marcado con una línea ("____") en la oración.
                </li>
                <li className="list-group-item">
                    <strong>Revisa las opciones de palabras:</strong> En la parte inferior de la pantalla encontrarás varias palabras como posibles respuestas. 
                </li>
                <li className="list-group-item">
                    <strong>Arrastra y coloca tu respuesta:</strong> Selecciona la palabra que creas correcta, haz clic y arrástrala hasta el espacio vacío en la oración, luego suéltala en su lugar.
                </li>
                <li className="list-group-item">
                    <strong>Verifica y ajusta si es necesario:</strong> Si has elegido correctamente, recibirás un mensaje de felicitación. Si no, intenta con otra palabra.                    
                </li>
                <p className="text-center mt-3">¡Buena suerte y disfruta completando las oraciones!</p>
            </ol>
        </div>
    );
};

export default CompleteSentenceInstructions;