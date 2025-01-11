import React from 'react';
import styles from './CompleteSentenceInstructions.module.css';

const CompleteSentenceInstructions = () => {
    return (
        <div className="container">
            <h1 className={styles.header}>¿Cómo Jugar Completa la oración?</h1>
            <p className={styles.paragraph}>
            Completa la Oración es un juego interactivo donde debes elegir la palabra correcta para completar una oración. Lee atentamente la oración con el espacio vacío, revisa las opciones disponibles, y arrastra la palabra que creas correcta al lugar indicado. Si aciertas, recibirás una felicitación; si no, podrás intentarlo nuevamente.<br /> 
            ¡Pon a prueba tu gramatica y diviértete aprendiendo!
            </p>         
            <h2 className={styles.header}>Instrucciones</h2>
            <p className={styles.paragraph}>
                <strong>1. Lee atentamente la oración:</strong> Observa el espacio vacío marcado con una línea (&quot;____&quot;) en la oración.<br />
                <strong>2. Revisa las opciones de palabras:</strong> En la parte inferior de la pantalla encontrarás varias palabras como posibles respuestas.<br />
                <strong>3. Arrastra y coloca tu respuesta:</strong> Selecciona la palabra que creas correcta, haz clic y arrástrala hasta el espacio vacío en la oración, luego suéltala en su lugar.<br />
                <strong>4. Verifica y ajusta si es necesario:</strong> Si has elegido correctamente, recibirás un mensaje de felicitación. Si no, intenta con otra palabra.
            </p>
        </div>  
        
    );
};

export default CompleteSentenceInstructions;