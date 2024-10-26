'use client'
import bg from '@/public/img/backgrounds/cloth2.jpg'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AUTH_ENDPOINT } from '@/constants';
import { useState } from 'react';
import "../styles.css";

const ForgotPasswordSchema = yup.object().shape({
    email: yup.string().email('Email formato inválido').required('Email requerido').transform((value) => value.toLowerCase())
});

export default function ForgotPassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(ForgotPasswordSchema),
    });
    const [apiError, setApiError] = useState("")
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const onSubmit = async (data) => {
        const res = await fetch(AUTH_ENDPOINT + "forgot-password/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        if (res.ok) {
            setIsFormVisible(false);
            setFormSubmitted(true);
        } else {
            setApiError("Ocurrió un error intente nuevamente más tarde")
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-100" style={{
            backgroundImage: `url(${bg.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}>
            <div className="card p-4 shadow-lg w-50">
                <h3 className="text-center mb-4">Recuperar contraseña</h3>
                {
                    isFormVisible && !formSubmitted ? (<form onSubmit={handleSubmit(onSubmit)} id="form">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name='email' placeholder="Ingresa email" {...register("email")} />
                            {errors.email && <p role="alert" className='text-danger'>{errors.email?.message}</p>}
                        </div>
                        <div>{apiError && <p role='alert' className='text-danger'>{apiError}</p>}</div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary bg-primary-custom" >Recuperar contraseña</button>
                        </div>
                    </form>) : (
                        <div className="mb-3">
                            <h3>Si existe una cuenta con ese correo electrónico, se ha enviado un mensaje con las instrucciones para restablecer su contraseña.</h3>
                        </div>
                    )
                }
                <div className="text-center mt-3">
                    <p>¿Todavía no tienes cuenta? <a href='/signup' className="text-decoration-none">Regístrate Aquí</a></p>
                    <a href="/login" className="text-decoration-none">Ingresar</a>
                </div>
            </div>
        </div>
    );
}