'use server'
import { WORDS_ENDPOINT } from '@/constants';

export async function getWords(lectures) {
    const questions = await fetch(`${WORDS_ENDPOINT}?lectures=${lectures}`, {
        method: "GET",
    }).then((response) => response.json()).catch((error) => console.error(error));
    return questions
}