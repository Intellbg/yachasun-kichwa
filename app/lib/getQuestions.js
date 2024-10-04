'use server'
import { WORDS_ENDPOINT } from '@/constants';

export async function getQuestions(lectures) {
    const questions = await fetch(`${WORDS_ENDPOINT}get-question?size=1&lectures=${lectures}`, {
        method: "GET",
    }).then((response) => response.json()).catch((error) => console.error(error));
    return questions
}