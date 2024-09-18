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
let playerName = '';

function loadQuestion() {
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
        setTimeout(loadQuestion, 1000);
    } else {
        setTimeout(showFinalScore, 1000);
    }
}

function startTrivia() {
    playerName = prompt('Por favor, ingresa tu nombre:');
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('trivia-container').style.display = 'block';
    shuffleQuestions();
    loadQuestion();
}

function showFinalScore() {
    document.getElementById('question').textContent = '¡Trivia terminada!';
    document.getElementById('options').innerHTML = '';
    document.getElementById('result').textContent = `Tu puntaje final es ${score} de ${questions.length}.`;
    document.getElementById('result').style.color = 'black';
    document.getElementById('score').textContent = `Tu puntaje final es ${score} de ${questions.length}.`;
    
    saveScore(playerName, score);
    showLeaderboard();
    document.getElementById('trivia-container').style.display = 'none';
    document.getElementById('leaderboard-container').style.display = 'block';
}

function returnToStart() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('leaderboard-container').style.display = 'none';
    document.getElementById('start-container').style.display = 'block';
}

function resetLeaderboard() {
    localStorage.removeItem('leaderboard');
    showLeaderboard();
    returnToStart();
}

function saveScore(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name: name, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const leaderboardTable = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
    leaderboardTable.innerHTML = '';
    leaderboard.forEach(entry => {
        const row = leaderboardTable.insertRow();
        const cellName = row.insertCell(0);
        const cellScore = row.insertCell(1);
        cellName.textContent = entry.name;
        cellScore.textContent = entry.score;
    });
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

window.onload = shuffleQuestions;
