import React from 'react';
import styles from './SoupLetterInstructions.module.css';

const SoupLetterInstructions = () => {
    return (
        <div className="container text-left">
            <h1 className={styles.header}>¿Cómo Jugar Sopa de letras?</h1>
            <p className={styles.paragraph}>
                Sopaletras es un juego donde debes encontrar todas las palabras ocultas en un tablero lleno de letras. 
                Pon a prueba tu agudeza visual y resuelve el desafío.
            </p>
            <h2 className={styles.header}>Instrucciones</h2>
            <p className={styles.paragraph}>
                1. Observa la lista de palabras que necesitas encontrar en la sopa de letras. Están ubicadas en diferentes direcciones dentro del tablero.<br />
                2. Examina cuidadosamente cada fila, columna y diagonal en busca de las palabras de la lista.<br />
                3. Una vez que encuentres una palabra, utiliza el mouse para seleccionarla, marcándola desde la primera hasta la última letra.<br />
                4. Cuando selecciones una palabra correctamente, se marcará automáticamente en la lista y en el tablero. Continúa hasta completar todas las palabras.
            </p>
        </div>
    );
};
export default SoupLetterInstructions;