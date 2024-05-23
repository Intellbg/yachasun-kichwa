export default function Register() {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg w-50">
                <h3 className="text-center mb-4">Crear Usuario</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nombre de usuario</label>
                        <input type="text" className="form-control" id="username" placeholder="Ingresa nombre de usuario" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                        <input type="email" className="form-control" id="email" placeholder="Ingresa correo electrónico" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Ingresa contraseña" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirma contraseña" />
                    </div>
                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary bg-primary-custom">Registrar</button>
                    </div>
                    <div className="text-center">
                        <a href="/login" className="text-decoration-none">¿Ya tienes una cuenta? Iniciar sesión</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
