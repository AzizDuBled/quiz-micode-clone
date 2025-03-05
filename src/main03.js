import "./style.css";
import { Questions } from "./question";

const app = document.querySelector("#app");

const startButton = document.querySelector("#start");

let i = 0;

startButton.addEventListener("click", () => {
  const question =
    document.querySelector("#question") ?? document.createElement("p");
  // cette ligne recupere un element avec l'id "question" et si il n'existe pas
  // alors on creer un element de type "p"
  question.id = "question";
  question.innerText = Questions[i].question;
  app.insertBefore(question, startButton);
  i++;
  if (i > Questions.length - 1) {
    console.log("Question remove");
    question.remove();
    // cette methode semble supprimer un element de l'html
    i = 0;
  }
});
