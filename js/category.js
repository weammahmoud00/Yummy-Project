const API_categories = `${API_BASE_URL}categories.php`;
const API_catDetails = `${API_BASE_URL}filter.php?c=`;

let category = [];
let eachcategory = [];


const fetchMealsCategory = async () => {
    try {
        const response = await fetch(`${API_categories}`);
        const data = await response.json();
        category = data.categories;
        displayCatResults(category);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};


const fetchEachCategory = async (categoryName) => {
    try {
        const response = await fetch(`${API_catDetails}${categoryName}`);
        const data = await response.json();
        eachcategory = data.meals;
        console.log(eachcategory);
        
        displayFilteredMeals(eachcategory);
    } catch (error) {
        console.error('Error fetching category:', error);
    }
};

const displayCatResults = (mealsCat) => {
    mealsContainer.innerHTML = "";

    mealsCat.forEach((cat) => {
        const catCard = `
            <div class="col-3">
                <div class="card bg-transparent" data-category="${cat.strCategory}" style="width: 17rem; height: 13rem;">
                    <img src="${cat.strCategoryThumb}" class="rounded-bottom-1 card-img-top w-100 h-100" alt="${cat.strCategory}">
                    <div class="card-body d-flex flex-column align-items-center justify-content-center">
                        <h1>${cat.strCategory}</h1>
                        <p class="card-text text-center">${cat.strCategoryDescription.slice(0, 100)}...</p>
                    </div>
                </div>
            </div>
        `;
        mealsContainer.innerHTML += catCard;
    });

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            fetchEachCategory(category);
        });
    });
};

const displayFilteredMeals = (filteredMeals) => {
    mealsContainer.innerHTML = "";

    filteredMeals.forEach((meal) => {
        const mealCard = `
            <div class="col-3">
                <div class="card bg-transparent" style="width: 17rem; height: 13rem;" data-idMeal="${meal.idMeal}">
                    <img src="${meal.strMealThumb}" class="rounded-bottom-1 card-img-top w-100 h-100" alt="${meal.strMeal}">
                    <div class="card-body d-flex flex-column align-items-center justify-content-center">
                        <h1>${meal.strMeal}</h1>
                    </div>
                </div>
            </div>
        `;
        mealsContainer.innerHTML += mealCard;
    });
    
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function () {
            const mealId = this.getAttribute('data-idMeal');
            getMealDetails(mealId);
        });
    });
};


const cat = document.getElementById("category");
cat.addEventListener("click", () => {
    fetchMealsCategory();

    const sidebar = $(".sidebar");
    if (sidebar.css("left") === "0px") {
        sidebar.animate({ left: `-138.6px` }, 500);
    }
});

