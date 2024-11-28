const activities = [
    {
        "name": "Módulo 1",
        "score_required": 19,
        "imagen": "/img/cover/basic-m1.jpg",
        "description": "En este modulo aprenderás más números, alimentos, animales y partículas para hacer oraciones.",
        "lectures": [
            {
                "score_required": 18,
                "name": "Numeros",
                "descripcion": "En esta lectura vamos a aprender sobre los números",
                "slug": "numbers-2",
                "next": "/lectures/intermediate/es/ordinal_numbers",
            },
            {
                "score_required": 20,
                "name": "Números ordinales",
                "slug": "ordinal_numbers",
                "next": "/lectures/intermediate/es/animals-2",
            },
            {
                "score_required": 21,
                "name": "Animales",
                "slug": "animals-2",
                "next": "/lectures/intermediate/es/food-2",
            },
            {
                "score_required": 22,
                "name": "Alimentos",
                "slug": "food-2",
                "next": "/lectures/intermediate/es/grammar-1-2",
            },
            {
                "score_required": 23,
                "name": "Las particulas pak y nkapak",
                "slug": "grammar-1-2",
                "next": "/lectures/intermediate/es/game-1-2",
            },
            {
                "score_required": 24,
                "name": "Juego palabrando",
                "slug": "game-1-2",
                "next": "/lectures/intermediate/es/test-1-2",
            },
            {
                "score_required": 25,
                "name": "Evaluación 1",
                "slug": "test-1-2",
                "next": "/lectures/intermediate/es/grammar-2",
            },
        ]
    },
    {
        "name": "Módulo 2",
        "score_required": 26,
        "imagen": "/img/cover/basic-m2.jpg",
        "description": "En este módulo aprenderás ha hacer preguntas y a aprender a hacer más oraciones.",
        "lectures": [
            {
                "score_required": 26,
                "name": "Partículas de pregunta y respuesta",
                "slug": "grammar-2",
                "next": "/lectures/intermediate/es/grammar-3",
            },
            {
                "score_required": 27,
                "name": "Las partículas tak y ta",
                "slug": "grammar-3",
                "next": "/lectures/intermediate/es/grammar-4",
            },
            {
                "score_required": 28,
                "name": "Las partículas manta, kaman y wan",
                "slug": "grammar-4",
                "next": "/lectures/intermediate/es/grammar-5",
            },
            {
                "score_required": 29,
                "name": "Las partículas pi y man",
                "slug": "grammar-5",
                "next": "/lectures/intermediate/es/grammar-6",

            },
            {
                "score_required": 30,
                "name": "La negación",
                "slug": "grammar-6",
                "next": "/lectures/intermediate/es/game-2-2",
            },
            {
                "score_required": 31,
                "name": "Juego arrastra y ordena",
                "slug": "game-2-2",
                "next": "/lectures/intermediate/es/test-2",
            },
            {
                "score_required": 32,
                "name": "Evaluación 2",
                "slug": "test-2",
                "next": "/lectures/intermediate/es/verbs",
            },
        ]
    },
    {
        "name": "Módulo 3",
        "score_required": 33,
        "imagen": "/img/cover/basic-m3.jpg",
        "description": "En este módulo aprenderás verbos, adjetivos, palabras de la ciudad, cocina y dormitorio",
        "lectures": [
            {
                "score_required": 33,
                "name": "Los verbos",
                "slug": "verbs",
                "next": "/lectures/intermediate/es/adjetives",
            },
            {
                "score_required": 34,
                "name": "Los adjetivos",
                "slug": "adjetives",
                "next": "/lectures/intermediate/es/kitchen",
            },
            {
                "score_required": 35,
                "name": "La cocina",
                "slug": "kitchen",
                "next": "/lectures/intermediate/es/city",
            },
            {
                "score_required": 36,
                "name": "La ciudad",
                "slug": "city",
                "next": "/lectures/intermediate/es/room",
            },
            {
                "score_required": 37,
                "name": "El dormitorio",
                "slug": "room",
                "next": "/lectures/intermediate/es/game-3-3",
            },
            {
                "score_required": 38,
                "name": "Juego sopa de letras",
                "slug": "game-3-3",
                "next": "/lectures/intermediate/es/test-3",
            },
            {
                "score_required": 39,
                "name": "Evaluación 3",
                "slug": "test-3",
                "next": "/lectures/intermediate/es/location",
            },
        ]
    },
    {
        "name": "Módulo 4",
        "score_required": 40,
        "imagen": "/img/cover/basic-m1.jpg",
        "description": "En este módulo vamos a apreder más gramatica, y vocabulario de ubicación y tiempo.",
        "lectures": [

            {
                "score_required": 40,
                "name": "La ubicación",
                "slug": "location",
                "next": "/lectures/intermediate/es/time",
            },
            {
                "score_required": 41,
                "name": "EL tiempo",
                "slug": "time",
                "next": "/lectures/intermediate/es/grammar-7",
            },
            {
                "score_required": 42,
                "name": "El pasado progresivo",
                "slug": "grammar-7",
                "next": "/lectures/intermediate/es/grammar-8",
            },
            {
                "score_required": 43,
                "name": "El pasado simple",
                "slug": "grammar-8",
                "next": "/lectures/intermediate/es/grammar-9",
            },
            {
                "score_required": 44,
                "name": "El participio pasado",
                "slug": "grammar-9",
                "next": "/lectures/intermediate/es/game-4",
            },
            {
                "score_required": 45,
                "name": "Juego completa la oración",
                "slug": "game-4",
                "next": "/lectures/intermediate/es/test-4",
            },
            {
                "score_required": 46,
                "name": "Evaluación 4",
                "slug": "test-4",
                "next": "/lectures/intermediate/es/grammar-10",
            },]
    },
    {
        "name": "Módulo 5",
        "score_required": 47,
        "imagen": "/img/cover/basic-m1.jpg",
        "description": "En este modulo vamos a aprender más gramatica.",
        "lectures": [
            {
                "score_required": 47,
                "name": "La conjugación en el tiempo presente progresivo",
                "slug": "grammar-10",
                "next": "/lectures/intermediate/es/grammar-11",
            },
            {
                "score_required": 48,
                "name": "El futuro próximo",
                "slug": "grammar-11",
                "next": "/lectures/intermediate/es/grammar-12",
            },
            {
                "score_required": 49,
                "name": "El futuro simple",
                "slug": "grammar-12",
                "next": "/lectures/intermediate/es/game-5",
            },
            {
                "score_required": 50,
                "name": "Juego arrastra y ordena",
                "slug": "game-5",
                "next": "/lectures/intermediate/es/test-5",
            },
            {
                "score_required": 51,
                "name": "Evaluación 5",
                "slug": "test-5",
                "next": "/lectures/intermediate/",
            },]
    }

]

export default activities