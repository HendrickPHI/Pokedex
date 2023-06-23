const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const pokemonHp = document.querySelector('.pokemon_hp');
const pokemonAtack = document.querySelector('.pokemon_attack');
const pokemonDefense = document.querySelector('.pokemon_defense');
const pokemonAtackSp = document.querySelector('.pokemon_attackSp');
const pokemonDefenseSp = document.querySelector('.pokemon_defenseSp');
const pokemonSpeed = document.querySelector('.pokemon_speed');
const pokemonTotal = document.querySelector('.pokemon_total');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 
    const data = await APIResponse.json();
    return data;
}

const renderPokemon = async(pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonHp.innerHTML = data['stats']['0']['base_stat'];
        pokemonAtack.innerHTML = data['stats']['1']['base_stat'];
        pokemonDefense.innerHTML = data['stats']['2']['base_stat'];
        pokemonAtackSp.innerHTML = data['stats']['3']['base_stat'];
        pokemonDefenseSp.innerHTML = data['stats']['4']['base_stat'];
        pokemonSpeed.innerHTML = data['stats']['5']['base_stat'];

        const hp = parseInt(pokemonHp.innerHTML);
        const speed = parseInt(pokemonSpeed.innerHTML);
        const ata = parseInt(pokemonAtack.innerHTML);
        const ataSp= parseInt(pokemonAtackSp.innerHTML);
        const def= parseInt(pokemonDefense.innerHTML);
        const defSp = parseInt(pokemonDefenseSp.innerHTML);
        const total = hp + speed + ataSp + ata + def + defSp;

        pokemonTotal.innerHTML = total;

        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}


form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', (event) =>{
    if(searchPokemon > 1){
        searchPokemon --;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', (event) =>{
    searchPokemon ++;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
