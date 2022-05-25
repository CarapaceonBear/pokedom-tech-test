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
        // need to find better solution vs reloading
        copyArray.forEach((pokemon) => {
            cardContainer.innerHTML += buildCard(pokemon);
        });
    }
    let refinedArray = searchText(searchTerm, copyArray)
    cardContainer.innerHTML = "";
    refinedArray.forEach((pokemon) => {
        cardContainer.innerHTML += buildCard(pokemon);
    });
}

const onTypeSelected = (event) => {
    if ((findTypeOne.value == "none") && (findTypeTwo.value == "none")) {
        // need to find better solution vs reloading
        cardContainer.innerHTML = "";
        copyArray.forEach((pokemon) => {
            cardContainer.innerHTML += buildCard(pokemon);
        });
        return;
    }
    let types = [findTypeOne.value, findTypeTwo.value];
    let refinedArray = searchType(types, copyArray);
    cardContainer.innerHTML = "";
    refinedArray.forEach((pokemon) => {
        cardContainer.innerHTML += buildCard(pokemon);
    });
}

const searchText = (search, array) => {
    let request = search.toLowerCase();
    let filteredArray = array.filter((item) => {
        return item.name.includes(request);
    })
    return filteredArray;
}

const searchType = (selections, array) => {
    let firstFilter = []
    if (selections[0] != "none") {
        firstFilter = array.filter((item) => {
            return ((item.types[0] == selections[0]) || (item.types[1] == selections[0]))
        });
    }
    let secondFilter = []
    if (selections[1] != "none") {
        secondFilter = array.filter((item) => {
            return ((item.types[0] === selections[1]) ||(item.types[1] === selections[1]))
        });
    }
    if (secondFilter.length == 0) {
        return firstFilter;
    } 
    if (firstFilter.length == 0) {
        return secondFilter;
    }
    if (firstFilter.length > secondFilter.length) {
        return reduceFilters(firstFilter, secondFilter) ;
    } else {
        return reduceFilters(secondFilter, firstFilter);
    }
}

const reduceFilters = (longer, shorter) => {
    let result = [];
    shorter.forEach((shortItem) => {
        let isDuplicate = false;
        longer.forEach((longItem) => {
            shortItem == longItem ? isDuplicate = true : null;
        })
        isDuplicate ? result.push(shortItem) : null;
    })
    return result;
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

