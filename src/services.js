const URL = "http://localhost:3000/pokemon";

tabla = document.getElementById('tabla');

//get

async function getAllPokemons() {
    const response = await fetch(URL);
    const data = await response.json();
    printAllPokemons(data);
}

function printAllPokemons(data) {
    data.forEach(pokemon => {
        addPokemonToPokedex(pokemon);
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
            body: JSON.stringify({ nombre, numero, tipo })
        })
        const pokemon = await response.json();
        addPokemonToPokedex(pokemon);
        formulario.reset();
    } catch (error) {
        console.error("Error al crear pokemon:", error);
    }
}

//Delete
async function deletePokemon(id) {
    if (!confirm("¿Desea confirmar la eliminación?")) return;

    try {
        const response = await fetch(`${URL}/${id}`,
        {
            method: "DELETE"
        });
        document.getElementById(`row-${id}`).remove();
        
    } catch (error) {
        console.error("Error al eliminar el pokemon:", error);
    }
}

function addPokemonToPokedex(pokemon) {
    tabla.insertAdjacentHTML("beforeend",
        `
        <tr id="row-${pokemon.id}">
        <td>${pokemon.nombre}</td>
        <td>${pokemon.numero}</td>
        <td>${pokemon.tipo}</td>
        <td><button class="delete-btn" onclick="deletePokemon('${pokemon.id}')">Eliminar</button></td>
        </tr>
        `);
}

//Delete


getAllPokemons();