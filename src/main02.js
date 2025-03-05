import "./style.css";

const app = document.querySelector("#app");

const startButton = document.querySelector("#start");

startButton.addEventListener("click", () => {
  console.log("Click start");
});

document.body.addEventListener("click", () => {
  console.log("Click body");
});

app.addEventListener("click", () => {
  console.log("Click app");
});

// quand on a plusieurs event imbriqué (le bouton est ds app qui est ds body), alor
// c est l event de l element le plus "au fond" qui sera declenché, c est le
// mode capture

// pour un event on utilise addEventListener avec en premier parametre le type
// d event et en second parametre la fonction a appelé en cas d event

// quand on passe le dernier parametre de addEventlistener a true, par exemple :
// app.addEventListener(
//   "click",
//   () => {
//     console.log("Click app");
//   },
//   true
// );
// alors l'eventlistener passe en mode bubble, ce qui signifie que si il y a masse
// d'event imbriqué, ce sera celui placé le plus haut placé dans la hierachie qui
// se declenchera en premier (en l'occurence dans l exmple precedent si mettait tt
// a true alors ce sera: body => app => startButton)
