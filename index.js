//Lista para salvar os Pokémons
let mainPokeTeamList = [];

//Função para salvar o Pokémon na tabela
function addPokeToTeam(pokemon) {
    //Cria o nome
    const pokeNameTeam = document.createElement('p');
    pokeNameTeam.innerText = pokemon.pokeName;

    //Cria a imagem
    const pokeSpriteTeam = document.createElement('img');
    pokeSpriteTeam.src = pokemon.pokeSprite;

    //Adiciona na célula
    const pokeColumn = document.createElement('td');
    pokeColumn.appendChild(pokeSpriteTeam);
    pokeColumn.appendChild(pokeNameTeam);

    //Adiciona na tabela em si
    const pokeTeamTable = document.getElementById("table_team");

    //Se for o primeiro Pokémon ou a cada múltiplo de 3, cria uma nova linha
    if (mainPokeTeamList.length % 3 === 0) {
        const newRow = document.createElement('tr');
        pokeTeamTable.appendChild(newRow);
    }

    //Adiciona na última linha da tabela
    const lastRow = pokeTeamTable.lastElementChild;
    lastRow.appendChild(pokeColumn);
}

//Função para salvar o Pokémon como objeto
//Se houver mais de 6 Pokémon salvos, terá este erro:
function savePokemon() {
    if (mainPokeTeamList.length >= 6) {
        alert("Limite de 6 Pokémon no time! Remova um antes de adicionar outro.");
        return;
    }

    const inputPokeName = document.getElementById("poke_name");
    const inputPokeSprite = document.getElementById("poke_sprite").src;

    const newPoke = {
        pokeName: inputPokeName.value,
        pokeSprite: inputPokeSprite
    }

    addPokeToTeam(newPoke);

    mainPokeTeamList.push(newPoke);

    localStorage.setItem("table_team", JSON.stringify(mainPokeTeamList));

}

//Função para carregar os Pokémon que foram salvos anteriormente no localStorage
function loadPokemon() {
    const storage = JSON.parse(localStorage.getItem("table_team"));
    mainPokeTeamList = storage ? storage : [];

    //Reinsire os Pokémon salvos anteriormente na tabela
    for (let pokemon of mainPokeTeamList) {
        pokeName = pokemon.pokeName;
        pokeSprite = pokemon.pokeSprite;
        addPokeToTeam(pokemon);
    }

}

//Função de pesquisa API para localizar Pokémon
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

//Gerenciador de eventos
function manageEvent() {
    //Para carregar os Pokémon salvos no localStorage
    loadPokemon();

    //Para buscar o Pokémon na API
    const inputPokeName = document.getElementById("poke_name");
    inputPokeName.addEventListener("focusout", pokeSearch);

    //Para salvar o Pokémon
    const saveButton = document.getElementById("save_button");
    saveButton.addEventListener("click", savePokemon);
}

window.addEventListener("load", manageEvent);