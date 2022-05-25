import {pokemonArray} from "./data/pokemon.js";

const cardContainer = document.getElementById("card-container");

if (pokemonArray != null) {
    console.log("Array imported");
}

pokemonArray.forEach((pokemon) => {
    // console.log(pokemon.name);
})

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

cardContainer.innerHTML += buildCard(pokemonArray[0]);
cardContainer.innerHTML += buildCard(pokemonArray[3]);
cardContainer.innerHTML += buildCard(pokemonArray[6]);
