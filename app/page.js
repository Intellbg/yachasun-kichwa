import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className='hero'>
        <img src="/img/cover/1.avif" className='w-100 img-fluid cover' alt='Inti Raymi Cover photo'></img>
      </div>
      <div className='container' style={{ maxHeigh: "100px" }}>
        <div className='row'>
          <div className='col'>
            <img src="/img/dancing-huma-devil.gif" className='w-100 img-fluid cover' alt='Inti Raymi Cover photo'></img>
          </div>
          <div className='col text-center d-flex flex-column justify-content-center'>
            <h1>¡La forma más divertida, efectiva y gratis de aprender Kichwa!</h1>
            <a className='btn btn-success w-25 my-2 mx-auto' href="/register">Crear una cuenta</a>
            <a className='btn btn-warning w-25 my-2 mx-auto' href="/login">Iniciar Sesión</a>
          </div>
        </div>
      </div>
    </main>
  );
}
