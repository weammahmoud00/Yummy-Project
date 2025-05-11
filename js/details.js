//////////////////////////////////////  Details page  //////////////////////////////////////




const API_baseURL_id = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";


const urlParam = new URLSearchParams(window.location.search);   ////// السطر د بيرجع ال query عشان اعرف اجيب منها ال Id
const mealId = urlParam.get('id');

const getMealDetails = async (id) => {
    try {
        const response = await fetch(`${API_baseURL_id}${id}`);
        const data = await response.json();
        const meal = data.meals[0];

        const mealsContainer = document.getElementById('meals-container');
        mealsContainer.innerHTML = `
            <div class="meal-details row text-white">
                <div class="col-5">
                    <img src="${meal.strMealThumb}" class="w-100 rounded" alt="${meal.strMeal}">
                    <h1>${meal.strMeal}</h1>
                </div>
                <div class="col-7">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <p class="fs-2"><strong>Area:</strong> ${meal.strArea}</p>
                    <p class="fs-2"><strong>Category:</strong> ${meal.strCategory}</p>
                    <h3>Recipes:</h3>
                    <ul class="list-unstyled d-flex flex-wrap"> <!-- Added flex-wrap class -->
                        ${Object.entries(meal)
                            .filter(([key, value]) => key.startsWith('strIngredient') && value)
                            .map(([key, value]) => `<li class="bg-light px-2 mx-2 my-2 py-2 rounded-2 text-dark">${value}  ${meal[`strMeasure${key.slice(13)}`]}</li>`)
                            .join('')}
                    </ul>
                    <h3>Tags :</h3>
                    <div class="d-flex">
                        <a style="width:100px" class="btn btn-success m-2" href="${meal.strSource}">Sourse</a>
                        <a style="width:100px" class="btn btn-danger m-2" href="${meal.strYoutube}">YouTube</a>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
};
if (mealId) {
    getMealDetails(mealId);
}


////////////////////////////////////////              شرح             ////////////////////////////////

                    // هنا بقا هتفلتر الkeys الى موجود ف الاوبجكت 
                    // و تطبعهم و تطبع القيمة بتاعتهم 

                    //     ${Object.entries(meal)
                    //         .filter(([key, value]) => key.startsWith('strIngredient') && value)
                    //         .map(([key, value]) => `<li class="bg-light px-2 mx-2 py-2 rounded-2 text-dark">${value}  ${meal[`strMeasure${key.slice(13)}`]}</li>`)
                    //         .join('')}

