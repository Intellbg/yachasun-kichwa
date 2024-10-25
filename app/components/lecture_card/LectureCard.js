import './style.css'

export default function LectureCard({ data, currentScore }) {
    const unlocked = currentScore < data.score_required
    const current = currentScore == data.score_required
    return (        
            <div className={`card m-3 py-4 d-flex flex-row align-items-center justify-content-between ${unlocked ? "blocked" : current ? "current hover-div" : "passed hover-div"}`}>
                <div className="mx-3">
                    <h2 className="fw-bold mb-1">{data.name}</h2>
                    <p className="mb-0">{data.descripcion}</p>
                </div>
                <div className="me-3">
                    {!unlocked ? (
                        <a href={`/lectures/basic/es/${data.slug}`} className="text-decoration-none">
                        <button 
                            className="btn btn-warning text-dark fw-bold" 
                            style={{ borderRadius: "10px" }}
                        >
                            Iniciar
                        </button>
                        </a>                    
                    ) : (
                        <button 
                        className="btn btn-warning text-dark fw-bold" 
                        style={{ borderRadius: "10px" }}
                        disabled 
                    >
                        Bloqueado
                    </button>                        
                )}
            </div>
        </div>
    );
}


  

    
                           
                    







