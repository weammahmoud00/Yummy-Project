const mealsContainer = document.getElementById('meals-container');

    //////////////////////////////////////////////  API ////////////////////////////////////////////////

    const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/";
    const API_searchByName = `${API_BASE_URL}search.php?s=`;
    const API_searchByLetter = `${API_BASE_URL}search.php?f=`;

    const fetchMeals = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.meals;
        } catch (error) {
            console.error('Error fetching meals:', error);
            return null;
        }
    };

    const searchMealsByName = async (name) => {
        const meals = await fetchMeals(`${API_searchByName}${name}`);
        displaySearchResults(meals);
    };

    const searchMealsByLetter = async (letter) => {
        try {
            const response = await fetch(`${API_searchByName}`);
            const data = await response.json();

            if (data.meals) {
                const filteredMeals = data.meals.filter(meal => meal.strMeal.toLowerCase().includes(letter.toLowerCase())
                );
                displaySearchResults(filteredMeals);
            } else {
                displaySearchResults(null);
            }
        } catch (error) {
            console.error('Error fetching meals by letter:', error);
        }
    };




    

    //////////////////////////////////////////////  UI  ////////////////////////////////////////////////

    const createSearchUI = () => {
        const container = `
            <div class="search-container">
                <div class="row mb-4">
                    <div class="col-6">
                        <input type="text" id="search-by-name" class="form-control bg-transparent s-input" placeholder="Search by name">
                    </div>
                    <div class="col-6">
                        <input type="text" id="search-by-letter" class="form-control bg-transparent s-input" placeholder="Search by first letter">
                    </div>
                </div>
                <div id="search-results" class="row"></div>
            </div>
        `;

        mealsContainer.innerHTML = container;

        document.getElementById('search-by-name').addEventListener('input', (e) => {
            const name = e.target.value.trim();
            if (name) {
                searchMealsByName(name);
            } else {
                clearSearchResults();
            }
        });

        document.getElementById('search-by-letter').addEventListener('input', (e) => {
            const letter = e.target.value.trim();
            if (letter && letter.length === 1) {
                searchMealsByLetter(letter);
            } else {
                clearSearchResults();
            }
        });
    };







    //////////////////////////////////////////////  DISPLAY  ////////////////////////////////////////////////

    const displaySearchResults = (meals) => {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';

        if (!meals) {
            resultsContainer.innerHTML = `<p class="text-danger">No meals found.</p>`;
            return;
        }

        meals.forEach((meal) => {
            const mealCard = `
                <div class="col-3">
            <div class="card" data-id="${meal.idMeal}" style="width: 19.3rem; height: 20rem;">
                <img src="${meal.strMealThumb}" class="rounded-bottom-1 card-img-top w-100 h-100" alt="${meal.strMeal}">
                <div class="card-body d-flex align-items-center">
                    <p class="card-text fs-3">${meal.strMeal}</p>
                </div>
            </div>
        </div>
            `;
            resultsContainer.innerHTML += mealCard;
        });
    };




    const clearSearchResults = () => {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';
    };



    //////////////////////////////////////////////  EVENT HANDLERS  ////////////////////////////////////////////////

    const searchButton = document.getElementById("search");
    searchButton.addEventListener("click", () => {
        createSearchUI();
        const sidebar = $(".sidebar");
        if (sidebar.css("left") === "0px") {
            sidebar.animate({ left: `-138.6px` }, 500);
        }
    });