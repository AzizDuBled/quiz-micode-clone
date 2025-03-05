import "./style.css";
import { Questions } from "./question";

const TIMEOUT = 4000;

const app = document.querySelector("#app");

const startButton = document.querySelector("#start");

startButton.addEventListener("click", startQuiz);

function startQuiz(event) {
  event.stopPropagation();
  //cette fonction arrete la propagation des event, que sa soit des bublles ou des captures
  let currentQuestion = 0;
  let score = 0;

  displayQuestion(currentQuestion);

  function clean() {
    while (app.firstElementChild) {
      app.firstElementChild.remove();
    }
    const progress = getProgressBar(Questions.length, currentQuestion);
    app.appendChild(progress);
  }

  function displayQuestion(index) {
    clean();
    const question = Questions[index];

    if (!question) {
      displayFinishMessage();
      return;
    }

    const title = getTitleElement(question.question);
    app.appendChild(title);
    const answerDiv = createAnswers(question.answers);
    app.appendChild(answerDiv);

    const submitButton = getSubmitButton();

    submitButton.addEventListener("click", submit);

    app.appendChild(submitButton);
  }

  function displayFinishMessage() {
    const h1 = document.createElement("h1");
    h1.innerText = "Bravo ! Tu as terminé le quiz.";
    const p = document.createElement("p");
    p.innerText = `Tu as eu ${score} sur ${Questions.length} point !`;

    app.appendChild(h1);
    app.appendChild(p);
  }

  function submit() {
    const selectedAnswer = app.querySelector('input[name="answer"]:checked');

    disableAllAnswers();

    const value = selectedAnswer.value;

    const question = Questions[currentQuestion];

    const isCorrect = question.correct === value;

    if (isCorrect) {
      score++;
    }

    showFeedback(isCorrect, question.correct, value);
    displayNextQuestionButton(() => {});

    const feedback = getFeedbackMessage(isCorrect, question.correct);
    app.appendChild(feedback);
  }

  function displayNextQuestionButton(callback) {
    let remainingTimeout = TIMEOUT;

    document.querySelector("button").remove();

    const getButtonText = () => `Next (${remainingTimeout / 1000}s)`;

    const nextButton = document.createElement("button");
    nextButton.innerText = getButtonText();
    app.appendChild(nextButton);

    const interval = setInterval(() => {
      remainingTimeout -= 1000;
      nextButton.innerText = getButtonText();
    }, 1000);

    const timeout = setTimeout(() => {
      handleNextQuestion();
    }, TIMEOUT);

    const handleNextQuestion = () => {
      clearInterval(interval);
      clearTimeout(timeout);
      // ces deux fonction permet d 'enlever les intervalle et timeout pour eviter de generer des bug
      // => les fonctions pourrait s executer dans le vite ce qui pourrait generer des bugs
      currentQuestion++;
      displayQuestion(currentQuestion);
    };

    nextButton.addEventListener("click", () => {
      handleNextQuestion();
    });
  }

  function createAnswers(answers) {
    const answerDiv = document.createElement("div");

    answerDiv.classList.add("answers");

    for (const answer of answers) {
      const label = getAnswerElement(answer);

      answerDiv.appendChild(label);
    }

    return answerDiv;
  }
}

function getTitleElement(text) {
  const title = document.createElement("h3");
  title.innerText = text;
  return title;
}

function formatId(text) {
  return text.replaceAll(" ", "-").replaceAll('"', "'").toLowerCase();
}

function getAnswerElement(text) {
  const label = document.createElement("label");
  label.innerText = text;
  const id = formatId(text);
  const input = document.createElement("input");
  input.id = id;
  label.htmlFor = id;
  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("value", text);

  label.appendChild(input);
  return label;
}

function getSubmitButton() {
  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  return submitButton;
}

function showFeedback(isCorrect, correct, answer) {
  const correctAnswerId = formatId(correct);
  const correctElement = document.querySelector(
    `label[for="${correctAnswerId}"]`
  );

  const selectedAnswerId = formatId(answer);
  const selectedElement = document.querySelector(
    `label[for="${selectedAnswerId}"]`
  );

  correctElement.classList.add("correct");
  selectedElement.classList.add(isCorrect ? "correct" : "incorrect");
}

function getFeedbackMessage(isCorrect, correct) {
  const paragraph = document.createElement("p");
  paragraph.innerText = isCorrect
    ? "Bravo ! Tu as eu la bonne réponse"
    : `Désolé... mais la bonne réponse etait ${correct}`;

  return paragraph;
}

function getProgressBar(max, value) {
  const progress = document.createElement("progress");
  progress.setAttribute("max", max);
  progress.setAttribute("value", value);
  return progress;
}

function disableAllAnswers() {
  const radioInputs = document.querySelectorAll('input[type="radio"]');

  for (const radio of radioInputs) {
    radio.disabled = true;
  }
}
