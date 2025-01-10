'use server'
import { SENTENCE_ENDPOINT } from '@/constants';

export async function getSentence(lectures, size = 1) {
    const questions = await fetch(`${SENTENCE_ENDPOINT}get-sentence?lectures=${lectures}&size=${size}`, {
        method: "GET",
    }).then((response) => response.json()).catch((error) => console.error(error));
    return questions
}