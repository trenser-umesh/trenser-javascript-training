const sliderOne = document.getElementById("slider-one");
const sliderTwo = document.getElementById("slider-two");
const sliderThree = document.getElementById("slider-three");
const sliderFour = document.getElementById("slider-four");

function slideImages(slider) {
  let currentIndex = 0;
  const slides = slider.children.length;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 4000);
}

slideImages(sliderOne);
slideImages(sliderTwo);
slideImages(sliderThree);
slideImages(sliderFour);

function searchRecipe() {
  const slideSection = document.getElementById("slide-section");
  const loadingSection = document.getElementById("loading");
  const searchValue = document.getElementById("search-box").value;
  slideSection.style.display = "none";
  loadingSection.style.display = "flex";

  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&app_id=2a32cabc&app_key=6f133742ee04b89dfd41a5ea637de880&q=${searchValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      loadingSection.style.display = "none";
      createCards(data.hits);
    })
    .catch((error) => console.error("Error:", error));
}

function createCards(recipes) {
  const cardSection = document.getElementById("card-section");
  cardSection.innerHTML = "";
  const notFoundElement = document.getElementById("not-found");
  if (recipes.length === 0) {
    const notFoundMessage = document.createElement("h1");
    notFoundMessage.id = "not-found";
    notFoundMessage.textContent = "Recipe not found";
    cardSection.appendChild(notFoundMessage);
  } else {
    if (notFoundElement) {
      notFoundElement.remove();
    }
    recipes.forEach((recipeObject) => {
      const recipe = recipeObject.recipe;
      const cardContainer = divContainerCreation("card-container");
      const cardHeader = createCardHeader(recipe);
      const cardContent = createCardContent(recipe);
      cardContainer.appendChild(cardHeader);
      cardContainer.appendChild(cardContent);
      cardSection.appendChild(cardContainer);
      cardContainer.addEventListener("click", () => {
        const itemURL = recipeObject._links.self.href;
        window.location.href = `../../src/RecipePage/RecipePage.html?url=${itemURL}`;
      });
    });
  }
}

function createCardHeader(recipe) {
  const cardHeader = divContainerCreation("card-header");
  const imageContainer = createImageContainer(recipe.image);
  const headingAndListContainer = createHeadingAndListContainer(
    recipe.label,
    recipe.healthLabels
  );
  cardHeader.appendChild(imageContainer);
  cardHeader.appendChild(headingAndListContainer);
  return cardHeader;
}

function createImageContainer(imageURL) {
  const imageContainer = divContainerCreation("image-container");
  const imageElement = document.createElement("img");
  imageElement.className = "images";
  imageElement.src = imageURL;
  imageElement.alt = "Food image";
  imageContainer.appendChild(imageElement);
  return imageContainer;
}

function createHeadingAndListContainer(label, healthLabels) {
  const headingAndListContainer = divContainerCreation(
    "heading-list-container"
  );
  const headingContainer = divContainerCreation("heading-container");
  const headingElement = document.createElement("h1");
  headingElement.textContent = label;
  headingContainer.appendChild(headingElement);
  const listContainer = createHealthLabelList(healthLabels);
  headingAndListContainer.appendChild(headingContainer);
  headingAndListContainer.appendChild(listContainer);
  return headingAndListContainer;
}

function createHealthLabelList(healthLabels) {
  const listContainer = divContainerCreation("list-container");
  const unorderedList = document.createElement("ul");
  unorderedList.className = "health-label-list";
  healthLabels.forEach((label) => {
    const li = document.createElement("li");
    li.innerText = label;
    unorderedList.appendChild(li);
  });
  listContainer.appendChild(unorderedList);
  return listContainer;
}

function createCardContent(recipe) {
  const cardContent = divContainerCreation("card-content");
  const calorieContainer = createCalorieContainer(recipe);
  const nutrientsContainer = createNutrientsContainer(recipe);
  const mineralContainer = createMineralContainer(recipe);

  cardContent.appendChild(calorieContainer);
  cardContent.appendChild(nutrientsContainer);
  cardContent.appendChild(mineralContainer);
  return cardContent;
}

function createCalorieContainer(recipe) {
  const calorieContainer = divContainerCreation("calorie-container");

  const servings = document.createElement("h4");
  servings.textContent = `${recipe.yield} servings`;
  const calorieIcon = document.createElement("img");
  calorieIcon.className = "calorie-icon";
  calorieIcon.src = "../../assets/Images/icon-calories.jpg";
  calorieIcon.alt = "calorie icon";
  const calorieQuantity = document.createElement("h2");
  calorieQuantity.textContent = `${Math.round(recipe.calories)} kcal`;

  calorieContainer.appendChild(servings);
  calorieContainer.appendChild(calorieIcon);
  calorieContainer.appendChild(calorieQuantity);
  return calorieContainer;
}

function createNutrientsContainer(recipe) {
  const nutrientsContainer = divContainerCreation("nutrient-container");

  const nutrientArray = [
    "PROTEIN",
    Math.round(recipe.totalNutrients.PROCNT.quantity),
    "FAT",
    Math.round(recipe.totalNutrients.FAT.quantity),
    "CARB",
    Math.round(recipe.totalNutrients.CHOCDF.quantity),
  ];

  const nutrientList = document.createElement("ul");
  for (let i = 0; i < nutrientArray.length; i += 2) {
    const list = document.createElement("li");
    const nutrientName = document.createElement("span");
    const nutrientValue = document.createElement("span");
    nutrientValue.className = "nutrient-value list-span";
    nutrientName.className = "list-span";
    nutrientName.textContent = nutrientArray[i];
    nutrientValue.textContent = `${nutrientArray[i + 1]} g`;
    list.appendChild(nutrientName);
    list.appendChild(nutrientValue);
    nutrientList.appendChild(list);
  }
  nutrientsContainer.appendChild(nutrientList);
  return nutrientsContainer;
}

function createMineralContainer(recipe) {
  const mineralContainer = divContainerCreation("mineral-container");
  const mineralsArray = [
    "Cholesterol",
    Math.round(recipe.totalNutrients.CHOLE.quantity),
    "Sodium",
    Math.round(recipe.totalNutrients.NA.quantity),
    "Calcium",
    Math.round(recipe.totalNutrients.CA.quantity),
    "Magnesium",
    Math.round(recipe.totalNutrients.MG.quantity),
    "Potassium",
    Math.round(recipe.totalNutrients.K.quantity),
    "Iron",
    Math.round(recipe.totalNutrients.FE.quantity),
  ];
  const mineralList = document.createElement("ul");
  for (let i = 0; i < mineralsArray.length; i += 2) {
    const list = document.createElement("li");
    const mineralName = document.createElement("span");
    const mineralValue = document.createElement("span");
    mineralValue.className = "mineral-value list-span";
    mineralName.className = "list-span";
    mineralName.textContent = mineralsArray[i];
    mineralValue.textContent = `${mineralsArray[i + 1]} mg`;
    list.appendChild(mineralName);
    list.appendChild(mineralValue);
    mineralList.appendChild(list);
  }
  mineralContainer.appendChild(mineralList);
  return mineralContainer;
}

function divContainerCreation(className) {
  const divContainer = document.createElement("div");
  divContainer.className = className;
  return divContainer;
}
