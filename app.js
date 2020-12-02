'use strict';

/**
 * Example store structure
 */
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
      correctAnswer: 'Internet Protocol',
      correct: 'Yep, the IP in TCP/IP stands for Internet Protocol.',
      incorrect: 'Close, but the IP in TCP/IP stands for Internet Protocol,'
    },
    {
      question: 'Which is not a layer in the OSI model?',
      answers: [
        'The Application Layer',
        'The Transit Layer',
        'The Session Layer',
        'The Network Layer'
      ],
      correctAnswer: 'The Transit Layer',
      correct: 'Nice catch. The Transit Layer is part of the TCP/IP model, not the OSI model.',
      incorrect: 'Not quite. It was the Transit Layer.'
    },
    {
      question: 'What is the standard port used for HTTPS protocol',
      answers: [
        '80',
        '443',
        '23',
        '22'
      ],
      correctAnswer: '443',
      correct: 'Correct! Port 443 is the default port for HTTPS traffic.',
      incorrect: 'Port numbers can be tricky. Port 443 is the default port for HTTPS traffic.'
    },
    {
      question: 'What is the standard port used for HTTP protocol',
      answers: [
        '80',
        '443',
        '23',
        '22'
      ],
      correctAnswer: '80',
      correct: 'You got it! Port 80 is the default for HTTP traffic.',
      incorrect: 'Very good guess, but port 80 is the default for HTTP traffic.',
    },
    {
      question: 'What is the standard port used for Telnet protocol',
      answers: [
        '80',
        '443',
        '23',
        '22'
      ],
      correctAnswer: '23',
      correct: 'Way to go! Port 23 is the default port for Telnet Traffic.',
      incorrect: 'Port numbers can be tricky. Port 23 is the default port for Telnet Traffic.',
    },
    {
      question: 'What is the standard port used for SSH protocol',
      answers: [
        '80',
        '443',
        '23',
        '22'
      ],
      correctAnswer: '22',
      correct: "You're right! Port 22 is the default port for SSH traffic.",
      incorrect: 'Very good guess, but port 22 is the default port for SSH traffic.',
    },
    {
      question: 'What is the difference between UDP and TCP',
      answers: [
        'UDP is connection-oriented and TCP is connection-less',
        'TCP is connection-oriented and UDP is connection-less',
        'UDP is slower than TCP',
        'TCP does not sequence packets before sending'
      ],
      correctAnswer: 'TCP is connection-oriented and UDP is connection-less',
      correct: "Nothin' gets past you! TCP needs a connection while UDP doesn't.",
      incorrect: 'This one was kinda tricky. TCP requires a connection whereas UDP is a connection-less protocol.',
    },
    {
      question: 'Two devices are in network if',
      answers: [
        'a process is running on both devices',
        'a process in one device is able to exchange information with a process in another device',
        'IDs of the processes running on different devices are same',
        'none of these answers are correct'
      ],
      correctAnswer: 'a process in one device is able to exchange information with a process in another device',
      correct: "That's right! if a process on one device can exchange data with a process running on another device, then those devices are 'networked'.",
      incorrect: 'Sorry, wrong answer. Remember that if a process on one device can exchange data with a process running on another device, then those devices are "networked".',
    },
    {
      question: 'In a network a node is...',
      answers: [
        'the computer that originates the data',
        'the computer that routes the data',
        'the computer that terminates the data',
        'all of these answers are correct'
      ],
      correctAnswer: 'all of these answers are correct',
      correct: 'No fooling you. All of these answers are correct.',
      incorrect: 'Gotcha! All of those answers were correct.',
    },
    {
      question: 'A device that forwards packets between networks by processing the routing information included in the packet is called a...',
      answers: [
        'hub',
        'switch',
        'bridge',
        'router'
      ],
      correctAnswer: 'router',
      correct: 'Bingo! A router uses routing information in a packet to send it forward through the network.',
      incorrect: "Not quite right.  It's a router that uses the routing information in a packet to forward it through the network.",
    }
  ],
  feedback: '',
  questionCompleted: false,
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

function generateQuizAppPage(item) {
	if (!item.quizStarted) {
		return generateStartPage();
	} else if (
		item.quizStarted &&
		item.questionNumber < item.questions.length + 1
	) {
		return generateQuestionPage();
	} else {
		return generateEndPage();
	}
}

function generateStartPage() {
	return `
  <div class="wrapper">
    <div class="group no-margin-top">
  <h3>Network Knowledge Quiz</h3>
  <p>This is a multiple-choice quiz on the subject of networking<span class="total-question"></span></p>
        <button class="js-start start-button">START</button>
    </div>
  </div>`;
}

function generateQuestionPage() {
	if (store.questionCompleted) {
		return `
    <div class="wrapper">
      <section class="group no-margin-top">
        <article class="item">
          <h2 class="">Question Number: ${store.questionNumber} of 10: ${
			store.questions[store.questionNumber - 1].question
		}</h2>
          <p class="">Current Score: ${store.score} of 10</p>
          <p class="">${store.feedback}</p>
          <button class="js-next-question">Next question!</button>
        </article>
      </section>
    </div>`;
	}

	return `
  <div class="wrapper">
    <section class="group no-margin-top">
      <article class="item">
        <h2 class="">Question Number: ${store.questionNumber} of 10: ${
		store.questions[store.questionNumber - 1].question
	}</h2>
        <p class="">Current Score: ${store.score} of 10</p>
        <form>
          <div class="radio-button">
            <input type="radio" id="1" name="answer" value="${
							store.questions[store.questionNumber - 1].answers[0]
						}" required>
            <label for="1">${
							store.questions[store.questionNumber - 1].answers[0]
						}</label>
          </div>
          <div class="radio-button">
            <input type="radio" id="2" name="answer" value="${
							store.questions[store.questionNumber - 1].answers[1]
						}">
            <label for="2">${
							store.questions[store.questionNumber - 1].answers[1]
						}</label>
          </div>
          <div class="radio-button">
            <input type="radio" id="3" name="answer" value="${
							store.questions[store.questionNumber - 1].answers[2]
						}">
            <label for="3">${
							store.questions[store.questionNumber - 1].answers[2]
						}</label>
          </div>
          <div class="radio-button">
            <input type="radio" id="4" name="answer" value="${
							store.questions[store.questionNumber - 1].answers[3]
						}">
            <label for="4">${
							store.questions[store.questionNumber - 1].answers[3]
						}</label>
          </div>
          <div>
          ${
						store.questionCompleted
							? ''
							: '<button type="submit">Check your answer!</button>'
					}
          </div>
        </form>
      </article>
  </div>`;
}

function generateEndPage() {
	return `
  <div class="wrapper">
  <section class="group">
    <div class="item">
      <h2 class="">You scored ${store.score} out of ${
		store.questions.length
	}!</h2>
      <p class="">${
				store.score == store.questions.length
					? "Perfect!"
					: 'Not bad.  CLick the button below to try again.'
			}</p>
      <button class="js-restart start-button">Try Again</button>
    </div>
  </section>
</div>`;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuizApp() {
	const mainContent = generateQuizAppPage(store); //someFunction stands in for the template generator
	$('main').html(mainContent);
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function startQuiz() {
	$('main').on('click', '.js-start', (event) => {
		store.quizStarted = true;
		store.questionNumber += 1;
		store.previousScore = store.currentScore;
		renderQuizApp();
	});
}

function submitUserAnswer() {
	$('main').on('submit', (event) => {
		event.preventDefault();
		const userAnswer = $(':checked').val();
		checkUserAnswer(userAnswer);
		renderQuizApp();
	});
}

function checkUserAnswer(userAnswer) {
	if (userAnswer === store.questions[store.questionNumber - 1].correctAnswer) {
		store.score += 1;
		store.feedback = store.questions[store.questionNumber - 1].correct;
		store.questionCompleted = true;
	} else {
		store.feedback = store.questions[store.questionNumber - 1].incorrect;
		store.questionCompleted = true;
	}
}

function goToNextQuestion() {
	$('main').on('click', '.js-next-question', (event) => {
		store.feedback = '';
		store.questionCompleted = false;
		store.questionNumber += 1;
		renderQuizApp();
	});
}

function resetQuiz() {
	$('main').on('click', '.js-restart', (event) => {
		store.feedback = '';
		store.questionCompleted = false;
		store.questionNumber = 0;
		store.quizStarted = false;
		store.score = 0;
		renderQuizApp();
	});
}

function quizAppFunctions() {
	renderQuizApp();
	startQuiz();
	submitUserAnswer();
	goToNextQuestion();
	resetQuiz();
}

$(quizAppFunctions);
