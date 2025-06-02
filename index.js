let mainPokeTeamList = [];

function addPokeToTeam() {
    
}

function savePokemon() {
    const inputPokeName = document.getElementById("poke_name");
    const inputPokeSprite = document.getElementById("poke_sprite");

    const newPoke = {
        pokeName: inputPokeName.value,
        pokeSprite: inputPokeSprite.value
    }

    addPokeToTeam(newPoke);

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