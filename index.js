let mainPokeTeamList = [];

function addPokeToTeam(pokemon) {
    const newColumn = document.createElement('td');
    const pokeNameTeam = document.createElement('td');
    const pokeSpriteTeam = document.createElement('img');

    pokeSpriteTeam.src = pokemon.pokeSprite;
    pokeNameTeam.innerHTML = pokemon.pokeName;

    
    newColumn.appendChild(pokeSpriteTeam);
        
    const pokeTeamTable = document.getElementById("table_team");
    pokeTeamTable.appendChild(newColumn);
}

function savePokemon() {
    const inputPokeName = document.getElementById("poke_name");
    const inputPokeSprite = document.getElementById("poke_sprite").src;

    const newPoke = {
        pokeName: inputPokeName.value,
        pokeSprite: inputPokeSprite
    }

    addPokeToTeam(newPoke);
    console.log(newPoke.pokeSprite);
    mainPokeTeamList.push(newPoke);

}

function pokeSearch() {
    const inputPokeName = document.getElementById("poke_name");
    const pokeNameValue = inputPokeName.value;
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokeNameValue)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            document.getElementById("poke_name_info").innerText = json.name;
            document.getElementById("poke_number").innerText = json.order;
            document.getElementById("poke_type0").innerText = json.types[0].type.name;
            document.getElementById("poke_sprite").src = json.sprites.front_default;
        });
}

function manageEvent() {
    const inputPokeName = document.getElementById("poke_name");
    inputPokeName.addEventListener("focusout", pokeSearch);
    const saveButton = document.getElementById("save_button");
    saveButton.addEventListener("click", savePokemon);
}

window.addEventListener("load", manageEvent);