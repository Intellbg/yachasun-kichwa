"use client";
export default function Navbar() {
    return (
        <nav className={`bg-primary-custom navbar navbar-expand-lg fixed-top px-3`}>
            <a className="navbar-brand" href="/">
                <div className='d-flex align-items-center'>
                    <img src='/img/logo.png' className='d-block logo h-100' alt='Yachasum Kichwa Logo'></img>
                    <div className='d-flex flex-column text-center'>
                        <h1 className={`text-white h4 mb-0`}>Yachasum</h1>
                        <h2 className={`text-white h5`}>Kichwa</h2>
                    </div>
                </div>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                    </li>
                    <a className="dropdown-item mx-1" href="/register">Crear Cuenta</a>
                    <li className="nav-item">
                        <a className="dropdown-item mx-1" href="/login">Iniciar Sesión</a>
                    </li>
                </ul>
            </div>
        </nav >
    );
}