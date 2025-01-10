import React from 'react';
import styles from './DragDropInstructions.module.css';

const DragDropInstructions = () => {
    return (
        <div className="container">
            <h1 className={styles.header}>¿Cómo Jugar Arrastra y Ordena?</h1>
            <p className={styles.paragraph}>
            Arrastra y Ordena es un juego interactivo donde debes organizar palabras desordenadas para formar oraciones completas. 
            Usa tu conocimiento para arrastrar y soltar cada palabra en el orden correcto. Una vez que completes la oración, el juego verificará si está bien formada y te permitirá corregirla si es necesario.<br /> 
            ¡Pon a prueba tu lógica y diviértete construyendo oraciones!
            </p>         
            <h2 className={styles.header}>Instrucciones</h2>
            <p className={styles.paragraph}>
                <strong>1. Observa las palabras desordenadas:</strong> Revisa las palabras en la parte superior y piensa en el orden que tendría sentido para formar una oración.<br />
                <strong>2. Arrastra las palabras al orden correcto:</strong> Usa tu conocimiento para arrastrar cada palabra a los espacios vacíos en la parte inferior y construir la oración en el orden correcto. <br />
                <strong>3. Coloca cada palabra en su posición:</strong> Suelta cada palabra en el lugar donde creas que debería ir para formar la oración.<br />
                <strong>4. Verifica o corrige tu orden:</strong> Una vez que hayas completado la oración, el juego verificará si el orden es correcto. Si es así, recibirás una felicitación; si no, podrás intentarlo de nuevo.
            </p>
        </div>        
    );
};

export default DragDropInstructions;