import Quiz from "@/app/components/Quiz.js"
import ImageFlipContainer from "../../../../components/ImageFlipContainer"
import VocabularyTable from "../../../../components/VocabularyTable"


export default function GreetingsFarewells() {
    return (
        <div className="container">
            <h1 className="text-center">Saludos, despedidas y formalidades.</h1>
            <p>Los saludos son una parte fundamental de la comunicación diaria.</p>
            <h2>Saludos</h2>
            < VocabularyTable lecture="greetings" has_imgs={false}/>
            <hr />
            <h2>Despedidas</h2>
            < VocabularyTable lecture="farewells" has_imgs={false}/>
            <hr />
            <Quiz lecture="greetings-farewells" />

        </div>
    );
};



