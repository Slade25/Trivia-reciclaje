const questions = [
    {
        question: "¿Cuál de estos materiales es reciclable?",
        options: { A: "Vidrio", B: "Papel higiénico usado", C: "Paquete de chips" },
        answer: "A"
    },
    {
        question: "¿Qué debe hacer si no hay un contenedor de reciclaje cerca?",
        options: { A: "Tirarlo a la basura normal", B: "Guardarlo hasta encontrar uno", C: "Dejarlo en el suelo" },
        answer: "B"
    },
    {
        question: "¿Qué material suele tardar más en descomponerse?",
        options: { A: "Plástico", B: "Papel", C: "Vidrio" },
        answer: "A"
    },
    {
        question: "¿Qué tipo de plástico es reciclable en la mayoría de los lugares?",
        options: { A: "Plástico de polietileno (PET)", B: "Plástico de PVC", C: "Plástico de poliestireno" },
        answer: "A"
    },
    {
        question: "¿Cuál de estos materiales se recicla junto con el papel?",
        options: { A: "Cartón", B: "Comida", C: "Plásticos de un solo uso" },
        answer: "A"
    },
    {
        question: "¿Qué símbolo en un envase indica que es reciclable?",
        options: { A: "Un triángulo con flechas", B: "Un círculo con una X", C: "Una estrella" },
        answer: "A"
    },
    {
        question: "¿Cuántas veces se puede reciclar el papel?",
        options: { A: "Hasta 7 veces", B: "Solo una vez", C: "Ilimitadamente" },
        answer: "A"
    },
    {
        question: "¿Qué tipo de vidrio es reciclable?",
        options: { A: "Vidrio de botellas", B: "Vidrio de ventanas", C: "Vidrio de espejos" },
        answer: "A"
    },
    {
        question: "¿Cómo se deben preparar las botellas para el reciclaje?",
        options: { A: "Enjuagándolas y aplastándolas", B: "Solo enjuagándolas", C: "No hace falta hacer nada" },
        answer: "A"
    },
    {
        question: "¿Qué papel higiénico se puede reciclar?",
        options: { A: "Papel higiénico limpio", B: "Papel higiénico usado", C: "Ninguno de los anteriores" },
        answer: "C"
    }
];


let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    shuffleArray(questions); // Mezcla las preguntas cada vez que se carga
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    const options = document.getElementById('options');
    options.innerHTML = '';
    for (const [key, value] of Object.entries(question.options)) {
        options.innerHTML += `<li><button onclick="checkAnswer('${key}')">${key}. ${value}</button></li>`;
    }
}


function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const resultElement = document.getElementById('result');

    if (selectedOption === correctAnswer) {
        resultElement.textContent = '¡Correcto!';
        resultElement.style.color = 'green';
        score++;
    } else {
        resultElement.textContent = 'Incorrecto. Intenta de nuevo.';
        resultElement.style.color = 'red';
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 1000); // Cargar la siguiente pregunta después de un breve retraso
    } else {
        setTimeout(showFinalScore, 1000); // Mostrar puntaje final después de todas las preguntas
    }
}

function startTrivia() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('trivia-container').style.display = 'block';
    loadQuestion(); // Cargar la primera pregunta
}

function showFinalScore() {
    document.getElementById('question').textContent = '¡Trivia terminada!';
    document.getElementById('options').innerHTML = '';
    document.getElementById('result').textContent = `Tu puntaje final es ${score} de ${questions.length}.`;
    document.getElementById('result').style.color = 'black';
    document.getElementById('score').textContent = `Tu puntaje final es ${score} de ${questions.length}.`;
    document.getElementById('restart-button').style.display = 'block'; // Mostrar el botón de reinicio
}


function restartGame() {
    shuffleArray(questions); // Mezcla las preguntas al reiniciar
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    document.getElementById('result').textContent = '';
    document.getElementById('score').textContent = '';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

window.onload = loadQuestion;
