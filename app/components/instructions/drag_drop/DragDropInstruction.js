import React from 'react';

const DragDropInstructions = () => {
    return (
        <div className="container mt-5  justify-content-center">
            <div className="text-center">
                <h2>¿Cómo Jugar "Arrastra y Ordena"?</h2>
            </div>
            <ol className="list-group list-group-numbered">
                <li className="list-group-item">
                    <strong>Observa las palabras desordenadas:</strong> Revisa las palabras en la parte superior y piensa en el orden que tendría sentido para formar una oración.
                </li>
                <li className="list-group-item">
                    <strong>Arrastra las palabras al orden correcto:</strong> Usa tu conocimiento para arrastrar cada palabra a los espacios vacíos en la parte inferior y construir la oración en el orden correcto. 
                </li>
                <li className="list-group-item">
                    <strong>Coloca cada palabra en su posición:</strong> Suelta cada palabra en el lugar donde creas que debería ir para formar la oración.
                </li>
                <li className="list-group-item">
                    <strong>Verifica o corrige tu orden:</strong> Una vez que hayas completado la oración, el juego verificará si el orden es correcto. Si es así, recibirás una felicitación; si no, podrás intentarlo de nuevo.
                </li>
                <p>¡Diviértete y ve cuántos intentos necesitas para ordenar la oración correctamente!</p>
            </ol>
        </div>
    );
};

export default DragDropInstructions;