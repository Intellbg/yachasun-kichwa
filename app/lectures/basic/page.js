'use client'
import React, { } from 'react';
import activities from "./data";
import Navbar from "../../components/Navbar"
import CardCarousel from "@/app/components/CardCarousel";
import BackButton from "@/app/components/BackButton";
import { useAuthStore } from '@/providers/auth-store-provider.js';
import animation from '../animation.module.css';
import Helper from "@/app/components/helper/Helper.js";

export default function Lectures() {
  const { level } = useAuthStore((state) => state);

  return (
    <>
      <Navbar />
      <h1 className={`${animation.titleAchievements} text-center p-4`}>Curso Básico</h1>
      <div className="container d-flex justify-content-center align-items-center h-75">
        <div className="row" style={{ minHeight: "500px" }}>
          <div className="col-md-8">
            <CardCarousel data={activities} level={level} course={"basic"}/>
          </div>
          <div className="col-md-4">
            <Helper imageSrc={"/img/humu/humu-happy.png"} className={`${animation.imgFloat} d-block pt-5`} h={400} style={{}}>
              <h2 className="text-center display-5">Acceso a lecciones</h2>
              <div className="modal-body d-flex align-items-center text-start">
                <img
                  src="/img/humu/humu-talking.png"
                  height={300}
                  className={`humu-mascot me-4 ${animation.spinnerImage}`}
                />
                <div>
                  <p className="lead fs-4">
                    En esta página, debes <strong>seleccionar el módulo</strong> correspondiente, usando las <strong>fechas en el carrusel</strong>.
                    Los módulos se irán desbloqueando progresivamente a medida que avances en tus lecciones.
                  </p>
                  <p className="lead fs-4">
                    Un <strong>módulo disponible</strong> se mostrará con un fondo <span className="bg-white text-dark px-2 rounded">blanco</span>.
                    Por el contrario, los módulos bloqueados permanecerán inaccesibles hasta que completes las lecciones requeridas.
                  </p>
                  <p className="lead fs-4">
                    Las <strong>lecciones también cambian de color</strong> según tu progreso:
                    <ul className="list-unstyled">
                      <li>🔒 Lecciones bloqueadas: <span className="bg-secondary text-white px-2 rounded">gris</span></li>
                      <li>✅ Lecciones superadas: <span className="bg-success text-white px-2 rounded">verde</span></li>
                      <li>⭐ Lección actual: <span className="bg-warning text-dark px-2 rounded">amarilla</span></li>
                    </ul>
                  </p>
                  <p className="lead fs-4">
                    Si alguna vez necesitas repasar conceptos anteriores, <strong>puedes volver a cualquier lección</strong> ya completada en cualquier momento.
                  </p>
                </div>
              </div>
            </Helper>
          </div>
        </div>
      </div >
      <div className="d-flex justify-content-center align-items-center">
        <BackButton></BackButton>
      </div>
    </>
  );
}
