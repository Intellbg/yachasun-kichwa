export default function MiniTestForm({ questions }) {
    if (!questions[0].options) { return (<div></div>) }
    return (
        <div className="container">
            <h3>Evaluación</h3>
            <form method="POST">
                {
                    questions.map((element, index) => {
                        return (
                            <div className="mb-3" key={element.question + index}>
                                <label className="form-label">{element.question}</label>
                                {element.options.map((option) => (
                                    <div className="form-check custom-radio" key={option}>
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="radio" name={index} value={option} />
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )
                    })
                }
            </form >
        </div >
    );
}






