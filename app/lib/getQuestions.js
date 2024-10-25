'use server'
import { WORDS_ENDPOINT } from '@/constants';

export async function getQuestions(lectures, size = 1, options = 1) {
    const questions = await fetch(`${WORDS_ENDPOINT}get-question?size=${size}&lectures=${lectures}&options=${options}`, {
        method: "GET",
    }).then((response) => response.json()).catch((error) => console.error(error));
    return questions
}