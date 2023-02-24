const key = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b39880749emsh80922a9fc0bd4dep161568jsn854145d02e05",
    "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
  },
};

export function createDrinksContent(
  titleSelection,
  filterText,
  formElement,
  listId
) {
  const cocktailDiv = document.createElement("div");
  cocktailDiv.classList.add("cocktail-content");
  const closeCardButton = document.createElement("button");
  closeCardButton.classList.add("close-cocktail-content");
  closeCardButton.textContent = "X";
  closeCardButton.addEventListener("click", () => {
    cocktailDiv.remove();
  });
  const drinkTitle = document.createElement("h1");
  drinkTitle.classList.add("drinks-title");
  const h2Element = document.createElement("h2");
  h2Element.classList.add("cocktail-content-title");
  const h3Element = document.createElement("h3");
  h3Element.classList.add("drink-content-instruction");
  const ulElement = document.createElement("ul");
  ulElement.classList.add("ul-cocktail-content");
  const liElementIngredient1 = document.createElement("li");

  const liElementIngredient2 = document.createElement("li");

  const liElementIngredient3 = document.createElement("li");

  const liElementIngredient4 = document.createElement("li");

  const liElementIngredient5 = document.createElement("li");

  const h4Element = document.createElement("h4");
  h4Element.classList.add("cocktail-content-instructions");
  const pElement = document.createElement("p");
  pElement.classList.add("cocktail-content-p");
  drinkTitle.textContent = titleSelection;
  formElement.prepend(drinkTitle);

  const imgElement = document.createElement("img");
  imgElement.classList.add("image-cocktail");

  const listInput = document.getElementById(`${listId}`);

  fetch(`https://the-cocktail-db.p.rapidapi.com/${filterText}`, key)
    .then((response) => response.json())
    .then((data) => {
      const dataDrinks = data.drinks;
      dataDrinks.forEach((element) => {
        const optionElement = document.createElement("option");
        const cocktailName = element.strDrink;
        listInput.append(optionElement);
        optionElement.textContent = cocktailName;
      });
    });

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(
      `https://the-cocktail-db.p.rapidapi.com/search.php?s=${listInput.value}`,
      key
    )
      .then((response) => response.json())
      .then((data) => {
        data.drinks.forEach((element) => {
          formElement.after(cocktailDiv);
          cocktailDiv.append(
            closeCardButton,
            h2Element,
            h3Element,
            ulElement,
            h4Element,
            pElement,
            imgElement
          );
          h2Element.textContent = listInput.value;
          h3Element.textContent = "Ingredients:";
          imgElement.src = element.strDrinkThumb;
          h4Element.textContent = "Instructions:";
          pElement.textContent = element.strInstructions;
          ulElement.append(
            liElementIngredient1,
            liElementIngredient2,
            liElementIngredient3,
            liElementIngredient4,
            liElementIngredient5
          );

          liElementIngredient1.textContent = element.strIngredient1;
          liElementIngredient2.textContent = element.strIngredient2;
          liElementIngredient3.textContent = element.strIngredient3;
          liElementIngredient4.textContent = element.strIngredient4;
          liElementIngredient5.textContent = element.strIngredient5;
          liElementIngredient1.style.fontWeight = "bold";
          liElementIngredient2.style.fontWeight = "bold";
          liElementIngredient3.style.fontWeight = "bold";
          liElementIngredient4.style.fontWeight = "bold";
          liElementIngredient5.style.fontWeight = "bold";
          liElementIngredient1.style.backgroundColor = "rgb(246, 247, 240)";
          liElementIngredient2.style.backgroundColor = "rgb(246, 247, 240)";
          liElementIngredient3.style.backgroundColor = "rgb(246, 247, 240)";
          liElementIngredient4.style.backgroundColor = "rgb(246, 247, 240)";
          liElementIngredient5.style.backgroundColor = "rgb(246, 247, 240)";

          if (liElementIngredient5.textContent === "") {
            liElementIngredient5.remove();
          }
          if (liElementIngredient4.textContent === "") {
            liElementIngredient4.remove();
          }
          if (liElementIngredient3.textContent === "") {
            liElementIngredient3.remove();
          }
        });
      });
  });
}
