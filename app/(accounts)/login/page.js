'use client'
import bg from '@/public/img/backgrounds/cloth.webp'
import "../styles.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AUTH_ENDPOINT } from '@/constants';
import { useState } from 'react';
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { useRouter } from 'next/navigation'

const LoginSchema = yup.object().shape({
    email: yup.string().required('Email requerido'),
    password: yup.string().required('Contraseña requerida')
});

export default function Login() {
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema),
    });
    const { username, setAuth } = useAuthStore(
        (state) => state,
    )
    const [apiError, setApiError] = useState("")
    const onSubmit = async (data) => {
        const res = await fetch(AUTH_ENDPOINT + "login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        if (!res.ok) {
            await res.json().then((data) => {
                if (data['message'] == 'Unverified') {
                    setApiError("Correo no verificado")
                } else {
                    setApiError("Error al autenticar")
                }
            });
            return
        }
        const info = await res.json()
        setAuth(info)
        router.push('/courses')
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-100" style={{
            backgroundImage: `url(${bg.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}>
            <div className="card p-4 shadow-lg w-50">
                <h3 className="text-center mb-4">Iniciar Sesión</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name='email' placeholder="Ingresa email" {...register("email")} />
                        {errors.email && <p role="alert" className='text-danger'>{errors.email?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" name='password' placeholder="Ingresa contraseña" {...register("password")} />
                        {errors.password && <p role="alert" className='text-danger'>{errors.password?.message}</p>}
                    </div>
                    <div>{apiError && <p role='alert' className='text-danger'>{apiError}</p>}</div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary bg-primary-custom" >Login</button>
                    </div>

                    <div className="text-center mt-3">
                        <p>¿Todavía no tienes cuenta? <a href='/signup' className="text-decoration-none">Regístrate Aquí</a></p>
                        <a href="/forgot-password" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
                        <p><a href="/" className="text-decoration-none small text-muted">Volver al inicio</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}