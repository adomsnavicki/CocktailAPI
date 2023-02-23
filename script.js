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

let cocktailDiv = null;

let imgElement = null;
const formRandom = document.getElementById("random-form");

function createRandomElements(data) {
  if (!cocktailDiv) {
    cocktailDiv = document.createElement("div");

    imgElement = document.createElement("img");
    formRandom.after(cocktailDiv);
    cocktailDiv.after(imgElement);
  } else {
    cocktailDiv.innerHTML = "";
  }

  const h2Element = document.createElement("h2");
  const h3Element = document.createElement("h3");
  const ulElement = document.createElement("ul");
  const h4Element = document.createElement("h4");
  const pElement = document.createElement("p");

  cocktailDiv.append(h2Element, h3Element, ulElement, h4Element, pElement);

  data.drinks.forEach((element) => {
    h2Element.textContent = element.strDrink;
    h3Element.textContent = "Ingredients:";
    imgElement.src = element.strDrinkThumb;
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
