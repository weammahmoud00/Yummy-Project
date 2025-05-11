//////////////////////////////////////  first loaded page  //////////////////////////////////////


const API_baseURL="https://www.themealdb.com/api/json/v1/1/search.php?s=";
let meals = [];
const getMeals = async () => {
    try {
        const response = await fetch(`${API_baseURL}`);
        const data = await response.json();
        // console.log(data.meals);
        meals = data.meals;
        // console.log(meals);
        
    }
    catch (error) {
        console.error('Error fetching meals:', error);
        return null;
    }
}
getMeals()

const displayMeals = (meals) => {
    let mealsContainer = '';
    meals.slice(0, 20).forEach(meal => { 
        mealsContainer += `
        <div class="col-3">
            <div class="card" data-id="${meal.idMeal}" style="width: 19.3rem; height: 20rem;">
                <img src="${meal.strMealThumb}" class="rounded-bottom-1 card-img-top w-100 h-100" alt="${meal.strMeal}">
                <div class="card-body d-flex align-items-center">
                    <p class="card-text fs-3">${meal.strMeal}</p>
                </div>
            </div>
        </div>
        `;
    });

    document.getElementById('meals-container').innerHTML = mealsContainer;

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function () {
            const mealId = this.getAttribute('data-id');
            getMealDetails(mealId);
        });
    });
};
getMeals().then(() => {
    displayMeals(meals);
});



//////////////////////////////////////  sidebar  //////////////////////////////////////

const innerSidebarWidth = $(".sidebar ul").innerWidth();
$(".sidebar .btn").click(function () {
    const currentLeft = $(".sidebar").css("left");
    if (currentLeft === "0px") {
        $(".sidebar").animate({ left: `-${innerSidebarWidth}px` }, 500);
        $(".change").html(`<i class="fa-solid fa-bars"></i>`);
    } else {
        $(".sidebar").animate({ left: `0px` }, 500);
        $(".change").html(`<i class="fa-solid fa-x"></i>`);
    }
});









