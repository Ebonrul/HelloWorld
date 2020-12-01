/**
 * Example store structure
 */
'use strict';

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What does the IP in TCP/IP stand for?',
      answers: [
        'Internet Process',
        'Internet Procedure',
        'Internet Protocol',
        'Internal Process'
      ],
      correctAnswer: 'Internet Protocol'
    },
    {
      question: 'Which is not a layer in the OSI model?',
      answers: [
        'The Application Layer',
        'The Transit Layer',
        'The Session Layer',
        'The Network Layer'
      ],
      correctAnswer: 'The Transit Layer'
    },
    {
      question: 'What is the standard port used for HTTPS protocol',
      answers: [
        '80',
        '443',
        '23',
        '22'
      ],
      correctAnswer: '443'
    },
    {
      question: 'What is the standard port used for HTTP protocol',
      answers: [
        '80',
        '443',
        '23',
        '22'
      ],
      correctAnswer: '80'
    },
    {
      question: 'What is the standard port used for Telnet protocol',
      answers: [
        '80',
        '443',
        '23',
        '22'
      ],
      correctAnswer: '23'
    },
    {
      question: 'What is the standard port used for SSH protocol',
      answers: [
        '80',
        '443',
        '23',
        '22'
      ],
      correctAnswer: '22'
    },
    {
      question: 'What is the difference between UDP and TCP',
      answers: [
        'UDP is connection-oriented and TCP is connection-less',
        'TCP is connection-oriented and UDP is connection-less',
        'UDP is slower than TCP',
        'TCP does not sequence packets before sending'
      ],
      correctAnswer: 'TCP is connection-oriented and UDP is connection-less'
    },
    {
      question: 'Two devices are in network if',
      answers: [
        'a process is running on both devices',
        'a process in one device is able to exchange information with a process in another device',
        'IDs of the processes running on different devices are same',
        'none of these answers are correct'
      ],
      correctAnswer: 'a process in one device is able to exchange information with a process in another device'
    },
    {
      question: 'In a network a node is...',
      answers: [
        'the computer that originates the data',
        'the computer that routes the data',
        'the computer that terminates the data',
        'all of these answers are correct'
      ],
      correctAnswer: 'all of these answers are correct'
    },
    {
      question: 'A device that forwards packets between networks by processing the routing information included in the packet is called a...',
      answers: [
        'hub',
        'switch',
        'bridge',
        'router'
      ],
      correctAnswer: 'router'
    }
  ],

  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */


function main() {

  renderQuiz();
  handleQuizStart();
  handleQuestionSubmit();
  handleNextQuestionSubmit();
  handleNewQuizReset();
}

$(main);

/********** TEMPLATE GENERATION FUNCTIONS **********/


function generateStartingPage() {
  // hand out the start page
  return `<div class="home-screen game-screen">
  <h3>Network Knowledge Quiz</h3>
  <p>This is a multiple-choice quiz on the subject of networking<span class="total-question"></span></p>
  <button id="startQuiz">Start Quiz</button>
</div>`;
}

// populate the question array

function generateQuestionPage() {
  // start point
  let currentQuestion = store.questions[store.questionNumber];

  // randomize the questions
  let answers = currentQuestion.answers.map((answer, index) => {
    // populate the answers with the data from the store
    if (index === 0) {
      return `<input type="radio" id="${answer}" name="answer" value=${answer} required>
    <label for="${answer}">${answer}</label><br />`;
    }

    return `<input type="radio" id="${answer}" name="answer" value=${answer}>
    <label for="${answer}">${answer}</label><br />`;
  });

  // track score to remaining questions
  return `
  <div class="questionSection">
    <div class="quizStatusSection">
      <div class="currentQuestion">
        <p>Question ${store.questionNumber + 1} out of ${
    store.questions.length
  }</p>
      </div>
      <div class="currentScore">
        <p>Current Score:</br> ${store.score} correct, ${
    store.questionNumber - store.score
  } incorrect</p>
      </div>
    </div>
    <h2>${currentQuestion.question}</h2>
    <form class="answerOptions">
      ${answers.join('')}
      <button id="submitAnswer" class="hideButton">SUBMIT ANSWER</button>
    </form>
  </div>`;
}

// respond to both right and wrong answers

function generateGoodFeedback() {
  let currentCorrect = store.questions[store.questionNumber].correctAnswer;
  return `<div class="feedbackSectionCorrect">
  <h2 class="right">Right Answer!</h2>
  <p>${currentCorrect} is the correct answer!</p>
  <button id="nextQuestion">NEXT QUESTION</button>
</div>`;
}

function generateBadFeedBack() {
  let currentCorrect = store.questions[store.questionNumber].correctAnswer;

  return `<div class="feedbackSectionIncorrect">
  <h2 class="wrong">Wrong Answer!</h2>
  <p>The correct answer is "${currentCorrect}"</p>
  <button id="nextQuestion">NEXT QUESTION</button>
</div>`;
}

function generateFeedbackSection(choice, answer) {  // check answer
  let feedbackHtml = ``;
  $('.hideButton').hide();
  if (choice === answer) { //good outcome
    feedbackHtml = generateGoodFeedback();
    $('main').append(feedbackHtml);
    store.questionNumber += 1;
    store.score += 1;

  } else { //bad outcome
    feedbackHtml = generateBadFeedBack();
    $('main').append(feedbackHtml);
    store.questionNumber += 1;
  }
}

// Populate results

function generateResultsPage() {
  if (store.score === store.questions.length) {
    return `<div class="resultsSection">
    <h2>PERFECT!</h2>
    <p>Here are your results:</p>
    <div class="finalPercentCorrect">
    <h3>${store.score}0%</h3>
    </div>
    <p class="final-results">You got ${store.score} out of ${store.questions.length} correct.</p>
    <p>Not bad, want to try Again?</p>
    <button id="newQuiz">Try Again</button>
    </div>`;
  } else if (store.score === 0) {
    return `<div class="resultsSection">
<h2>Ouch!</h2>
<p>No big deal, you can try again.</p>
<button id="newQuiz">Try Again</button>
</div>`;
  } else {
    return `<div class="resultsSection">
<h2>Good hustle out there!</h2>
<p>Here's how ya did...</p>
<div class="finalPercentCorrect">
<h3>${store.score}0%</h3>
</div>
<p class="final-results">You got ${store.score} out of ${store.questions.length} correct.</p>
<p>Click the button to give it another shot.</p>
<button id="newQuiz">Try Again</button>
</div>`;
  }
}

// RESET QUIZ

function resetQuiz() {
  $('main').empty();
  store.quizStarted = false;
  store.questionNumber = 0;
  store.score = 0;
  renderQuiz();
}


/* RENDERS */

// QUIZ

function renderQuiz() {
  let html = ``;
  if (!store.quizStarted) {
    html = generateStartingPage();
    $('main').html(html);
  } else if (store.quizStarted) {
    html = generateQuestionPage();
    $('main').html(html);
  }
}

// RESULTS

function renderResultsPage() {
  let html = ``;
  html = generateResultsPage();
  $('main').html(html);
}



/* HANDLERS */

// START

function handleQuizStart() {
  $('main').on('click', '#startQuiz', function (event) {
    store.quizStarted = true;
    shuffle(store.questions);


    renderQuiz();
  });
}

// ANSWERS

function handleQuestionSubmit() {
  $('main').on('submit', '.answerOptions', function (event) {
    event.preventDefault();
    let currentQuestionAnswer =
      store.questions[store.questionNumber].correctAnswer;
    let userChoice = $('input[name="answer"]:checked').attr('id');
    generateFeedbackSection(userChoice, currentQuestionAnswer);
  });
}

// NEXT

function handleNextQuestionSubmit() {
  let storeLength = store.questions.length;

  $('main').on('click', '#nextQuestion', function (event) {
    event.preventDefault();
    if (store.questionNumber === storeLength) {
      renderResultsPage();
    } else {
      renderQuiz();
    }
  });
}

// NEW QUIZ

function handleNewQuizReset() {
  $('main').on('click', '#newQuiz', function (event) {
    event.preventDefault();

    resetQuiz();
  });
}

// SHUFFLE

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
