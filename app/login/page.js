"use client";
export default function Login() {
    async function onSubmit(event) {
        event.preventDefault()
        window.location.href = "/courses"
        // const formData = new FormData(event.currentTarget)
        // const response = await fetch('/api/submit', {
        //     method: 'POST',
        //     body: formData,
        // })
        // const data = await response.json()
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg">
                <h3 className="text-center mb-4">Iniciar Sesión</h3>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Email</label>
                        <input type="text" className="form-control" id="username" placeholder="Ingresa email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Ingresa contraseña" />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary bg-primary-custom">Login</button>
                    </div>
                    <div className="text-center mt-3">
                        <a href="/forgot-password" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
