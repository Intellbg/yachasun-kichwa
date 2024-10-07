"use client"; 

import { useState } from 'react';
import Navbar from "../components/Navbar"
import styles from './Logros.module.css'; 

export default function Logros() {
    const [currentCard, setCurrentCard] = useState(null); 
    const cards = [
        {
            cod: "APSCU001",
            titulo: "Nivel 1",
            imgSrc: "/img/logro1.png",
            progress: 100,
            points: "2025/2025"
        },
        {
            cod: "APSCU002",
            titulo: "Nivel 2",
            imgSrc: "/img/logro2.png",
            progress: 0,
            points: "0/1150"
        },
        {
            cod: "APSCU003",
            titulo: "Nivel 3",
            imgSrc: "/img/logro3.png",
            progress: 0,
            points: "0/1150"
        },
        {
            cod: "APSCU004",
            titulo: "Nivel 4",
            imgSrc: "/img/logro4.png",
            progress: 0,
            points: "0/1150"
        },
        {
            cod: "APSCU005",
            titulo: "Nivel 5",
            imgSrc: "/img/logro5.png",
            progress: 0,
            points: "0/1150"
        }        
    ];

    const handleCardClick = (index, progress) => {       
        if (progress === 100) { 
            const audio = new Audio('/sounds/pop-sound-effect.mp3'); 
            audio.play();           
            if (currentCard === index) {
                setCurrentCard(null); 
            } else {
                setCurrentCard(index); 
            }
        }
    };

    return (
        <>
        <Navbar />
        <div className="container-fluid p-0">
            <main className="container my-5">
                <section className="text-start mb-5">
                    <h1 className="text-success">Logros</h1>
                </section>
                <div className="row">
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <img src="/img/Humu.jpeg" alt="Humu" className={`${styles.imgFloat} img-fluid`} /> {}
                    </div>
                    <div className="col-md-8">
                        <section className="text mb-5">
                            <h2 className="text-success">Niveles <span>{cards.length}/{cards.length}</span></h2>
                            <div className="logros-container">
                                {cards.map((card, index) => (
                                    <div key={index}>
                                        <div 
                                        className={`${styles.card} ${currentCard === index ? styles.selected : ''}`} 
                                        onClick={() => handleCardClick(index, card.progress)} 
                                        style={{ cursor: card.progress === 100 ? 'pointer' : 'not-allowed' }}
                                        >
                                            <div className={styles.cardInfo}>
                                                <div className={styles.title}>
                                                    {card.titulo}
                                                </div>
                                                <div className={styles.progress}>
                                                    {`${card.progress}%`}
                                                </div>
                                                <div className={styles.pointsAndTrophies}>
                                                    <span>{card.points}</span>
                                                    {card.progress === 100 && <span className={styles.trofeos}>🏆</span>}
                                                    </div>
                                                </div>
                                                <img src={card.imgSrc} alt={`Juego ${index + 1}`} className={styles.img} />
                                            </div>
                                            {currentCard === index && card.progress === 100 && (
                                                <div className={`${styles.cardDetail} text-center`}>
                                                    <h3>Detalles del Logro</h3>
                                                    <p><strong>COD:</strong> {card.cod}</p>
                                                    <p><strong>Puntos:</strong> {card.points}</p>
                                                    <p><strong>Progreso:</strong> {card.progress}%</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
            </>
        );
    }








