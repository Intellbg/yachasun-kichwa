const activities = [
    {
        "name": "Alfabeto",
        "course": 0,
        "score_required": 0,
        "slug": "alphabet",
        "next": "numbers",
        "module": 1,
    },
    {
        "course": "Básico",
        "course": 0,
        "name": "Números",
        "score_required": 1,
        "slug": "numbers",
        "next": "colors",
        "module": 1,

    },
    {
        "score_required": 2,
        "course": 0,
        "name": "Colores",
        "slug": "colors",
        "next": "grammar-1",
        "module": 1,

    },
    {
        "score_required": 3,
        "course": 0,
        "name": "Gramática: Pronombres y Estructura Básica de Oraciones",
        "slug": "grammar-1",
        "next": "game-1",
        "module": 1,
    },
    {
        "score_required": 4,
        "course": 0,
        "name": "Juego Wordle",
        "slug": "game-1",
        "next": "test-1",
        "module": 1,
    },
    {
        "score_required": 9,
        "course": 0,
        "name": "Evaluación 1",
        "slug": "test-1",
        "next": "greetings-farewells",
        "module": 2,
    },
    {
        "score_required": 14,
        "course": 0,
        "name": "Saludos Cortesía y Despedidas",
        "slug": "greetings-farewells",
        "module": 2,
        "next": "family",
    },
    {
        "score_required": 15,
        "course": 0,
        "name": "La familia",
        "slug": "family",
        "module": 2,
        "next": "animals",
    },
    {
        "score_required": 16,
        "course": 0,
        "name": "Animales",
        "slug": "animals",
        "module": 2,
        "next": "body",
    },
    {
        "score_required": 17,
        "course": 0,
        "name": "Partes del Cuerpo",
        "slug": "body",
        "module": 2,
        "next": "grammar-2",

    },
    {
        "score_required": 18,
        "course": 0,
        "name": "Gramática: género, plural, tamaño, cantidad",
        "slug": "grammar-2",
        "module": 2,
        "next": "game-2",
    },
    {
        "score_required": 19,
        "course": 0,
        "name": "Juego Crucigrama",
        "slug": "game-2",
        "module": 2,
        "next": "test-2",
    },
    {
        "score_required": 20,
        "course": 0,
        "name": "Evaluación 2",
        "module": 3,
        "slug": "test-2",
        "next": "home",
    },
    {
        "score_required": 34,
        "course": 0,
        "name": "Cosas del Hogar",
        "slug": "home",
        "next": "classroom",
        "module": 3,
    },
    {
        "score_required": 35,
        "course": 0,
        "name": "El Aula",
        "module": 3,
        "slug": "classroom",
        "next": "food",
    },
    {
        "score_required": 36,
        "course": 0,
        "name": "Alimentos",
        "module": 3,
        "slug": "food",
        "next": "grammar-3",
    },
    {
        "score_required": 38,
        "course": 0,
        "name": "Gramática: Imperativo, Tiempo Presente",
        "module": 3,
        "slug": "grammar-3",
        "next": "game-3",
    },
    {
        "score_required": 39,
        "course": 0,
        "module": 3,
        "name": "Juego C3",
        "slug": "game-3",
        "next": "test-3",
    },
    {
        "score_required": 40,
        "course": 0,
        "module": 3,
        "name": "Evaluación 3",
        "slug": "test-3",
        "next": "/",
    },
]

export default activities
