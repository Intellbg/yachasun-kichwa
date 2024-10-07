'use client';
import React, { useEffect, useRef, useState } from 'react';
import activities from "./data";
import Navbar from "../../components/Navbar";
import LectureCard from "@/app/components/lecture_card/LectureCard";
import { useAuthStore } from '@/providers/auth-store-provider.js';
import styles from '../animation.module.css';

export default function Lectures() {
  const { level } = useAuthStore((state) => state);
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(false); // Estado para la animación de carga

  // Precargar el audio al cargar el componente
  useEffect(() => {
    audioRef.current = new Audio('/sounds/selectMainMenu.mp3');
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Función para reproducir el sonido y mostrar la animación de carga
  const playClickSound = (event, href) => {
    event.preventDefault(); // Prevenir la navegación instantánea
    setLoading(true); // Mostrar la animación de carga

    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reiniciar el audio
      audioRef.current.play().then(() => {
        audioRef.current.onended = () => {
          setLoading(false); // Ocultar la animación de carga
          if (href) {
            window.location.href = href; // Navegar a la nueva página cuando el audio termine
          }
        };
      }).catch((error) => {
        console.error("Error al reproducir el audio: ", error);
        setLoading(false); // Ocultar la animación si hay un error
        if (href) {
          window.location.href = href; // Navegar sin esperar si hay un error
        }
      });
    } else {
      setLoading(false);
      if (href) {
        window.location.href = href;
      }
    }
  };

  // Agregar el evento de clic a los elementos que pueden navegar
  useEffect(() => {
    const clickableElements = document.querySelectorAll('a, button, .lecture-card');

    if (clickableElements.length > 0) {
      clickableElements.forEach((element) => {
        element.addEventListener('click', (e) => {
          const href = element.tagName === 'A' ? element.href : null;
          playClickSound(e, href);
        });
      });

      return () => {
        clickableElements.forEach((element) => {
          element.removeEventListener('click', playClickSound);
        });
      };
    }
  }, []);
  return (
    <>
      <Navbar />      
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Cargando...</p>
        </div>
      )}

      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row">
          <div className="col overflow-column">
            {activities.map(element => (
              <LectureCard key={element.name} data={element} currentScore={level} className="lecture-card" />
            ))}
          </div>
          <div className="col">
            <img src="/img/humu/humu-happy.png" alt="Humu Happy" height={400} className={`${styles.imgFloat}`} />
          </div>
        </div>
      </div>
    </>
  );
}
