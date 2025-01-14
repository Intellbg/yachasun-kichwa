import React from 'react';
import styles from './CrosswordInstructions.module.css';

const CrosswordInstructions = () => {
    return (
        <div className="container">
            <h1 className={styles.header}>¿Cómo Jugar Crucigrama?</h1>
            <p className={styles.paragraph}>
            Crucigrama es un juego donde debes resolver pistas para completar un tablero. Selecciona una pista, escribe la respuesta letra por letra en las celdas correspondientes, y corrige cualquier error en cualquier momento. Tu objetivo es llenar todas las celdas con las respuestas correctas para completar el crucigrama.<br />
            ¡Demuestra tus habilidades y diviértete resolviendo! 
            </p>         
            <h2 className={styles.header}>Instrucciones</h2>
            <p className={styles.paragraph}>
            1. Cada crucigrama tiene una lista de pistas para las palabras horizontales y verticales.<br />
            2. Escribe la respuesta: Haz clic en las celdas del crucigrama y escribe tu respuesta letra por letra.<br />
            3. Corrige tus errores: Puedes borrar letras o cambiar tu respuesta en cualquier momento.<br />
            4. Completa el crucigrama: El objetivo es llenar todas las celdas con las respuestas correctas.
            </p>
        </div>          
    );
};

export default CrosswordInstructions;
