import React from 'react';
import styles from './WordleInstructions.module.css';

const WordleInstructions = () => {
    return (
        <div className="container">
            <h1 className={styles.header}>Cómo Jugar Wordle</h1>
            <p className={styles.paragraph}>
                Palabrando es un juego donde tienes que adivinar una palabra de en 6 intentos o menos.
                Cada vez que adivines, las letras cambiarán de color para mostrar qué tan cerca estás de acertar.
            </p>

            <h2 className={styles.header}>Colores de las Letras</h2>

            <div className="d-flex justify-content-center">
                <div className={`${styles.letter} ${styles.correct}`}>C</div>
                <div className={styles.letter}>A</div>
                <div className={`${styles.letter} ${styles.present}`}>R</div>
                <div className={styles.letter}>T</div>
                <div className={`${styles.letter} ${styles.absent}`}>O</div>
            </div>

            <p className={styles.paragraph}>
                <span className={`${styles.letter} ${styles.correct}`}>C</span> - La letra está en la palabra y en la posición correcta.<br />
                <span className={`${styles.letter} ${styles.present}`}>R</span> - La letra está en la palabra, pero en la posición incorrecta.<br />
                <span className={`${styles.letter} ${styles.absent}`}>O</span> - La letra no está en la palabra.
            </p>

            <h2 className={styles.header}>Instrucciones</h2>
            <p className={styles.paragraph}>
                1. Escribe una palabra.<br />
                2. Una vez llena se evaluará.<br />
                3. Mira los colores de las letras para obtener pistas.<br />
                4. ¡Sigue intentando hasta que adivines la palabra o se te acaben los intentos!
            </p>
        </div>
    );
};

export default WordleInstructions;
