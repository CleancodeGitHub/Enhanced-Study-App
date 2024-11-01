document.addEventListener('DOMContentLoaded', function() {
    const notepad = document.getElementById('notepad');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const timerDisplay = document.getElementById('timer');
    const startTimerBtn = document.getElementById('startTimerBtn');
    const resetTimerBtn = document.getElementById('resetTimerBtn');
    const flashcardQuestion = document.getElementById('question');
    const flashcardAnswer = document.getElementById('answer');
    const showAnswerBtn = document.getElementById('showAnswerBtn');
    const nextCardBtn = document.getElementById('nextCardBtn');

    let timerInterval;
    let timeLeft = 1500; // 25 minutes in seconds

    const flashcards = [
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is 2 + 2?", answer: "4" },
        { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" }
    ];
    let currentCardIndex = 0;

    // Notepad functionality
    saveNoteBtn.addEventListener('click', function() {
        localStorage.setItem('notes', notepad.value);
        alert('Note saved successfully!');
    });

    // To-Do List functionality
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            li.textContent = taskText;
            taskList.appendChild(li);
            taskInput.value = '';
        }
    });

    // Pomodoro Timer functionality
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    startTimerBtn.addEventListener('click', function() {
        if (!timerInterval) {
            timerInterval = setInterval(function() {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timerInterval);
                    alert("Time's up!");
                }
            }, 1000);
        }
    });

    resetTimerBtn.addEventListener('click', function() {
        clearInterval(timerInterval);
        timerInterval = null;
        timeLeft = 1500;
        updateTimerDisplay();
    });

    // Flashcard functionality
    function displayCard() {
        flashcardQuestion.textContent = flashcards[currentCardIndex].question;
        flashcardAnswer.textContent = flashcards[currentCardIndex].answer;
        flashcardAnswer.classList.add('hidden');
    }

    showAnswerBtn.addEventListener('click', function() {
        flashcardAnswer.classList.toggle('hidden');
    });

    nextCardBtn.addEventListener('click', function() {
        currentCardIndex = (currentCardIndex + 1) % flashcards.length;
        displayCard();
    });

    // Load saved notes from local storage
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notepad.value = savedNotes;
    }

    // Initialize flashcards
    displayCard();
});
