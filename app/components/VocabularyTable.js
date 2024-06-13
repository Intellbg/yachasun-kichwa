import { WORDS_ENDPOINT } from "../../constants"

export default async function VocabularyTable({ lecture }) {
    var data = await fetch(`${WORDS_ENDPOINT}?lecture=${lecture}&sortOrder=asc`,{ cache: 'no-store' })
        .then((response) => response.json())
        .catch((error) => console.error(error));

    return (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th className='text-center'>Kichwa</th>
                    <th className='text-center'>Español</th>
                    <th className='text-center'>Imagen</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((word, index) => {
                        return (
                            <tr key={index}>
                                <td className='text-center align-middle'>{word.kichwa}</td>
                                <td className='text-center align-middle'>{word.spanish}</td>
                                <td className='text-center align-middle'><img height={150} width={150} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCA3hqYW6SiRznu2wfLksnL1thUehRtB01fBJiwbLGXBpQ3_UF" /></td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    )
}