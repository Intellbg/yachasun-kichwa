import '../lecture_card/style.css'

export default function CourseCard({ data, currentScore }) {
    const unlocked = currentScore < data.score_required
    console.log(unlocked)
    return (
        <a href={!unlocked ? data.url : ""} className="text-decoration-none">
            <div className={`card m-3 ${unlocked ? "blocked" : "hover-div"}`}>
                <div className="d-flex">
                    <img src={data.img} height={"200px"} width={"200px"} alt={data.title + " icono"} />
                    <div className="align-self-center">
                        <div className="card-body">
                            <h5 className="card-title text-center">{data.title}</h5>
                            <p className="card-text">{data.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}