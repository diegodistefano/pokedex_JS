const URL = "http://localhost:3000/pokemon";

tabla = document.getElementById('tabla');

//get

async function getAllPokemons() {
    const response = await fetch(URL);
    const data = await response.json();
    printAllPokemons(data);
    // return data; 
}

function printAllPokemons(data) {
    data.forEach(pokemon => {
        // addPokemonToPokedex(pokemon)
        tabla.insertAdjacentHTML("beforeend",
            `
            <tr>
            <td>${pokemon.nombre}</td>
            <td>${pokemon.numero}</td>
            <td>${pokemon.tipo}</td>
            </tr>
            `);
    });
}

//Post
async function addNewPokemon() {
    const nombre = document.getElementById('nombre').value;
    const numero = document.getElementById('numero').value;
    const tipo = document.getElementById('tipo').value;

    if (!nombre || !numero || !tipo) {
        alert("Todos los datos son obligatorios");
        return;
    }
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, numero, tipo})
        })
        const newPokemon = await response.json();
        printAllPokemons(newPokemon);
        formulario.reset();
    } catch (error) {
        console.error("Error al crear pokemon:", error);
    }   
}

function addPokemonToPokedex(pokemon) {
    tabla.insertAdjacentHTML("beforeend",
        `
        <tr>
        <td>${pokemon.nombre}</td>
        <td>${pokemon.numero}</td>
        <td>${pokemon.tipo}</td>
        </tr>
        `);
}

//Delete


getAllPokemons();