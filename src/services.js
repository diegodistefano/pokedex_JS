const URL = "http://localhost:3000/pokemon";

tabla = document.getElementById('tabla');

//GET

async function getAllPokemons() {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

//MOSTRAR POKEMONES EN LA TABLA
async function printAllPokemons() {
    const data = await getAllPokemons();
    tabla.innerHTML = "";
    data.forEach(pokemon => {
        addPokemonToPokedex(pokemon);
    });
}

//POST
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
    } catch (error) {
        console.error("Error al crear pokemon:", error);
    }
}

//PUT
async function updatePokemon(id, oldNombre, oldNumero, oldTipo) {
    const nombre = prompt("Nuevo nombre:", oldNombre)?.trim();
    const numero = prompt("Nuevo numero:", oldNumero)?.trim();;
    const tipo = prompt("Nuevo tipo:", oldTipo)?.trim();

    if (!nombre || !numero || !tipo) {
        alert("Todos los datos son obligatorios");
        return;
    }
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({nombre, numero, tipo })                
            });
            
    } catch (error) {
        console.error("Error al actualizar pokemon:", error);
    }
    printAllPokemons();
}


//DELETE
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

//AGREGAR POKEMON A LA TABLA
function addPokemonToPokedex(pokemon) {
    tabla.insertAdjacentHTML("beforeend",
        `
        <tr id="row-${pokemon.id}">
        <td>${pokemon.nombre}</td>
        <td>${pokemon.numero}</td>
        <td>${pokemon.tipo}</td>
        <td><button class="edit-btn" onclick="updatePokemon('${pokemon.id}', '${pokemon.nombre}', '${pokemon.numero}', '${pokemon.tipo}')"><i class="fa-solid fa-pen-to-square"></i></button></td>
        
        <td><button class="delete-btn" onclick="deletePokemon('${pokemon.id}')"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `);
}



printAllPokemons();