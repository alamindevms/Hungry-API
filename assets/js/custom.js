const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const card = document.getElementById('card');

// Event Listener
searchBtn.addEventListener('click',searchResult)

searchInput.addEventListener('blur',function(){
    if(searchInput.value){
        searchInput.classList.remove("is-invalid");
    }
})

//function

function searchResult(){
    if(searchInput.value){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`)
        .then(res => res.json())
        .then(meals => showMeals(meals))
    }else{
        searchInput.classList.add("is-invalid");
        card.innerHTML = '';
    }
}

const showMeals = meals => {
    let cardCol=''
    if(meals.meals){
        meals.meals.forEach(meal => {
        
            cardCol+= `
                <div class="col-md-4">
                    <div class="card card-body mb-5">
                        <img class="img-fluid" src="${meal.strMealThumb}">
                        <h2 class="mt-3">${meal.strMeal}</h2>
                    </div>
                </div>
            `
           
        });
    }else{
        cardCol+= `
        <div class="col-md-4 mx-auto mt-5">
            <p class="border border-danger p-3 rounded">No result found by ${searchInput.value}</p>
        </div>
    `
    }
    card.innerHTML = cardCol;
}