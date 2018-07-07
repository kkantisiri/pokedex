// JavaScript File
let searchForm = document.getElementById("searchForm")
let searchField = document.getElementById("searchField")
let pokemonName = document.getElementById("pokemonName")
let pokemonImage = document.getElementById("pokemonImage")
let pokemonDescription = document.getElementById("pokemonDescription")

function lookup(resource, callback) {
    get(`https://pokeapi.co/api/v2/${resource}/`, response => callback(JSON.parse(response)))
}

function lookupPokemonGeneric(id, callback) {
    lookup(`pokemon/${id}`, callback)
}

function lookupPokemonSpecies(id, callback) {
    lookup(`pokemon-species/${id}`, callback)
}

function lookupPokemon(id, genericCallback, speciesCallback) {
    lookupPokemonGeneric(id, genericCallback)
    lookupPokemonSpecies(id, speciesCallback)
}

function get(url, callback) {
    let request = new XMLHttpRequest()
    request.open("GET", url, true)
    request.onload = function() {
        if (200 <= this.status && this.status < 400) {
            callback(this.response)
        }
        else {
            //failure
        }
    }
    request.onerror = function() {
        //error
    }
    request.send()
}

searchForm.addEventListener("submit", event => {
    event.preventDefault()
    
    lookupPokemon(
        searchField.value.trim().toLowerCase(),
        genericData => {
            pokemonImage.src = genericData.sprites.front_default
        },
        speciesData => {
            let name = speciesData.names.find(name => name.language.name == "en").name
            pokemonName.textContent = name
            
            let description = speciesData.flavor_text_entries.find(entry => entry.language.name == "en" && entry.version.name == "x").flavor_text
            pokemonDescription.textContent = description
        }
    )
    
    
}) 


