// submit button detection and search result display
const submitBtn = document.querySelector('.search-btn');
submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const searchForm = document.querySelector('.search-input').value;
    if (searchForm.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchForm}`)
            .then(res => res.json())
            .then(data => {
                const searchResults = document.getElementById('search-results');
                searchResults.innerHTML = `<h1 class="search-result">Search result for '${searchForm}'</h1>`
                if (data.meals == null) {
                    searchResults.innerHTML = `<p class="search-result">no search results found for '${searchForm}', Please try again</p>`
                    const searchMeals = document.querySelector('.search-meals');
                    searchMeals.style.display = 'none';
                } else {
                    const searchMeals = document.querySelector('.search-meals');
                    searchMeals.innerHTML = data.meals.map(meals => `
                    <div onclick="foodPopup(${meals.idMeal})" id="searchMeal" class="search-meal">
                    <img src="${meals.strMealThumb}"></img>
                    <h2 class="meal-name">${meals.strIngredient1}</h2>
                    </div>`)
                }
            })
    } else {
        const popupAlert = document.querySelector('.popup');
        popupAlert.style.display = 'block';
    }
})

const popupClose = document.querySelector('.popup-close');
popupClose.addEventListener('click', function(e) {
    const popupArea = document.querySelector('.popup');
    popupArea.style.display = 'none';
});


// food detail displays in a popup
function foodPopup(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            const foodDetails = document.getElementById('foodDetailPopup');
            foodDetails.style.display = 'block'
            foodDetails.innerHTML = data.meals.map(meals => `<div class="foodContainer">
            <div class="foodPopupClose"><i class="fas fa-times"></i></div>
            <img src="${meals.strMealThumb}"></img>
            <h2 class="meal-name">${meals.strIngredient1}</h2>
            <ul>
            <li><i class="fas fa-check-square"></i>${meals.strArea}</li>
            <li><i class="fas fa-check-square"></i>${meals.strCategory}</li>
            <li><i class="fas fa-check-square"></i>${meals.strIngredient3}</li>
            <li><i class="fas fa-check-square"></i>${meals.strIngredient4}</li>
            <li><i class="fas fa-check-square"></i>${meals.strIngredient8}</li>
            </ul
            </div>`)

            const foodPopupClose = document.querySelector('.foodPopupClose');
            foodPopupClose.addEventListener('click', function() {
                const food = document.getElementById('foodDetailPopup');
                food.style.display = 'none'
            })
        })
}