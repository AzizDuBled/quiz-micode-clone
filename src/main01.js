import "./style.css";

const app = document.querySelector("#app");
// permet de selectionner un element du DOM a l aide de selecteur CSS

// console.log("red");
// setTimeout(() => {
//   app.style.background = "red";
// }, 1000);
// la le setTimeout permet de lancer une action apres un certain que nous aurions choisit en
// second parametre, ds le premier parametre on a mis une fonction flecher qui permet de
// changer la couleur du fond de l'element app

// console.log({
//   parent: app.parentElement,
//   prevSister: app.previousElementSibling,
//   nextSister: app.nextElementSibling,
//   firstChild: app.firstElementChild,
//   lastChild: app.lastElementChild,
//   children: app.children,
// });

// déconseillé
// app.innerHTML = `<div>
//   <h1>
//     Salut
//   </h1>
//   <input />
// </div>`;

const div = document.createElement("div");
const title = document.createElement("h1");
title.innerText = "Melvin !";
// innerText permet d'ajouter du texte a la balise html
// on aurait pu utiliser innerHTML mais cela pourrais poser des probleme de securité, en effet
// innerHTML transmet du html alors que innerText transmet du texte, cela veut donc dire que
// si on envoie du html dans innerText cela ne sera pas exuté mais afficher en brut

app.appendChild(div); // appendChild permet d'ajouter un element a un autre
// setInterval(() => {
//   input.value += "M";
// }, 1000);
// setInterval() permet de repeter une action toute les x seconde comme setTimeout
