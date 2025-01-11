'use client'
import bg from '@/public/img/backgrounds/cloth2.jpg'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AUTH_ENDPOINT } from '@/constants';
import { useState } from 'react';
import "../../styles.css";

const ResetPasswordSchema = yup.object().shape({
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

export default function ForgotPassword({ params }) {
    const { slug } = params;
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(ResetPasswordSchema),
    });
    const [apiError, setApiError] = useState("")
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const onSubmit = async (data) => {
        const res = await fetch(AUTH_ENDPOINT + "reset-password/" + slug, {
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
                {
                    isFormVisible && !formSubmitted ? (<form onSubmit={handleSubmit(onSubmit)} id="form">
                        <h3 className="text-center mb-4">Restablecer contraseña</h3>
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
                        {apiError && <div><p role='alert' className='text-danger'>{apiError}</p></div>}
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary bg-primary-custom" >Restablecer contraseña</button>
                        </div>
                    </form>) : (
                        <div className="mb-3">
                            <h3>Contraseña re establecida</h3>
                            <a href="/login" className="btn btn-primary bg-primary-custom text-decoration-none w-100">Iniciar sesión</a>
                        </div>
                    )
                }
            </div>
        </div>
    );
}