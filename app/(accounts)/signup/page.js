'use client'
import bg from '@/public/img/backgrounds/cloth.webp'
import "./styles.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AUTH_ENDPOINT } from '@/constants';
import { useState } from 'react';
import { useAuthStore } from '@/providers/auth-store-provider.js'
import { useRouter } from 'next/navigation'


const UserSchema = yup.object().shape({
    name: yup.string()
        .required('Nombre es requerido')
        .matches(/^[A-Za-z\s]+$/, 'El nombre solo puede incluir letras y espacios'),
    email: yup.string()
        .required('Email requerido')
        .email('Email debe ser válido')
        .transform((value) => value.toLowerCase()),
    password: yup.string()
        .required('Contraseña requerida')
        .min(8, 'Contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/, 'Contraseña debe contener al menos una mayúscula')
        .matches(/[0-9]/, 'Contraseña debe contener al menos un número')
        .matches(/[@$!%*?&]/, 'Contraseña debe contener al menos un carácter especial @$!%*?&'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Contraseñas deben coincidir')
        .required('Por favor confirmar contraseña'),
});

function Success() {
    return (
        <div className='text-center'>
            <img src='/img/iconography/check.png' />
            <h1>!Cuenta creada exitosamente!</h1>
            <h2>Recuerda revisar tu correo para activar tu cuenta</h2>
            <a className='btn btn-success btn-lg' href='/login'>Continuar</a>
        </div>
    )
}


export default function Signup() {
    const router = useRouter()
    const { username } = useAuthStore((state) => state,)
    if (username) { router.push('/courses') }
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(UserSchema),
    });
    const [apiError, setApiError] = useState("")
    const [success, setSuccess] = useState(false)

    const onSubmit = async (data) => {
        data['device'] = 'web'
        fetch(AUTH_ENDPOINT + "signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (!res.ok) {
                return res.json().then((errorData) => {
                    if (errorData?.error?.includes("E11000")) {
                        setApiError("Correo ya utilizado");
                    } else {
                        setApiError("Error al crear cuenta");
                    }
                });
            }
            return res.json();
        }).then(() => {
            setSuccess(true);
        }).catch((error) => {
            console.error("Error:", error);
            setApiError("Ocurrió un error inesperado. Inténtalo nuevamente.");
        });
    }

    return (
        <div className="d-flex justify-content-center align-items-center h-100" style={{
            backgroundImage: `url(${bg.src})`,
            backgroundRepeat: 'no-epeat',
            backgroundSize: 'cover',
        }}>
            <div className="card p-4 shadow-lg w-50">
                {success ? Success() : (
                    <>
                        <h3 className="text-center mb-4">Crear Cuenta</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="name" placeholder="Ingresa nombre"  {...register("name")} />
                                {errors.name && <p role="alert" className='text-danger'>{errors.name?.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input type="email" className="form-control" id="email" placeholder="Ingresa correo electrónico" {...register("email")} />
                                {errors.email && <p role="alert" className='text-danger'>{errors.email?.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="password" placeholder="Ingresa contraseña" {...register("password")} />
                                <p className="text-muted small">
                                    La contraseña debe contener al menos 8 caracteres, 1 letra mayúscula, 1 número, y un carácter especial [@$!%*?&]
                                </p>
                                {errors.password && <p role="alert" className='text-danger'>{errors.password?.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirma contraseña" {...register("confirmPassword")} />
                                {errors.confirmPassword && <p role="alert" className='text-danger'>{errors.confirmPassword?.message}</p>}
                            </div>
                            {apiError && <p role="alert" className='text-danger'>{apiError}</p>}

                            <div className="d-grid mb-3">
                                <button type="submit" className="btn btn-primary bg-primary-custom">Registrar</button>
                            </div>
                        </form>
                        <div className="text-center">
                            <a href="/login" className="text-decoration-none">¿Ya tienes una cuenta? Iniciar sesión</a>
                            <br />
                            <p><a href="/" className="text-decoration-none small text-muted">Volver al inicio</a></p>
                        </div>
                    </>
                )
                }
            </div>
        </div>
    );
}
