"use client"
import SlideInItem from "./components/slide-in/SlideInItem";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuthStore } from '@/providers/auth-store-provider.js';

export default function Home() {
  const { username } = useAuthStore((state) => state);

  return (
    <>
      <Navbar />
      <main>
        <div className="hero position-relative">
          <img src="/img/cover/2.jpg" className='w-100 img-fluid cover' alt='Cotopaxi Cover photo'></img>
          <div className='w-100 text-center position-absolute bottom-0 start-50 translate-middle '>
            <h1 className="bg-semi-transparent py-2">¡La forma más divertida, efectiva y gratis de aprender Kichwa!</h1>
          </div>
        </div>
        <div className='container'>
          <div className='row h-100'>
            <SlideInItem direction="left" className="col-lg-6 col-sm-12">
              <img src="/img/dancing-huma-devil.gif" className='img-fluid' alt='Inti Raymi Cover photo'></img>
            </SlideInItem>
            {!username ?
              <SlideInItem direction="left" className="col-lg-6 col-sm-12">
                <div className='h-100 text-center d-flex flex-column justify-content-center'>
                  <h2>Descubre un nuevo mundo</h2>
                  <p>Nuestra aplicación está diseñada para hacer que el aprendizaje de Kichwa sea divertido, atractivo y efectivo.</p>
                  <p>Ya seas principiante o estés buscando perfeccionar tus habilidades.Yachasun Kichwa ofrece una experiencia adaptada a tus necesidades.</p>
                  <a className='btn btn-success w-25 my-2 mx-auto' href="/signup">Crear una cuenta</a>
                  <span>o</span>
                  <a className='btn btn-warning w-25 my-2 mx-auto' href="/login">Iniciar Sesión</a>
                </div>
              </SlideInItem>
              : <SlideInItem direction="left" className="col">
                <div className="h-100 text-center d-flex flex-column justify-content-center align-items-center">
                  <h2 className="mb-3">Descubre un nuevo mundo</h2>
                  <p className="lead mb-4">Accede al curso</p>
                  <a
                    className="btn btn-success px-4 py-2 text-white fw-bold"
                    href="/courses"
                    role="button"
                    aria-label="Accede al curso"
                  >
                    Curso
                  </a>
                </div>
              </SlideInItem>

            }
          </div>
        </div>
        <div className="hero position-relative">
          <SlideInItem direction="bottom" className="col h-100">
            <img src="/img/cover/1.avif" className='w-100 img-fluid cover' alt='Chimborazo Cover photo'></img>
            <div className='w-100 text-center position-absolute bottom-0 start-50 translate-middle '>
              <h1 className="bg-semi-transparent py-2">Yachasun Kichwa Guaguas</h1>
            </div>
          </SlideInItem >
        </div>
        <div className='container'>
          <div className='row py-5'>
            <SlideInItem direction="right" className="col-lg-6 col-sm-12 d-flex flex-column align-self-center text-center">
              <h2>
                ¡Para Pequeños Aventureros del Idioma!
              </h2>
              <p>
                ¡Descubre el emocionante mundo de los idiomas con Yachasun Kichwa Guaguas!
                Nuestra aplicación está diseñada especialmente para niños, haciéndoles aprender jugando y explorando,
                cada lección es una aventura llena de diversión y sorpresas.
              </p>
              <h3>
                ¡Descarga Yachasun Kichwa Guaguas!
              </h3>
              <h4>
                ¡Ya disponible en iOS y Android!
              </h4>
              <div className="text-center mt-5">
                <a href="https://apps.apple.com" className="btn btn-primary btn-lg mx-2" role="button">
                  <i className="fab fa-apple"></i>Apple Store
                </a>
                <a href="https://play.google.com" className="btn btn-success btn-lg mx-2" role="button">
                  <i className="fab fa-android"></i>Google Play
                </a>
                <p>
                  Empieza tu viaje de aprendizaje hoy mismo.
                </p>
              </div>
            </SlideInItem>
            <SlideInItem direction="right" className="col h-100 text-center ">
              <img src="/img/andes_kids.jpg"  alt='Andes kids'></img>
            </SlideInItem>
          </div>
        </div>
        <div className="hero position-relative">
          <SlideInItem direction="bottom" className="col h-100">
            <img src="/img/cover/3.jpg" className='w-100 img-fluid cover' alt='Andes Cover photo'></img>
          </SlideInItem >
        </div>
        <div className='container'>
          <div className='row h-100 py-5'>
            <SlideInItem direction="left" className="col h-100 text-center">
              <img src="/img/epn_fis_logo.png" className='img-fluid w-100' alt='EPN FIS Logo'></img>
            </SlideInItem>
            <SlideInItem direction="left" className="col h-100">
              <div className='h-100 d-flex flex-column align-self-center'>
                <h2>Yachasun Kichwa</h2>
                <p>Es un trabajo de integración curricular de la Escuela Politécnica Nacional del Ecuador
                  de la Facultad de Sistemas para la obtención del título de Ingeniería en Software para el periodo 2024-B.
                </p>
                <p>
                  <strong>Dirigido por:</strong> Boris Astudillo
                </p>
                <p>
                  <strong>Integrantes:</strong>
                </p>
                <ul>
                  <li>Nicolás Burbano</li>
                  <li>Santiago León</li>
                  <li>Milton Heras</li>
                  <li>Fausto Roman</li>
                </ul>
              </div>
            </SlideInItem>
          </div>
        </div>
      </main >
      <Footer />
    </>
  );
}
