function slideImages(slider) {
  let currentIndex = 0;
  const slides = slider.children.length;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 4000);
}
const sliderOne = document.getElementById("slider-one");
const sliderTwo = document.getElementById("slider-two");
const sliderThree = document.getElementById("slider-three");
const sliderFour = document.getElementById("slider-four");

slideImages(sliderOne);
slideImages(sliderTwo);
slideImages(sliderThree);
slideImages(sliderFour);

function searchRecipe() {
  const slideSection = document.getElementById("slide-section");
  slideSection.style.display = "none";
  document.getElementById("loading").style.display = "flex";
  let searchValue = document.getElementById("search-box").value;
  fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&app_id=2a32cabc&app_key=6f133742ee04b89dfd41a5ea637de880&q=${searchValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("loading").style.display = "none";
      createCards(data);
    })
    .catch((error) => console.log("error: ", error));
}

function createCards(data) {
  const cardSection = document.getElementById("card-section");
  const recipes = data.hits;
  const notFoundElement = document.getElementById("not-found");
  cardSection.innerHTML = "";
  if (recipes.length === 0) {
    const notFoundMessage = document.createElement("h1");
    notFoundMessage.id = "not-found";
    notFoundMessage.textContent = "Recipe not found";
    cardSection.appendChild(notFoundMessage);
  } else {
    if (notFoundElement) {
      notFoundElement.remove();
    }
    recipes.forEach((object) => {
      const recipe = object.recipe;
      const label = recipe.label;
      const imageURL = recipe.image;
      const healthLabel = recipe.healthLabels;
      const yield = recipe.yield;
      const calorie = Math.round(recipe.calories);
      const fat = Math.round(recipe.totalNutrients.FAT.quantity);
      const carbs = Math.round(recipe.totalNutrients.CHOCDF.quantity);
      const protein = Math.round(recipe.totalNutrients.PROCNT.quantity);
      const cholesterol = Math.round(recipe.totalNutrients.CHOLE.quantity);
      const sodium = Math.round(recipe.totalNutrients.NA.quantity);
      const calcium = Math.round(recipe.totalNutrients.CA.quantity);
      const magnesium = Math.round(recipe.totalNutrients.MG.quantity);
      const potassium = Math.round(recipe.totalNutrients.K.quantity);
      const iron = Math.round(recipe.totalNutrients.FE.quantity);
      const nutrientArray = ["PROTEIN", protein, "FAT", fat, "CARB", carbs];
      const mineralsArray = [
        "Cholesterol",
        cholesterol,
        "sodium",
        sodium,
        "calcium",
        calcium,
        "magnesium",
        magnesium,
        "potassium",
        potassium,
        "iron",
        iron,
      ];
      const itemURL = object._links.self.href;

      const image = document.createElement("img");
      const cardContainer = document.createElement("div");
      cardContainer.className = "card-container";
      const cardHeader = document.createElement("div");
      cardHeader.className = "card-header";

      const imageContainer = document.createElement("div");
      imageContainer.className = "image-container";
      const imageElement = document.createElement("img");
      imageElement.className = "images";
      imageElement.src = imageURL;
      imageElement.alt = "Food image";
      imageContainer.appendChild(imageElement);

      const headingAndListContainer = document.createElement("div");
      headingAndListContainer.className = "heading-list-container";
      const headingContainer = document.createElement("div");
      headingContainer.className = "heading-container";
      const headingElement = document.createElement("h1");
      headingElement.textContent = label;
      headingContainer.appendChild(headingElement);
      headingAndListContainer.appendChild(headingContainer);

      const listContainer = document.createElement("div");
      listContainer.className = "list-container";
      const unorderedList = document.createElement("ul");
      unorderedList.className = "health-label-list";
      healthLabel.forEach((labels) => {
        const li = document.createElement("li");
        li.innerText = ` ${labels}`;
        unorderedList.appendChild(li);
      });
      listContainer.appendChild(unorderedList);
      headingAndListContainer.appendChild(listContainer);
      cardHeader.appendChild(imageContainer);
      cardHeader.appendChild(headingAndListContainer);

      const cardContent = document.createElement("div");
      cardContent.className = "card-content";
      const calorieContainer = document.createElement("div");
      const servings = document.createElement("h4");
      servings.textContent = `${yield} servings`;
      const calorieIcon = document.createElement("img");
      calorieIcon.className = "calorie-icon";
      calorieIcon.src = "../../assets/Images/icon-calories.jpg";
      calorieIcon.alt = "calorie icon";
      const calorieQuantity = document.createElement("h2");
      calorieQuantity.textContent = `${calorie} kcal`;

      calorieContainer.appendChild(servings);
      calorieContainer.appendChild(calorieIcon);
      calorieContainer.appendChild(calorieQuantity);

      const nutrientsContainer = document.createElement("div");
      nutrientsContainer.className = "nutrient-container";
      const nutrientList = document.createElement("ul");

      for (let i = 0; i < 6; i++) {
        const list = document.createElement("li");
        const nutrientName = document.createElement("span");
        const nutrientValue = document.createElement("span");
        nutrientValue.className = "nutrient-value list-span";
        nutrientName.className = "list-span";
        nutrientName.textContent = nutrientArray[i];
        i++;
        nutrientValue.textContent = `${nutrientArray[i]} g`;
        list.appendChild(nutrientName);
        list.appendChild(nutrientValue);
        nutrientList.appendChild(list);
      }
      nutrientsContainer.appendChild(nutrientList);

      const mineralContainer = document.createElement("div");
      mineralContainer.className = "mineral-container";
      const mineralList = document.createElement("ul");
      for (let i = 0; i < 11; i++) {
        const list = document.createElement("li");
        const mineralName = document.createElement("span");
        const mineralValue = document.createElement("span");
        mineralValue.className = "mineral-value list-span";
        mineralName.className = "list-span";
        mineralName.textContent = mineralsArray[i];
        i++;
        mineralValue.textContent = `${mineralsArray[i]} mg`;
        list.appendChild(mineralName);
        list.appendChild(mineralValue);
        mineralList.appendChild(list);
      }
      mineralContainer.appendChild(mineralList);
      cardContent.appendChild(calorieContainer);
      cardContent.appendChild(nutrientsContainer);
      cardContent.appendChild(mineralContainer);

      cardContainer.appendChild(cardHeader);
      cardContainer.appendChild(cardContent);

      cardSection.appendChild(cardContainer);

      cardContainer.addEventListener("click", () => {
        window.location.href = `../../src/RecipePage/RecipePage.html?url=${itemURL}`;
      });
    });
  }
}
