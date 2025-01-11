import React from 'react';

const SoupLetterInstructions = () => {
    return (
        <div className="container mt-5  justify-content-center">
            <div className="text-center">
                <h2>¿Cómo Jugar "Sopa de letras"?</h2>
            </div>
            <ol className="list-group list-group-numbered">
                <li className="list-group-item">
                    <strong>Busca las palabras en la lista:</strong> Observa la lista de palabras que necesitas encontrar en la sopa de letras. Están ubicadas en diferentes direcciones dentro del tablero.
                </li>
                <li className="list-group-item">
                    <strong>Explora el tablero:</strong> Examina cuidadosamente cada fila, columna y diagonal en busca de las palabras de la lista.
                </li>
                <li className="list-group-item">
                    <strong>Selecciona las palabras encontradas:</strong> Una vez que encuentres una palabra, utiliza el mouse para seleccionarla, marcándola desde la primera hasta la última letra.
                </li>
                <li className="list-group-item">
                    <strong>Confirma tus hallazgos:</strong> Cuando selecciones una palabra correctamente, se marcará automáticamente en la lista y en el tablero. Continúa hasta completar todas las palabras.
                </li>
                <p>¡Diviértete buscando y encuentra todas las palabras para completar el desafío!</p>
            </ol>
        </div>
    );
};

export default SoupLetterInstructions;