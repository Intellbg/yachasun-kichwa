"use client"; 

import { useState } from 'react';
import Navbar from "../components/Navbar";
import styles from './Logros.module.css'; 
import { Modal, Button } from 'react-bootstrap';

export default function Logros() {
    const [currentCard, setCurrentCard] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const [currentLevel, setCurrentLevel] = useState(2); 

    const cards = [
        {
            titulo: "Primeros pasos",
            detalle: "Primer modulo completado del nivel basico",
            significado: "La anaconda",            
            imgSrc: "/img/achievements/anaconda.png",
            descripcion: "El diseño de la anaconda representa la energía vital de la creación. Es llevado por los yachak en eventos ceremoniales y culturales de la comunidad.",            
            unlockLevel: 1,  
        },
        {
            titulo: "Aprendiendo poco a poco",
            detalle: "Estas en la mitad del nivel basico",
            significado: "Lumu tarpuna",            
            imgSrc: "/img/achievements/lumu-tarpuna.png",
            descripcion: "Este diseño representa la siembra de la yuca que la mujer realiza en su huerta. Es de uso exclusivo de la mujer.",            
            unlockLevel: 2,  
        },
        {
            titulo: "Sabemos lo basico",
            detalle: "Terminaste el nivel basico",
            significado: "Kuyllur y Duziru",            
            imgSrc: "/img/achievements/Kuyllur_Duziru.png",
            descripcion: "Este diseño representa el poder, la fuerza, la valentía y la sabiduría. Esta figura se utiliza cuando una persona va a la guerra, a la cacería, o participa en los rituales y ceremonias.",            
            unlockLevel: 3,
        },
        {
            titulo: "Vamos por el siguiente nivel",
            detalle: "Primer modulo completado del nivel intermedio",
            significado: "Amazanka",            
            imgSrc: "/img/achievements/Amazanka.png",
            descripcion: "Este diseño es usado por los/as niños/as, para recibir el poder, el conocimiento y la inteligencia del Amazanka, a fin de resistir las caminatas por la selva, por donde ha caminado el Amazanka",            
            unlockLevel: 4,
        },
        {
            titulo: "Ya queremos hablar y escribir",
            detalle: "Estas en la mitad del nivel intermedio",
            significado: "Anka, ñanpi y yawati",            
            imgSrc: "/img/achievements/Anka_Nanpi_Yawati.png",
            descripcion: "El diseño de aves y animales son representadas en el rostro de las personas para adquirir sus poderes y destrezas en la cotidianidad.",            
            unlockLevel: 5,
        },
        {
            titulo: "Sabemos Kichwa",
            detalle: "Terminaste el nivel intermedio",
            significado: "Charapa",            
            imgSrc: "/img/achievements/Charapa.png",
            descripcion: "Es de uso exclusivo del varón. Se diseñan en ocasiones de singular importancia comunitaria, dirigidas a la solución de los problemas.",            
            unlockLevel: 6,
        }
    ];

    const handleCardClick = (index, unlockLevel) => {
        if (currentLevel >= unlockLevel) { // Desbloquea si el nivel actual es mayor o igual al unlockLevel
            const audio = new Audio('/sounds/pop-sound-effect.mp3'); 
            audio.play();           
            if (currentCard === index) {
                setCurrentCard(null); 
            } else {
                setCurrentCard(index); 
                setShowModal(true); // Mostrar modal al hacer clic en la tarjeta
            }
        }
    };

    const handleCloseModal = () => setShowModal(false);

    // Función para avanzar el nivel (esto se puede integrar con la lógica de avance del usuario)
    const handleAdvanceLevel = () => {
        if (currentLevel < 6) {
            setCurrentLevel(prevLevel => prevLevel + 1);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid p-0">
                <main className="container my-5">
                    <section className="text-start mb-5">
                        <h2 className="text-success">Logros obtenidos</h2>
                    </section>
                    <div className="row">
                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                            <img src="/img/Humu.jpeg" alt="Humu" className={`${styles.imgFloat} img-fluid`} />
                        </div>
                        <div className="col-md-8">
                            <section className="text mb-5">
                                <div className="logros-container">
                                    {cards.map((card, index) => (
                                        <div key={index}>
                                            <div
                                                className={`${styles.card} ${currentCard === index ? styles.selected : ''} w-100`} 
                                                onClick={() => handleCardClick(index, card.unlockLevel)}
                                                style={{
                                                    cursor: currentLevel >= card.unlockLevel ? 'pointer' : 'not-allowed', 
                                                    opacity: currentLevel >= card.unlockLevel ? 1 : 0.5 // Cambia la opacidad si no está desbloqueada
                                                }}
                                            >
                                                <div className="d-flex align-items-center justify-content-between w-100">
                                                    <div className={`mx-3 ${styles.cardInfo}`}>
                                                        <div className={styles.title}>
                                                            {card.titulo}
                                                        </div>
                                                        <div className={styles.progress}>
                                                            {card.detalle}
                                                        </div>
                                                    </div>
                                                    <div className={`pointsAndTrophies text-end ${styles.pointsAndTrophies}`}>
                                                        {currentLevel >= card.unlockLevel && <span className={styles.trofeos}>🏆</span>}
                                                    </div>
                                                </div>
                                            </div>                                        
                                        </div>
                                    ))}
                                </div>                                
                            </section>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal para mostrar la información de la tarjeta */}
            {currentCard !== null && (
                <Modal 
                    show={showModal} 
                    onHide={handleCloseModal} 
                    centered 
                    size="lg" 
                    className={styles.cardModal}
                >
                    <Modal.Header closeButton className={styles.cardModalHeader}>
                        <Modal.Title>{cards[currentCard].titulo}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.cardModalBody}>
                        <h3><strong>Insignia conseguida</strong></h3>
                        <img src={cards[currentCard].imgSrc} alt={cards[currentCard].titulo} className={`${styles.img} img-fluid`} />
                        <p><strong>{cards[currentCard].significado}</strong></p>
                        <p>{cards[currentCard].descripcion}</p>
                    </Modal.Body>                    
                </Modal>
            )}
        </>
    );
}



