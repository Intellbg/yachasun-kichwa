"use client";

import React, { useState, useEffect } from 'react';
import CourseCard from "../components/course_card/CourseCard";
import Navbar from "../components/Navbar";
import Helper from "../components/helper/Helper.js";
import { courses } from './data.js';
import { useAuthStore } from '@/providers/auth-store-provider.js';
import styles from '@/app/animation.module.css';

export default function Courses() {
  const { level } = useAuthStore((state) => state);
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState(1)

  const nextStep = () => {
    setStep((prev) => (prev >= 3 ? 1 : prev + 1));
  };

  useEffect(() => {
    setOpenModal(level)
  }, []);


  const getImageByStep = () => {
    switch ((step % 3) + 1) {
      case 1:
        return <img
          src='/img/humu/humu-talking.png'
          alt="Humu"
          height={150}
          className={`${styles.imgFloat} me-4`}
        />;
      case 2:
        return <img
          src='/img/humu/humu-happy.png'
          alt="Humu"
          height={150}
          className={`${styles.spinnerImage} me-4`}
        />;
      case 3:
        return <img
          src='/img/humu/humu-talking.png'
          className={`${styles.imgFloat} me-4`}
          alt="Humu"
          height={150}
        />;
    }
  };



  return (
    <>
      <div className='d-flex flex-column justify-content-center align-items-center h-100'>
        <Navbar />

        <h1 className={`${styles.titleAchievements} text-center`}>Cursos</h1>
        <div className="container d-flex justify-content-center align-items-center" >
          <div className="row">
            <div className="col">
              {courses.map((item) => (
                <CourseCard key={item.title} data={item} currentScore={level} className="course-card" />
              ))}
            </div>
          </div>
          <div className="col pe-auto">
            <Helper imageSrc={"/img/humu/humu-happy.png"} className={`${styles.imgFloat}`} h={400} style={{}} isOpen={openModal}>
              <div className='container'>
                <h2 className='text-center'>!IMANALLA! 👋</h2>
                <div className=' d-flex align-items-center text-start'>
                  {getImageByStep(step)}
                  <div>
                    {step === 1 && (
                      <>
                        <p className="lead fs-3">
                          ¡Hola! Soy <strong>Humu</strong>, tu amigo emocionado de acompañarte
                          en este curso para aprender Kichwa. ¡Espero que disfrutes cada momento!
                        </p>
                        <p className='lead fs-3'>
                            Siempre que necesites ayuda puedes dar click sobre mi imagen y yo estaré listo para ayudar
                        </p>
                      </>
                    )}
                    {step === 2 && (
                      <p className="lead fs-4">
                        Aquí podrás <strong>seleccionar el curso</strong> que deseas tomar.
                        Los <span className="unlocked">cursos desbloqueados</span> tienen fondo
                        blanco, mientras que los <span className="locked">bloqueados</span> tienen fondo gris.
                        Debes completar cada curso para avanzar.
                      </p>
                    )}
                    {step === 3 && (
                      <p className="lead fs-4">
                        En la parte inferior encontrarás un <strong>icono de trofeo 🏆</strong>.
                        Haz clic en él para ver los logros obtenidos durante tu estudio.
                        ¡Estoy seguro de que alcanzarás muchos logros!
                      </p>
                    )}
                  </div>
                </div>
                <div className='d-flex justify-content-center'>

                  <button className="btn bg-primary-custom ma-auto btn-lg" onClick={nextStep}>
                    Continuar
                  </button>
                </div>
              </div>

            </Helper>
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
      </div>
    </>
  );
}