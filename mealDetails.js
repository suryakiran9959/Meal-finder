// Select the DOM element where meal details will be shown
const singleMealElement = document.getElementById("single-meal");

// Get the meal ID from local storage
const mealID = localStorage.getItem("mealID");

if (mealID) {
  getMealById(mealID);
} else {
  singleMealElement.innerHTML = "<p>No meal selected. Please go back to search.</p>";
}

// Fetch meal by ID and display its details
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      displayMealDetails(meal);
    })
    .catch((error) => {
      singleMealElement.innerHTML = "<p>Could not load meal details. Please try again later.</p>";
      console.error(error);
    });
}

// Display meal details and add a back button
function displayMealDetails(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  // Render the meal details and the back button
  singleMealElement.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="main">
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
        <p>${meal.strInstructions}</p>
      </div>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}
      </div>
      <button class="back-button" onclick="goBack()">Back to Search</button>
    </div>
  `;
}

// Back button function to return to index.html
function goBack() {
  window.location = 'index.html'; // Redirect to the main page
}

