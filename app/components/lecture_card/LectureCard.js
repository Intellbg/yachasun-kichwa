import './style.css'

export default function LectureCard({ data, currentScore }) {
    const unlocked = currentScore < data.score_required
    const current = currentScore == data.score_required
    return (
        <a href={ !unlocked ? ("/lectures/basic/es/" + data.slug) : ""} className="text-decoration-none">
            <div className={`card m-3 py-4 ${unlocked ? "blocked" : current ? "current hover-div" : "passed hover-div"}`}>
                <div className="mx-a">
                    <h2 className="text-center">{data.name}</h2>
                </div>
            </div>
        </a>
    )
}