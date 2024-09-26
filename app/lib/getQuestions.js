import lectureQuestions from '../lectures/basic/lectureQuestions'

export function getQuestions(level) {
    var questions = lectureQuestions.filter((element) => (element.question))
    return questions
}