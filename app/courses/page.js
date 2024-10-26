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
          <img src="/img/humu/humu-happy.png" alt="Humu Happy" height={400} className={`${styles.imgFloat}`} />
        </div>
      </div>
      <div className="container w-100 text-center">
        <div className="row d-flex justify-content-center">
          <a href="/achievements" className="text-decoration-none col-3" onClick={(e) => playClickSound(e, "/achievements")}>
            <div className="card-body">
              <img src="/img/iconography/achievements.png" alt="Icono de logros" height={125} className='hover-div rounded-circle' />
              <h5 className="card-title">Logros</h5>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}