document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const itemURL = urlParams.get("url");
  fetchRecipeData(itemURL);
});

function fetchRecipeData(itemURL) {
  document.getElementById("loading").style.display = "flex";
  fetch(`${itemURL}&app_id=2a32cabc&app_key=6f133742ee04b89dfd41a5ea637de880`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("loading").style.display = "none";
      displayPage(data);
    })
    .catch((error) => console.log("error: ", error));
}

function displayPage(data) {
  let dataArray = Object.values(data)[0];
  const mainContainer = document.getElementById("main-container");

  const headSection = createHeadSection(dataArray);
  mainContainer.appendChild(headSection);

  const contentSection = createContentSection(dataArray);
  mainContainer.appendChild(contentSection);
}

function createHeadSection(dataArray) {
  const headSection = divContainerCreation("head-section");

  const imageContainer = divContainerCreation("image-container");
  const imageElement = imageElementCreation(
    dataArray.image,
    "Food image",
    "food-image"
  );
  imageContainer.appendChild(imageElement);
  headSection.appendChild(imageContainer);

  const headingContainer = divContainerCreation("heading-container");
  const labelContainer = createLabelContainer(dataArray);
  headingContainer.appendChild(labelContainer);
  headSection.appendChild(headingContainer);
  return headSection;
}

function createContentSection(dataArray) {
  const contentSection = createSectionContainer("content-section");

  const ingredientsSection = createIngredientsSection(dataArray.ingredients);
  contentSection.appendChild(ingredientsSection);

  const instructionSection = createInstructionSection(dataArray.url);
  contentSection.appendChild(instructionSection);
  const nutrientSection = createNutrientSection(dataArray);
  contentSection.appendChild(nutrientSection);
  return contentSection;
}

function createLabelContainer(dataArray) {
  const labelContainer = divContainerCreation("label-container");
  const labelElement = createHeadingElement(
    "h1",
    dataArray.label,
    "main-heading"
  );
  labelContainer.appendChild(labelElement);

  const itemInformationContainer = divContainerCreation(
    "item-information-container"
  );
  itemInformationContainer.appendChild(
    createInformationItem("Servings: ", dataArray.yield, "information-label")
  );
  itemInformationContainer.appendChild(
    createInformationItem(
      "Cuisine Type: ",
      dataArray.cuisineType,
      "information-label information-label-two"
    )
  );
  itemInformationContainer.appendChild(
    createInformationItem(
      "Meal Type: ",
      dataArray.mealType,
      "information-label information-label-three"
    )
  );
  itemInformationContainer.appendChild(
    createInformationItem(
      "Dish Type: ",
      dataArray.dishType,
      "information-label information-label-four"
    )
  );
  labelContainer.appendChild(itemInformationContainer);
  return labelContainer;
}

function createInformationItem(label, value, className) {
  const container = divContainerCreation("information-item");
  const labelElement = paragraphElementCreation(label, className);
  const valueElement = paragraphElementCreation(value, "");
  container.appendChild(labelElement);
  container.appendChild(valueElement);
  return container;
}

function createIngredientsSection(ingredients) {
  const ingredientSection = divContainerCreation("ingredients-section");
  const ingredientHeading = createHeadingElement(
    "h2",
    "Ingredients Required",
    "ingredient-heading"
  );
  ingredientSection.appendChild(ingredientHeading);

  const container = divContainerCreation("ingredients-container");
  ingredients.forEach((item) => {
    const ingredientCard = createIngredientCard(item);
    container.appendChild(ingredientCard);
  });
  ingredientSection.appendChild(container);
  return ingredientSection;
}

function createIngredientCard(item) {
  const ingredientCard = divContainerCreation("ingredient-card");

  const imageContainer = divContainerCreation("ingredient-image-container");
  const ingredientImage = imageElementCreation(
    item.image,
    "Ingredient image",
    "ingredient-image"
  );
  imageContainer.appendChild(ingredientImage);
  ingredientCard.appendChild(imageContainer);

  const labelContainer = divContainerCreation("ingredient-text-container");
  const ingredientLabel = createHeadingElement(
    "h3",
    item.text,
    "ingredient-text"
  );
  labelContainer.appendChild(ingredientLabel);

  const weightCategoryContainer = divContainerCreation(
    "weight-category-container"
  );
  weightCategoryContainer.appendChild(
    paragraphElementCreation(
      `Weight: ${Math.round(item.weight)}g`,
      "weight-element"
    )
  );
  weightCategoryContainer.appendChild(
    paragraphElementCreation(
      `Category: ${item.foodCategory}`,
      "category-element"
    )
  );

  labelContainer.appendChild(weightCategoryContainer);
  ingredientCard.appendChild(labelContainer);
  return ingredientCard;
}

function createInstructionSection(url) {
  const instructionsSection = createSectionContainer("instructions-section");
  const instructionLabel = createHeadingElement(
    "h2",
    "Cooking Instructions",
    "instruction-label"
  );
  instructionsSection.appendChild(instructionLabel);

  const instructionPanel = divContainerCreation("instruction-panel");
  const instructionCardFirstText = paragraphElementCreation(
    "Ready for some kitchen fun ?",
    "instruction-card-text"
  );

  const instructionImage = imageElementCreation(
    "../../assets/Images/cooks-professional set.jpg",
    "cooking image",
    "instruction-image"
  );

  const cardClickingInstruction = paragraphElementCreation(
    "Click this card and get cooking with the full Instructions !",
    "card-clicking-instruction"
  );
  instructionPanel.appendChild(instructionCardFirstText);
  instructionPanel.appendChild(instructionImage);
  instructionPanel.appendChild(cardClickingInstruction);
  instructionPanel.addEventListener("click", () => {
    window.location.href = url;
  });
  instructionsSection.appendChild(instructionPanel);
  return instructionsSection;
}

function createNutrientSection(dataArray) {
  const nutrientSection = createSectionContainer("nutrient-section");

  const nutrientFactContainer = divContainerCreation("nutrient-fact-container");
  const nutrientHeadingContainer = divContainerCreation(
    "nutrient-heading-container"
  );
  const nutrientFactLabel = createHeadingElement(
    "h2",
    "Nutrient Facts",
    "nutrient-fact-label"
  );
  nutrientHeadingContainer.appendChild(nutrientFactLabel);
  nutrientFactContainer.appendChild(nutrientHeadingContainer);

  const chartContainer = divContainerCreation("chart-container");
  const canvas = createCanvasElement("calories-chart");
  chartContainer.appendChild(canvas);
  createNutrientChart(canvas, dataArray);
  nutrientFactContainer.appendChild(chartContainer);

  const nutrientInfoContainer = divContainerCreation("nutrient-info-container");
  const fatElement = paragraphElementCreation(
    `Fat : ${Math.round(dataArray.totalNutrients.FAT.quantity)} g`,
    "nutrient-element fat-element"
  );
  const carbsElement = paragraphElementCreation(
    `Carbs : ${Math.round(dataArray.totalNutrients.CHOCDF.quantity)} g`,
    "nutrient-element carbs-element"
  );
  const proteinElement = paragraphElementCreation(
    `Protein : ${Math.round(dataArray.totalNutrients.PROCNT.quantity)} g`,
    "nutrient-element protein-element"
  );

  nutrientInfoContainer.appendChild(fatElement);
  nutrientInfoContainer.appendChild(carbsElement);
  nutrientInfoContainer.appendChild(proteinElement);
  nutrientFactContainer.appendChild(nutrientInfoContainer);

  nutrientSection.appendChild(nutrientFactContainer);

  const nutrientListContainer = createTotalNutrients(dataArray);
  nutrientSection.appendChild(nutrientListContainer);
  return nutrientSection;
}

function createTotalNutrients(dataArray) {
  const totalNutrientContainer = divContainerCreation(
    "total-nutrient-container"
  );
  const headingElement = createHeadingElement(
    "h2",
    "Total Nutrients",
    "total-nutrient-heading"
  );
  totalNutrientContainer.appendChild(headingElement);
  const container = divContainerCreation("nutrient-list-container");
  const calorieContainer = createLabelValueContainer(
    "Calories",
    Math.round(dataArray.calories)
  );
  calorieContainer.className = "calorie-container";
  container.appendChild(calorieContainer);

  const nutrientArray = Object.values(dataArray.totalNutrients);
  nutrientArray.forEach((item) => {
    const nutrientContainer = createLabelValueContainer(
      item.label,
      `${Math.round(item.quantity)} ${item.unit}`
    );
    container.appendChild(nutrientContainer);
  });
  totalNutrientContainer.appendChild(container);
  return totalNutrientContainer;
}

function createNutrientChart(canvas, dataArray) {
  const ctx = canvas.getContext("2d");
  const fat = dataArray.totalNutrients.FAT.quantity;
  const carbs = dataArray.totalNutrients.CHOCDF.quantity;
  const protein = dataArray.totalNutrients.PROCNT.quantity;

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["FAT", "CARBS", "PROTEIN"],
      datasets: [
        {
          data: [fat, carbs, protein],
          backgroundColor: ["#fa3737", "#fcae41", "#75e002"],
        },
      ],
    },
    options: {
      responsive: true,
      cutoutPercentage: 70,
      legend: {
        display: false,
      },
    },
  });
}

function createSectionContainer(className) {
  const section = document.createElement("section");
  section.className = className;
  return section;
}

function divContainerCreation(className) {
  const div = document.createElement("div");
  div.className = className;
  return div;
}

function imageElementCreation(src, alt, className) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.className = className;
  return img;
}

function createHeadingElement(tag, text, className) {
  const heading = document.createElement(tag);
  heading.textContent = text;
  heading.className = className;
  return heading;
}

function paragraphElementCreation(text, className) {
  const p = document.createElement("p");
  p.textContent = text;
  p.className = className;
  return p;
}

function createCanvasElement(className) {
  const canvas = document.createElement("canvas");
  canvas.className = className;
  return canvas;
}

function createLabelValueContainer(label, value) {
  const container = divContainerCreation("label-value-container");
  const labelElement = paragraphElementCreation(label, "label-element");
  const valueElement = paragraphElementCreation(value, "value-element");
  container.appendChild(labelElement);
  container.appendChild(valueElement);
  return container;
}
