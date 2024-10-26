"use client"
import { WORDS_ENDPOINT } from "../../constants"
import { useState, useEffect } from 'react';

export default function VocabularyTable({ lecture, sort = 'kichwa', tag = "", has_imgs = true }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            var url = `${WORDS_ENDPOINT}?lecture=${lecture}&sortOrder=asc&sort=${sort}`
            if (tag) { url += `&tags=${tag}` }
            const data = await fetch(url, { cache: 'no-store' })
                .then((response) => response.json())
                .catch((error) => console.error(error));
            setData(data)
        };
        fetchData()
    }, []);
    return (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th className='text-center'>Kichwa</th>
                    <th className='text-center'>Español</th>
                    {has_imgs && <th className='text-center'>Imagen</th>}
                </tr>
            </thead>
            <tbody>
                {
                    data.map((word, index) => {
                        return (
                            <tr key={index}>
                                <td className='text-center align-middle'>{word.kichwa}</td>
                                <td className='text-center align-middle'>{word.spanish}</td>
                                {has_imgs && <td className='text-center align-middle'><img height={150} width={150} src={"/img/downloads/" + word.english + '.jpg'} /></td>}
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    )
}