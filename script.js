const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const questionContainerEl = document.getElementById('questions-container')
const questionEl = document.getElementById('question')
const answerButtonsEl = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame) // when we click on "start", the quiz will start 
nextButton.addEventListener('click', () => {     // when we click on "next", the program will give us a new question
  currentQuestionIndex++ // and will increase the index with one
  setNextQuestion()
})


function startGame() {    // this is the function for when we click on "start"
  startButton.classList.add('hide')   // 1st when we click on "start", the button will disappear 
  shuffledQuestions = questions.sort(() => Math.random() - .5) // after that the program will shuffled the questions,....
  currentQuestionIndex = 0 // (we start from 0, because we would like to start the shuffle from the first question in our question ARRAY below)
  questionContainerEl.classList.remove('hide')    // .....will remove the hiden "start" button and will show the first question 
  setNextQuestion()       
}       // (all of this is going to happen at once - the start button will desepeare and the question will be showen)


function setNextQuestion() { // this is the function for when we click on "start" / "next"
  resetState() // this (function bellow) is going to reset everything (related to our form, question and body) to default state, every single time we set a new question
  showQuestion(shuffledQuestions[currentQuestionIndex])
}


function showQuestion(question) {
  questionEl.innerText = question.question // we get the actual qustion from the question object below
  question.answers.forEach(answer => { // next we populate the given answers
    const button = document.createElement('button') // we create a button for every answer
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) { // after that we check if the answer is correct 
      button.dataset.correct = answer.correct // ONLY if true, we print this 
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsEl.appendChild(button)
  })
}


function resetState() { // this function is going to reset everything (related to our form, question and body) to default state, every single time we set a new question
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild)
  }
}


function selectAnswer(e) { // this is the function for when we select an answer
  const selectedButton = e.target // a veriable for wherever answer we choose
  const correct = selectedButton.dataset.correct // variable which takes the given answer and checks in the datebase below if it is correct or not
  setStatusClass(document.body, correct) // we set the status class of the body (whether or not it is correct)
  Array.from(answerButtonsEl.children).forEach(button => { // we conver the list of all the other buttons (possible answers) into an array, so we can loop over them 
    setStatusClass(button, button.dataset.correct) // and we check each button/answer - if it is the correct or not acording to the datebase, and we set the correct class for each of them - correct or wrong
  })                                                       // (see below the functions: setStatusClass and clearStatusClass)
  if (shuffledQuestions.length > currentQuestionIndex + 1) { // after that the program checks if there are any qustions left 
    nextButton.classList.remove('hide') // if yes, after we give the answer, the "next" button will be shown
  } else {
    startButton.innerText = 'Restart' // if there are no more qustions left, the "restart" button will be shown
    startButton.classList.remove('hide')
  }
}


function setStatusClass(element, correct) { // function, which checks if the answer in the button is correct
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct') // if yes, we add the "correct" class 
  } else {
    element.classList.add('wrong') // if no, we add the "wrong" class 
  }
}


function clearStatusClass(element) { // this function is doing the same, but it removes the other class
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


const questions = [
  {
    question: 'Which sea creature has three hearts?',
    answers: [
      { text: 'Octopus', correct: true },
      { text: 'Seastar', correct: false }
    ]
  },
  {
    question: 'How many pedals do most modern pianos have?',
    answers: [
      { text: 'Three', correct: true },
      { text: 'Four', correct: false },
      { text: 'Six', correct: false },
      { text: 'Two', correct: false }
    ]
  },
  {
    question: 'Who sang about being an eggman and a walrus?',
    answers: [
      { text: 'Queen', correct: false },
      { text: 'The Beatles', correct: true },
      { text: 'The Rolling Stones', correct: false },
      { text: 'Nirvana', correct: false }
    ]
  },
  {
    question: 'How many tails does a Manx cat have?',
    answers: [
      { text: 'None', correct: false },
      { text: 'One', correct: true }
    ]
  },
  {
    question: 'Which word can be placed before bottle, bell and bird?',
    answers: [
      { text: 'Balck', correct: false },
      { text: 'Yellow', correct: false },
      { text: 'Green', correct: false },
      { text: 'Blue', correct: true }
    ]
  },
  {
    question: 'Who went to school with a lamb?',
    answers: [
      { text: 'Mary', correct: true },
      { text: 'Jenny', correct: false }
    ]
  }
]