// Select DOM elements
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsElement = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");

// Search for meals
function searchMeal(e) {
  e.preventDefault();
  const term = search.value.trim();
  mealsElement.innerHTML = "";
  resultHeading.innerHTML = "";

  if (term) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>No results found for '${term}'. Try again!</p>`;
        } else {
          resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
          mealsElement.innerHTML = data.meals
            .map(
              (meal) => `
              <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="meal-info" data-mealid="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
                  <button class="details-btn" onclick="viewMealDetails(${meal.idMeal})">View Details</button>
                </div>
              </div>
            `
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

// View meal details by saving the ID to local storage and navigating to mealDetails.html
function viewMealDetails(mealID) {
  localStorage.setItem("mealID", mealID);
  window.location = "mealDetails.html"; // Redirect to meal details page
}

// Random meal
function getRandomMeal() {
  mealsElement.innerHTML = "";
  resultHeading.innerHTML = "";
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      viewMealDetails(meal.idMeal); // Directly show the random meal
    });
}

// Event listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal); 

// toggle mode ----
const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    toggleButton.innerHTML ='<i class="bi bi-moon-stars"></i>';
  } else {
    toggleButton.innerHTML ='<i class="bi bi-moon-stars-fill"></i>';
  }
});

