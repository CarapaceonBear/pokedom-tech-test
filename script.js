import {pokemonArray} from "./data/pokemon.js";

if (pokemonArray != null) {
    console.log("Array imported");
}

pokemonArray.forEach((pokemon) => {
    console.log(pokemon.name);
})