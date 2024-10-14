const activities = [
    {
        "name": "Módulo 1",
        "score_required": 0,
        "lectures": [
            {
                "name": "Alfabeto",
                "score_required": 0,
                "slug": "alphabet",
                "next": "numbers",
            },
            {
                "name": "Números",
                "score_required": 1,
                "slug": "numbers",
                "next": "colors",
            },
            {
                "score_required": 2,
                "name": "Colores",
                "slug": "colors",
                "next": "grammar-1",
            },
            {
                "score_required": 3,
                "name": "Gramática: Pronombres y Estructura Básica de Oraciones",
                "slug": "grammar-1",
                "next": "game-1",
            },
            {
                "score_required": 4,
                "name": "Juego Wordle",
                "slug": "game-1",
                "next": "test-1",
            },
            {
                "score_required": 5,
                "name": "Evaluación 1",
                "slug": "test-1",
                "next": "greetings-farewells",
            },
        ]
    },
    {
        "name": "Módulo 2",
        "score_required": 6,
        "lectures": [
            {
                "score_required": 6,
                "name": "Saludos Cortesía y Despedidas",
                "slug": "greetings-farewells",
                "next": "family",
            },
            {
                "score_required": 7,
                "name": "La familia",
                "slug": "family",
                "next": "animals",
            },
            {
                "score_required": 8,
                "name": "Animales",
                "slug": "animals",
                "next": "body",
            },
            {
                "score_required": 9,
                "name": "Partes del Cuerpo",
                "slug": "body",
                "next": "grammar-2",

            },
            {
                "score_required": 10,
                "name": "Gramática: género, plural, tamaño, cantidad",
                "slug": "grammar-2",
                "next": "game-2",
            },
            {
                "score_required": 11,
                "name": "Juego Crucigrama",
                "slug": "game-2",
                "next": "test-2",
            },
            {
                "score_required": 12,
                "name": "Evaluación 2",
                "slug": "test-2",
                "next": "home",
            },
        ]
    },
    {
        "name": "Módulo 2",
        "score_required": 12,
        "lectures": [
            {
                "score_required": 12,
                "name": "Cosas del Hogar",
                "slug": "home",
                "next": "classroom",
                "module": 3,
            },
            {
                "score_required": 13,
                "name": "El Aula",
                "module": 3,
                "slug": "classroom",
                "next": "food",
            },
            {
                "score_required": 14,
                "name": "Alimentos",
                "module": 3,
                "slug": "food",
                "next": "grammar-3",
            },
            {
                "score_required": 15,
                "name": "Gramática: Imperativo, Tiempo Presente",
                "module": 3,
                "slug": "grammar-3",
                "next": "game-3",
            },
            {
                "score_required": 16,
                "module": 3,
                "name": "Juego C3",
                "slug": "game-3",
                "next": "test-3",
            },
            {
                "score_required": 17,
                "module": 3,
                "name": "Evaluación 3",
                "slug": "test-3",
                "next": "/",
            },]
    }
]

export default activities
