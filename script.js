import {pokemonArray} from "./data/pokemon.js";
const copyArray = [...pokemonArray];

const cardContainer = document.getElementById("card-container");
const searchBox = document.getElementById("search-box");
const findTypeOne = document.getElementById("find-type-one");
const findTypeTwo = document.getElementById("find-type-two");

const buildCard = (object) => {
    let pokemon = object;
    let pokeName = pokemon.name;
    pokeName = `${pokeName[0].toUpperCase()}${pokeName.slice(1, pokeName.length + 1)}`
    return (
        `<div class="card">
        <img class="card__image" src=${pokemon.sprite}>
        <div class="card__content">
        <h2 class="card__heading">
        ${pokeName}
        </h2>
        <p class="card__text">
        ${pokeName} (#${pokemon.id}) is a 
        ${
            pokemon.types.length == 1 ? pokemon.types[0] 
            : pokemon.types[0] + " & " + pokemon.types[1]
                    }
                    type pokemon.
                    </p>
                    </div>
                    </div>`
                    )
}

const onSearchUpdated = (event) => {
    let searchTerm = event.target.value;
    if (searchTerm === "") {
        copyArray.forEach((pokemon) => {
            cardContainer.innerHTML += buildCard(pokemon);
        });
    }
    let refinedArray = searchCards(searchTerm, copyArray)
    cardContainer.innerHTML = "";
    refinedArray.forEach((pokemon) => {
        cardContainer.innerHTML += buildCard(pokemon);
    });
}

const searchCards = (search, array) => {
    let request = search.toLowerCase();
    let filteredArray = array.filter((item) => {
        return item.name.includes(request);
    })
    return filteredArray;
}

// on start
if (copyArray != null) {
    console.log("Array imported");
}
copyArray.forEach((pokemon) => {
    cardContainer.innerHTML += buildCard(pokemon);
})

searchBox.addEventListener("input", onSearchUpdated);
// findTypeOne.addEventListener("change", onTypeOneSelected);
// findTypeTwo.addEventListener("change", onTypeTwoSelected);

