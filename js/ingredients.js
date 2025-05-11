const API_ingredients = `${API_BASE_URL}list.php?i=list`;
const API_ingredientDetails = `${API_BASE_URL}filter.php?i=`;


let ingredientsList = [];
let selectedIngredient = [];

const fetchIngredients = async () => {
    try {
        const response = await fetch(`${API_ingredients}`);
        const data = await response.json();
        ingredientsList = data.meals ;
        console.log(ingredientsList);
        displayIngredients(ingredientsList);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
    }
};

const displayIngredients = (ingredients) => {
    mealsContainer.innerHTML = "";

    const limitedIngredients = ingredients.slice(0, 20);

    const ingredientCards = limitedIngredients.map((ingredient) => `
        <div class="col-3">
            <div class="card bg-black" data-ingredient="${ingredient.strIngredient}" style="width: 17rem; height: 13rem;">
                <div class="d-flex flex-column align-items-center justify-content-center text-white">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h2>${ingredient.strIngredient}</h2>
                    <p class="text-center">${ingredient.strDescription || 'No description available'}</p>
                </div>
            </div>
        </div>
    `).join('');

    mealsContainer.innerHTML = ingredientCards;

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function () {
            const ing = this.getAttribute('data-ingredient');
            fetchMealsByIngredient(ing).then(() => {
                fetchMealsByIngredient(ing);
            });
        });
    });
};

const fetchMealsByIngredient = async (ingredient) => {
    try {
        const response = await fetch(`${API_ingredientDetails}${ingredient}`);
        if (!response.ok) throw new Error(`Failed to fetch meals: ${response.statusText}`);
        const data = await response.json();
        const meals = data.meals;
        console.log('Meals by Ingredient:', meals);

        displayMealsByIngredient(meals);
    } catch (error) {
        console.error('Error fetching meals by ingredient:', error);
    }
};

const displayMealsByIngredient = (meals) => {
    mealsContainer.innerHTML = "";


    const mealCards = meals.map(meal => `
        <div class="col-3">
            <div class="card bg-transparent" style="width: 17rem; height: 13rem;" data-idMeal="${meal.idMeal}">
                <img src="${meal.strMealThumb}" class="rounded-bottom-1 card-img-top w-100 h-100" alt="${meal.strMeal}">
                <div class="card-body d-flex flex-column align-items-center justify-content-center">
                    <h1>${meal.strMeal}</h1>
                </div>
            </div>
        </div>
    `).join('');

    mealsContainer.innerHTML = mealCards;

    mealsContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (card) {
            const mealId = card.getAttribute('data-idMeal');
            getMealDetails(mealId);
        }
    });
};

const ingredientsButton = document.getElementById("ingredients");
ingredientsButton.addEventListener("click", () => {
    fetchIngredients();

    const sidebar = $(".sidebar");
    if (sidebar.css("left") === "0px") {
        sidebar.animate({ left: `-138.6px` }, 500);
    }
});
