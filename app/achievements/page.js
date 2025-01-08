"use client";

import { useState } from 'react';
import Navbar from "../components/Navbar";
import styles from './achievements.module.css';
import { Modal } from 'react-bootstrap';
import { cards } from './data'
import BackButton from "@/app/components/BackButton";
import { useAuthStore } from '@/providers/auth-store-provider.js'
import Helper from '../components/helper/Helper';
import animation from '@/app/animation.module.css';
import AchievementsInstructions from '../components/instructions/achievements/AchievementsInstructions';

export default function Logros() {
    const { level } = useAuthStore(
        (state) => state,
    )
    const [currentCard, setCurrentCard] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (index, unlockLevel) => {
        if (level >= unlockLevel) {
            const audio = new Audio('/sounds/pop-sound-effect.mp3');
            audio.play();
            if (currentCard === index) {
                setCurrentCard(null);
            } else {
                setCurrentCard(index);
                setShowModal(true);
            }
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Navbar />
            <div className="container-fluid p-0">
                <main className="container my-1 p-0">
                    <section className="text-start mb-2">
                        <h2 className={`${styles.titleAchievements} text-center display-3`}>Logros obtenidos</h2>
                    </section>                    
                    <div className="overflow-auto d-flex justify-content-center align-items-center" style={{ width: "200px", maxWidth: "300px", margin: "0 auto", height: "200px" }} >
                            <Helper imageSrc={"/img/humu/humu-happy.png"} className={`humu-mascot me-4 ${animation.spinnerImage} `} h={200} style={{}}>
                                <AchievementsInstructions />                                
                            </Helper>
                        </div>
                        <div className="overflow" style={{ maxHeight: "70%", maxWidth: "100%"}}>
                            <div className="row">
                                {cards.map((card, index) => (
                                    <div
                                        className={`col-4 p-1`}
                                        onClick={() => handleCardClick(index, card.unlockLevel)}
                                        key={index}
                                        style={{
                                            cursor: level >= card.unlockLevel ? 'pointer' : 'not-allowed',
                                            opacity: level >= card.unlockLevel ? 1 : 0.25
                                        }}
                                    >
                                        <img src={card.Banner} className={`${styles.imgbanner}`} />
                                        <p className={`${styles.titlebanner} text-center`}>{card.titulobanner}</p>
                                        <div
                                            className={`${styles.card} ${currentCard === index ? styles.selected : ''} d-flex align-items-center justify-content-between py-5 px-2`}
                                        >
                                            <div className={`mx-3 ${styles.cardInfo}`}>                                                
                                                <div className={styles.title}>
                                                    {card.titulo}
                                                </div>
                                                <div className={styles.progress}>
                                                    {card.detalle}
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    
                </main>
                <div className="d-flex justify-content-center align-items-center">
                    <BackButton href='/courses'></BackButton>
                </div>
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



