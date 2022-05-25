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
        `<div class="card" id="${pokemon.name}">
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
        clearSearch();
    }
    let refinedArray = searchByText(searchTerm, copyArray);
    displaySearch(refinedArray, copyArray);
}

const searchByText = (search, array) => {
    let request = search.toLowerCase();
    let filteredArray = array.filter((item) => {
        return item.name.includes(request);
    });
    return filteredArray;
}

const onTypeSelected = () => {
    if ((findTypeOne.value == "none") && (findTypeTwo.value == "none")) {
        clearSearch();
        return;
    }
    let types = [findTypeOne.value, findTypeTwo.value];
    let refinedArray = searchByType(types, copyArray);
    displaySearch(refinedArray, copyArray);
}

const searchByType = (selections, array) => {
    let firstSet = [];
    if (selections[0] != "none") {
        firstSet = array.filter((item) => {
            return ((item.types[0] == selections[0]) || (item.types[1] == selections[0]));
        });
    }
    let secondSet = [];
    if (selections[1] != "none") {
        secondSet = array.filter((item) => {
            return ((item.types[0] === selections[1]) ||(item.types[1] === selections[1]));
        });
    }
    if (firstSet.length == 0) {
        return secondSet;
    }
    if (secondSet.length == 0) {
        return firstSet;
    } 
    if (firstSet.length > secondSet.length) {
        return findInBoth(firstSet, secondSet) ;
    } else {
        return findInBoth(secondSet, firstSet);
    }
}

const findInBoth = (longer, shorter) => {
    let result = [];
    shorter.forEach((shortItem) => {
        let isDuplicate = false;
        longer.forEach((longItem) => {
            shortItem == longItem ? isDuplicate = true : null;
        });
        isDuplicate ? result.push(shortItem) : null;
    });
    return result;
}

const displaySearch = (searchResults, fullArray) => {
    fullArray.forEach((pokemon) => {
        let isHidden = true;
        let card = document.getElementById(pokemon.name);
        searchResults.forEach((result) => {
            if (card.id == result.name) {
                isHidden = false;
            }
        });
        isHidden ? card.classList.add("card__hidden") : card.classList.remove("card__hidden");
    });
}
const clearSearch = () => {
    copyArray.forEach((pokemon) => {
        let card = document.getElementById(pokemon.name);
        card.classList.remove("card__hidden")
    });
}

// on start
if (copyArray != null) {
    console.log("Array imported");
}
copyArray.forEach((pokemon) => {
    cardContainer.innerHTML += buildCard(pokemon);
})

searchBox.addEventListener("input", onSearchUpdated);
findTypeOne.addEventListener("change", onTypeSelected);
findTypeTwo.addEventListener("change", onTypeSelected);

