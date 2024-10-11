"use client";

import React, { useEffect, useRef, useState } from 'react';
import CourseCard from "../components/course_card/CourseCard";
import Navbar from "../components/Navbar";
import { courses } from './data.js';
import { useAuthStore } from '@/providers/auth-store-provider.js';
import { useRouter } from 'next/navigation';
import styles from './animation.module.css';

export default function Courses() {
  const { level } = useAuthStore((state) => state);
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    audioRef.current = new Audio('/sounds/selectMainMenu.mp3');
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const playClickSound = (event, href) => {
    event.preventDefault();
    setLoading(true); 
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {        
        audioRef.current.onended = () => {          
          if (href) {
            router.push(href); 
          }
        };
      }).catch((error) => {
        console.error("Error al reproducir el audio: ", error);
        setLoading(false); 
        if (href) {
          router.push(href);
        }
      });
    } else {
      setLoading(false);
      if (href) {
        router.push(href);
      }
    }
  };
 
  useEffect(() => {
    const clickableElements = document.querySelectorAll('a, button, .course-card');

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
          <div className={styles.spinnerContainer}>
            <img src="/img/humu/humu-fuckup.png" alt="Loading" className={styles.spinnerImage} />
            <p className={styles.loadingText}>CARGANDO...</p>
            <p className={styles.funFact}>Hay más personas estudiando irlandés en Duolingo que irlandeses nativos que lo hablan.</p>
          </div>
        </div>
      )}
      <div className="container d-flex justify-content-center align-items-center h-75">
        <div className="row">
          <div className="col">
            {courses.map((item) => (
              <CourseCard key={item.title} data={item} currentScore={level} className="course-card" />
            ))}
          </div>
        </div>
        <div className="col">
          <img src="/img/humu/humu-happy.png" alt="Humu Happy" height={400} className={`${styles.imgFloat}`}/>
        </div>
      </div>
      <div className="container w-100 text-center">
        <div className="row d-flex justify-content-center">
          <a href="/achievements" className="text-decoration-none col-3" onClick={(e) => playClickSound(e, "/achievements")}>
            <div className="card hover-div w-100">
              <div className="d-flex flex-column">
                <div className="card-body">
                  <h1 className="display-1">
                  <img src="/img/iconography/achievements.png" alt="Icono de logros" height={200} />                    
                  </h1>
                  <h5 className="card-title">Logros</h5>
                  <p className="card-text">Revisa tus insignias</p>
                </div>
              </div>
            </div>
          </a>
          <a href="/games" className="text-decoration-none col-3" onClick={(e) => playClickSound(e, "/games")}>
            <div className="card hover-div w-100">
              <div className="d-flex flex-column">
                <div className="card-body">
                  <h1 className="display-1">
                    <img src="/img/iconography/games.png" alt="Icono de logros" height={200} />                      
                  </h1>
                  <h5 className="card-title">Juegos</h5>
                  <p className="card-text">Practica tus habilidades</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}