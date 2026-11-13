function generateElement() {
  const min = 1;
  const max = 100;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateArray() {
  const arr = [];

  for (let i = 0; i < 5; i++) {
    arr.push(generateElement());
  }

  return arr;
}

function generateContainer() {
  return document.createElement("div");
}

function fillArrContainer(element, array) {
  element.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const span = document.createElement("span");
    span.textContent = array[i];
    element.appendChild(span);
  }
}

function isOrdered(first, second) {
  return first <= second;
}

function swapElements(array, index) {
  if (!isOrdered(array[index], array[index + 1])) {
    [array[index], array[index + 1]] =
      [array[index + 1], array[index]];
  }
}

function highlightCurrentEls(element, index) {
  element.children[index].style.border = "2px dashed red";
  element.children[index + 1].style.border = "2px dashed red";
}

const container = document.getElementById("array-container");
const starting = document.getElementById("starting-array");
const btnGen = document.getElementById("generate-btn");
const btnSort = document.getElementById("sort-btn");

let randomArray = [];

btnGen.addEventListener("click", () => {
  randomArray = generateArray();

  fillArrContainer(starting, randomArray);

  while (container.children.length > 1) {
    container.removeChild(container.lastElementChild);
  }
});
  
btnSort.addEventListener("click", () => {
  if (randomArray.length === 0) return;

  container.querySelectorAll("div:not(#starting-array)")
    .forEach(element => element.remove());

  const array = [...randomArray];
  fillArrContainer(starting, array);

  let swapped = true;
  let stepCount = 0;

  while (swapped) {  
    swapped = false; //Se detiene tras una pasada sin swaps
    for (let i = 0; i < array.length - 1; i++) {
      let currentContainer;

      if (stepCount === 0) {  // reutiliza starting en vez de crear otro div con el mismo contenido
        currentContainer = starting;
      } else {  //cada currentContainer nuevo se llena con el array tal como quedó después del swap del paso anterior
        currentContainer = generateContainer();
        fillArrContainer(currentContainer, array);
        container.appendChild(currentContainer);  //inserta un elemento como hijo de otro elemento, al final de su lista de hijos.
      } //Esto le dice al navegador: "toma este <div> que acabo de crear en memoria (currentContainer) y ponlo dentro de container (que es tu #array-container), como su último hijo visible en la página."

      highlightCurrentEls(currentContainer, i);  //siempre marca las dos posiciones que se van a evaluar en ese paso, usando el contenido que ya está en pantalla en ese momento

      if (!isOrdered(array[i], array[i + 1])) {
        swapped = true;
      }
      swapElements(array, i);

      stepCount++; // contador simple que lleva la cuenta de en qué paso del algoritmo vas
    }
  }

  const finalContainer = generateContainer(); //en vez de "limpiar" el borde del último div del loop, ahora se agrega un div nuevo y separado
  fillArrContainer(finalContainer, array);
  container.appendChild(finalContainer); //se agrega como hijo en #array-container
});
