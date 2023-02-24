import { createDrinksContent } from "./drinksContent.js";

const key = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b39880749emsh80922a9fc0bd4dep161568jsn854145d02e05",
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
  },
};

function createCocktailList() {
  const formCocktail = document.getElementById("cocktail-form");

  createDrinksContent(
    "Cocktails:",
    "filter.php?c=Cocktail",
    formCocktail,
    "cocktails-list"
  );

  const formPopularCocktail = document.getElementById("cocktail-popular-from");
  createDrinksContent(
    "Popular Cocktails:",
    "popular.php",
    formPopularCocktail,
    "cocktails-popular-list"
  );

  const formCocktailsWithVodka = document.getElementById(
    "cocktail-with-vodka-form"
  );
  createDrinksContent(
    "Cocktails with vodka:",
    "search.php?s=vodka",
    formCocktailsWithVodka,
    "cocktail-with-vodka-list"
  );

  const formShot = document.getElementById("shot-form");
  createDrinksContent("Shots:", "filter.php?c=Shot", formShot, "shots-list");

  const formWine = document.getElementById("wine-form");
  createDrinksContent("Wines:", "search.php?s=wine", formWine, "wine-list");
}
createCocktailList();
let randomMachineDiv = document.getElementById("randomDiv");

let randomMachineText = document.getElementById("randomtext");
let cocktailDiv = null;

let imgElement = null;
const formRandom = document.getElementById("random-form");
const buttonRemove = document.createElement("button");
buttonRemove.classList.add("close-cocktail-content");
buttonRemove.textContent = "X";
buttonRemove.addEventListener("click", () => {
  window.location.reload();
  cocktailDiv.remove();
  imgElement.remove();
});
function createRandomElements(data) {
  if (!cocktailDiv) {
    cocktailDiv = document.createElement("div");
    cocktailDiv.classList.add("random-cocktail-content");
    imgElement = document.createElement("img");
    imgElement.classList.add("random-img");

    formRandom.after(cocktailDiv, imgElement);
  } else {
    cocktailDiv.innerHTML = "";
  }

  const h2Element = document.createElement("h2");
  const h3Element = document.createElement("h3");
  const ulElement = document.createElement("ul");
  const h4Element = document.createElement("h4");
  const pElement = document.createElement("p");

  cocktailDiv.append(
    buttonRemove,
    h2Element,
    h3Element,
    ulElement,
    h4Element,
    pElement
  );

  data.drinks.forEach((element) => {
    randomMachineDiv.classList.add("active");
    h2Element.textContent = element.strDrink;
    randomMachineText.textContent = element.strDrink;
    h3Element.textContent = "Ingredients:";
    imgElement.src = element.strDrinkThumb;
    imgElement.style.width = "500px";
    h4Element.textContent = "Instructions:";
    pElement.textContent = element.strInstructions;
    const maxIngridiants = 5;
    for (let x = 1; x < maxIngridiants; x++) {
      const resultText = element[`strIngredient${x}`];
      if (resultText) {
        const li = document.createElement("li");
        li.textContent = resultText;
        ulElement.append(li);
      }
    }
  });
}

function randomMachine() {
  formRandom.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(`https://the-cocktail-db.p.rapidapi.com/random.php`, key)
      .then((response) => response.json())
      .then((data) => {
        createRandomElements(data);
      });
  });
}
randomMachine();
