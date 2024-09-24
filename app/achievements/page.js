"use client"; // Marca este archivo como un componente del cliente

import { useState } from 'react';

export default function Achievements() {
    const [currentCard, setCurrentCard] = useState(null);
    const cards = [
        {
            cod: "APSCU001",
            area: "Pastos",
            filiacion: "Capulí",
            datacion: "1d.C- 500 d.C.",
            fuente: "Casa del Alabado. Museo de Arte Precolombino. Amuletos en el Ecuador Precolombino.",
            creditos: "Proyecto 'Artesanías de los pueblos Ancestrales en la Mitad del Mundo: Ecuador'",
            imgSrc: "/img/logro1.png",
        },
        {
            cod: "APSCU002",
            area: "Pastos",
            filiacion: "Capulí",
            datacion: "1d.C- 500 d.C.",
            fuente: "Casa del Alabado. Museo de Arte Precolombino. Amuletos en el Ecuador Precolombino.",
            creditos: "Proyecto 'Artesanías de los pueblos Ancestrales en la Mitad del Mundo: Ecuador'",
            imgSrc: "/img/logro2.png",
        },
        // Agrega más cartas según sea necesario
    ];

    const handleCardClick = (index) => {
        setCurrentCard(index);
    };

    return (
        <div className="container-fluid p-0">
            <main className="container my-5">
                <section className="text-center mb-5">
                    <h2 className="text-success">Logros</h2>
                </section>
                <section className="text-center mb-5">
                    <h2 className="text-success">Juegos <span>6/6</span></h2>
                    <div className="d-flex flex-wrap justify-content-center">
                        {cards.map((card, index) => (
                            <div key={index} className="m-2" onClick={() => handleCardClick(index)}>
                                <img src={card.imgSrc} alt={`Juego ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </section>
                {currentCard !== null && (
                    <div className="card-detail">
                        <h3>Detalles del Logro</h3>
                        <p><strong>COD:</strong> {cards[currentCard].cod}</p>
                        <p><strong>Área Cultural:</strong> {cards[currentCard].area}</p>
                        <p><strong>Filiación:</strong> {cards[currentCard].filiacion}</p>
                        <p><strong>Datación:</strong> {cards[currentCard].datacion}</p>
                        <p><strong>Fuente:</strong> {cards[currentCard].fuente}</p>
                        <p><strong>Créditos:</strong> {cards[currentCard].creditos}</p>
                    </div>
                )}
                <section className="text-center">
                    <h2 className="text-success">Examenes <span>6/6</span></h2>
                    <div className="d-flex flex-wrap justify-content-center">
                        <div className="m-2">
                            <img src="/img/logro3.png" alt="Examen 1" />
                        </div>
                        <div className="m-2">
                            <img src="/img/logro4.png" alt="Examen 2" />
                        </div>
                        <div className="m-2">
                            <img src="/img/logro5.png" alt="Examen 2" />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

