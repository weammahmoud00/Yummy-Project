const API_areas = `${API_BASE_URL}list.php?a=list`;
const API_areaDetails = `${API_BASE_URL}filter.php?a=`;

let areas = [];
let eachArea = [];

const fetchAreas = async () => {
    try {
        const response = await fetch(`${API_areas}`);
        const data = await response.json();
        areas = data.meals ;
        console.log(areas);
        displayAreas(areas)
    } catch (error) {
        console.error('Error fetching areas:', error);
    }
};

const fetchEachArea = async (areaName) => {
    try {
        const response = await fetch(`${API_areaDetails}${areaName}`);
        const data = await response.json();
        eachArea = data.meals ;
        console.log(eachArea);
    } catch (error) {
        console.error(`Error fetching area`, error);
    }
};


const displayAreas = (areas) => {
    mealsContainer.innerHTML = "";

    areas.forEach((area) => {
        const areaCard = `
        <div class="col-3">
          <div class="card bg-black" data-area="${area.strArea}" style="width: 17rem; height: 13rem;">
             <div class="d-flex flex-column align-items-center justify-content-center text-white">
                  <i class="fa-solid fa-house-laptop fa-4x my-4"></i>
                  <h2>${area.strArea}</h2>
             </div>
          </div>
        </div>
        `;
        mealsContainer.innerHTML += areaCard;
    });

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function () {
            const area = this.getAttribute('data-area');
            fetchEachArea(area).then(() => {
                displayEachArea(eachArea);
            });
        });
    });
};

const displayEachArea = (area) => {
    mealsContainer.innerHTML = "";

    area.forEach((meal) => {
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


const area = document.getElementById("area");
area.addEventListener("click", () => {
    fetchAreas();

    const sidebar = $(".sidebar");
    if (sidebar.css("left") === "0px") {
        sidebar.animate({ left: `-138.6px` }, 500);
    }
});
