'use client'
import React, { useEffect, useRef, useState } from 'react';
import activities from "./data";
import Navbar from "../../components/Navbar"
import CardCarousel from "@/app/components/CardCarousel";
import BackButton from "@/app/components/BackButton";
import { useAuthStore } from '@/providers/auth-store-provider.js';
import { useRouter } from 'next/navigation';
import styles from '../animation.module.css';

export default function Lectures() {
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
          <div className={styles.spinnerContainer}>
            <img src="/img/humu/humu-fuckup.png" alt="Loading" className={styles.spinnerImage} />
            <p className={styles.loadingText}>CARGANDO...</p>
            <p className={styles.funFact}>Hay más personas estudiando irlandés en Duolingo que irlandeses nativos que lo hablan.</p>
          </div>
        </div>
      )}
      <h1 className='text-center m-2 p-5'>Curso Intermedio</h1>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row" style={{ minHeight: "500px" }}>
          <div className="col-md-8">
            <CardCarousel data={activities} level={level} />
          </div>
          <div className="col-md-4">
            <img src="/img/humu/humu-happy.png" alt="Humu Happy" className={`${styles.imgFloat} w-100`} />
          </div>
        </div>
      </div >
      <div className="d-flex justify-content-center align-items-center">
        <BackButton></BackButton>
      </div>
    </>
  );
}
