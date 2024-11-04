const activities = [
    {
        "name": "Módulo 1",
        "score_required": 0,
        "imagen": "/img/cover/basic-m1.jpg",
        "description": "En este módulo aprenderá primeras el alfabeto, los número colores y pronombres.",
        "lectures": [
            {
                "name": "Alfabeto",
                "score_required": 0,
                "slug": "alphabet",
                "next": "/lectures/basic/es/numbers",
            },
            {
                "name": "Números",
                "score_required": 1,
                "slug": "numbers",
                "next": "/lectures/basic/es/colors",
            },
            {
                "score_required": 2,
                "name": "Colores",
                "slug": "colors",
                "next": "/lectures/basic/es/grammar-1",
            },
            {
                "score_required": 3,
                "name": "Gramática: Pronombres y Estructura Básica de Oraciones",
                "slug": "grammar-1",
                "next": "/lectures/basic/es/game-1",
            },
            {
                "score_required": 4,
                "name": "Juego Palabrando",
                "slug": "game-1",
                "next": "/lectures/basic/es/test-1",
            },
            {
                "score_required": 5,
                "name": "Evaluación 1",
                "slug": "test-1",
                "next": "/lectures/basic/es/greetings-farewells",
            },
        ]
    },
    {
        "name": "Módulo 2",
        "score_required": 6,
        "imagen": "/img/cover/basic-m2.jpg",
        "description": "Este módulo contiene expresiones para saludar y despedirse adicionalmente vocabulario sobre familia, animales, partes del cuerpo y ropa.",
        "lectures": [
            {
                "score_required": 6,
                "name": "Saludos Cortesía y Despedidas",
                "slug": "greetings-farewells",
                "next": "/lectures/basic/es/family",
            },
            {
                "score_required": 7,
                "name": "La familia",
                "slug": "family",
                "next": "/lectures/basic/es/animals",
            },
            {
                "score_required": 8,
                "name": "Animales",
                "slug": "animals",
                "next": "/lectures/basic/es/body",
            },
            {
                "score_required": 9,
                "name": "Partes del Cuerpo",
                "slug": "body",
                "next": "/lectures/basic/es/grammar-2",

            },
            {
                "score_required": 10,
                "name": "Gramática: género, plural, tamaño, cantidad",
                "slug": "grammar-2",
                "next": "/lectures/basic/es/game-2",
            },
            {
                "score_required": 11,
                "name": "Juego Sopa de Letras",
                "slug": "game-2",
                "next": "/lectures/basic/es/test-2",
            },
            {
                "score_required": 12,
                "name": "Evaluación 2",
                "slug": "test-2",
                "next": "/lectures/basic/es/house",
            },
        ]
    },
    {
        "name": "Módulo 3",
        "imagen": "/img/cover/basic-m3.jpg",
        "score_required": 13,
        "description": "Este es el ultimo módulo contiene vocabulario sobre el hogar, el aula, los animales, y muestra como formar oraciones en presente.",
        "lectures": [
            {
                "score_required": 13,
                "name": "Cosas del Hogar",
                "slug": "house",
                "next": "/lectures/basic/es/classroom",
                "module": 3,
            },
            {
                "score_required": 14,
                "name": "El Aula",
                "module": 3,
                "slug": "classroom",
                "next": "/lectures/basic/es/food",
            },
            {
                "score_required": 15,
                "name": "Alimentos",
                "module": 3,
                "slug": "food",
                "next": "/lectures/basic/es/grammar-3",
            },
            {
                "score_required": 16,
                "name": "Gramática 3: Adjetivos",
                "module": 3,
                "slug": "grammar-3",
                "next": "/lectures/basic/es/game-3",
            },
            {
                "score_required": 17,
                "module": 3,
                "name": "Juego Crucigrama",
                "slug": "game-3",
                "next": "/lectures/basic/es/test-3",
            },
            {
                "score_required": 18,
                "module": 3,
                "name": "Evaluación 3",
                "slug": "test-3",
                "next": "/lectures/intermediate/",
            },]
    }
]

export default activities
