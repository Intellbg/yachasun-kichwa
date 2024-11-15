'use server'
import { SENTENCE_ENDPOINT } from '@/constants';

export async function getQuestionsSentence(lectures, size = 1, options = 1) {
    const questions = await fetch(`${SENTENCE_ENDPOINT}get-question?size=${size}&lectures=${lectures}&options=${options}`, {
        method: "GET",
    }).then((response) => response.json()).catch((error) => console.error(error));
    return questions
}