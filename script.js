// Функция для получения списка покемонов
async function fetchPokemons() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Ошибка при получении списка покемонов:", error);
        return [];
    }
}

// Функция для получения подробной информации о покемоне
async function fetchPokemonDetails(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Ошибка при получении данных покемона:", error);
    }
}

// Функция для создания карточки покемона
function createPokemonCard(container, pokemon) {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;
    img.classList.add("pokemon-image");

    const name = document.createElement("h3");
    name.textContent = pokemon.name;
    name.classList.add("pokemon-name");

    card.appendChild(img);
    card.appendChild(name);
    container.appendChild(card);
}

// Основная функция для отображения покемонов на странице
async function displayPokemons() {
    const container = document.getElementById("pokemon-container");
    const pokemons = await fetchPokemons();

    for (let pokemon of pokemons) {
        const details = await fetchPokemonDetails(pokemon.url);
        if (details) {
            createPokemonCard(container, details);
        }
    }
}

// Запуск функции после загрузки страницы
document.addEventListener("DOMContentLoaded", displayPokemons);