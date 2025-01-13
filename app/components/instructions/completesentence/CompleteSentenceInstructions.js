import React from 'react';
import styles from './CompleteSentenceInstructions.module.css';

const CompleteSentenceInstructions = () => {
    return (
        <div className="container">
            <h1 className={styles.header}>¿Cómo Jugar Completa la oración?</h1>
            <p className={styles.paragraph}>
            Completa la Oración es un juego interactivo donde debes elegir la palabra correcta para completar una oración. Lee atentamente la oración con el espacio vacío, revisa las opciones disponibles, y arrastra la palabra que creas correcta al lugar indicado. Si aciertas, recibirás una felicitación; si no, podrás intentarlo nuevamente.<br /> 
            ¡Pon a prueba tu gramática y diviértete aprendiendo!
            </p>         
            <h2 className={styles.header}>Instrucciones</h2>
            <p className={styles.paragraph}>
                1. Observa el espacio vacío marcado con una línea (&quot;____&quot;) en la oración.<br />
                2. En la parte inferior de la pantalla encontrarás varias palabras como posibles respuestas.<br />
                3. Selecciona la palabra que creas correcta, haz clic y arrástrala hasta el espacio vacío en la oración, luego suéltala en su lugar.<br />
                4. Si has elegido correctamente, recibirás un mensaje de felicitación. Si no, intenta con otra palabra.
            </p>
        </div>          
    );
};

export default CompleteSentenceInstructions;