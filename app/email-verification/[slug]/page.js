import bg from '../../../public/img/backgrounds/cloth2.jpg'
import { AUTH_ENDPOINT } from '@/constants';
import "./styles.css";

function Success() {
    return (
        <>
            <img src='/img/iconography/check.png' height={400} width={400} className='m-auto' alt='success icon' />
            <h1>!Cuenta verificada exitosamente!</h1>
            <h2>Ingresa con tus credenciales.</h2>
            <a className='btn btn-success btn-lg' href='/login'>Continuar</a>
        </>
    )
}

function Error() {
    return (
        <>
            <img src='/img/iconography/x.png' height={400} width={400} className='m-auto' alt='error icon' />
            <h1>Error al verificar email</h1>
            <h2>Verificar el email de confirmación.</h2>
        </>

    )
}

export default async function EmailVerification({ params }) {
    let success = false;
    const res = await fetch(AUTH_ENDPOINT + "confirmation/" + params.slug, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (res.ok) {
        success = true
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-100" style={{
            backgroundImage: `url(${bg.src})`,
            backgroundRepeat: 'no-epeat',
            backgroundSize: 'cover',
        }}>
            <div className="card p-4 shadow-lg w-50 text-center">
                {success ? Success() : Error()}
            </div>
        </div>
    );
}
