const URL = "http://localhost:3000/pokemon";
const tabla = document.getElementById('tabla').querySelector("tbody");

// Obtener todos los Pokémon
async function getAllPokemons() {
    tabla.innerHTML = ""; // Limpia la tabla antes de cargar los datos
    try {
        const response = await fetch(URL);
        const data = await response.json();
        data.forEach(pokemon => addPokemonToPokedex(pokemon));
    } catch (error) {
        console.error("Error obteniendo Pokémon:", error);
    }
}

// Agregar nuevo Pokémon
async function addNewPokemon() {
    const nombre = document.getElementById('nombre').value;
    const numero = document.getElementById('numero').value;
    const tipo = document.getElementById('tipo').value;

    if (!nombre || !numero || !tipo) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, numero, tipo })
        });

        const pokemon = await response.json();
        addPokemonToPokedex(pokemon);
        document.getElementById('formulario').reset(); // Limpiar formulario
    } catch (error) {
        console.error("Error al agregar Pokémon:", error);
    }
}

// Editar Pokémon
async function updatePokemon(id, nombreActual, numeroActual, tipoActual) {
    const nombre = prompt("Nuevo nombre:", nombreActual);
    const numero = prompt("Nuevo número:", numeroActual);
    const tipo = prompt("Nuevo tipo:", tipoActual);

    if (!nombre || !numero || !tipo) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        await fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, numero, tipo })
        });
        getAllPokemons(); // Recargar la lista después de actualizar
    } catch (error) {
        console.error("Error al actualizar Pokémon:", error);
    }
}

// Eliminar Pokémon
async function deletePokemon(id) {
    if (!confirm("¿Deseas eliminar este Pokémon?")) return;

    try {
        await fetch(`${URL}/${id}`, { method: "DELETE" });
        document.getElementById(`row-${id}`).remove();
    } catch (error) {
        console.error("Error al eliminar Pokémon:", error);
    }
}

// Insertar Pokémon en la tabla
function addPokemonToPokedex(pokemon) {
    tabla.insertAdjacentHTML("beforeend", `
        <tr id="row-${pokemon.id}">
            <td>${pokemon.nombre}</td>
            <td>${pokemon.numero}</td>
            <td>${pokemon.tipo}</td>
            <td>
                <button onclick="updatePokemon(${pokemon.id}, '${pokemon.nombre}', '${pokemon.numero}', '${pokemon.tipo}')">Editar</button>
                <button onclick="deletePokemon(${pokemon.id})">Eliminar</button>
            </td>
        </tr>
    `);
}
