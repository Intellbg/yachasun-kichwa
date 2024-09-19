'use client'
import { useAuthStore } from '@/providers/auth-store-provider.js'

function Menu() {
    return (
        <>
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/courses">Curso</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/login">Iniciar Sesión</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/signup">Crear cuenta</a>
            </li>
        </>
    )
}
function LoggedInMenu() {
    return (
        <>
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/courses">Cursos</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/achievements">Logros</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/logout">Salir</a>
            </li>
        </>
    )
}

export default function Navbar() {
    const { username } = useAuthStore((state) => state)
    return (
        <nav className={`bg-primary-custom navbar navbar-expand-lg fixed-top px-3 navbar-dark`}>
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
                    {
                        username !== "" ? <LoggedInMenu /> : <Menu />
                    }
                </ul>
            </div>
        </nav >
    );
}
