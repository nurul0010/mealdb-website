document.getElementById('button-search').addEventListener('click', function () {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;
    if (inputFieldText == '') {
        // console.log('empty')
        const place = document.getElementById('title');
        place.innerText = 'searchbox can not be empty';

    }
    else {
        // console.log(inputFieldText);
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFieldText}
`;

        fetch(url)
            .then(res => res.json())
            .then(data => displayFood(data.meals));
        // .then(data => console.log(data));

        inputField.value = '';
    }

})

const displayFood = (meals) => {
    // console.log(meals)
    const cardContainer = document.getElementById('cards-container');

    cardContainer.innerHTML = '';
    // if (meals.length == 0) {
    //     console.log('no results found')
    // }

    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div onclick="loadData(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
    </div>`;
        cardContainer.appendChild(div);
    });
}

const loadData = (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url).then(res => res.json())
        .then(data => dataInfo(data.meals[0]));
}

const dataInfo = meal => {

    const container = document.getElementById('container');
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">Area: ${meal.strArea}</p>
                <p class="card-text">Category: ${meal.strCategory}</p>
                <p class="card-text">Weight: ${meal.strMeasure1}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Youtube link</a>
            </div>`;
    container.appendChild(div);
}