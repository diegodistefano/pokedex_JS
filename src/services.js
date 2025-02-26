const URL = "http://localhost:3000/pokemon";
tabla = document.getElementById('tabla');

//GET
async function getAllPokemons() {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

//POST
async function addNewPokemon() {
    const nombre = document.getElementById('create-nombre').value;
    const numero = document.getElementById('create-numero').value;
    const tipo = document.getElementById('create-tipo').value;
    const imagen = document.getElementById('create-imagen').value;

    if (!nombre || !numero || !tipo || !imagen) {
        alert("Todos los datos son obligatorios");
        return;
    }
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, numero, tipo, imagen })
        })
        const pokemon = await response.json();
        addPokemonToPokedex(pokemon);
    } catch (error) {
        console.error("Error al crear pokemon:", error);
    }
    formulario.reset();
}

//PUT
async function updatePokemon(id) {
    const nombre = document.getElementById("edit-nombre").value;
    const numero = document.getElementById("edit-numero").value;
    const tipo = document.getElementById("edit-tipo").value;
    const imagen = document.getElementById("edit-imagen").value;

    if (!nombre || !numero || !tipo || !imagen) {
        alert("Todos los datos son obligatorios");
        return;
    }
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, numero, tipo, imagen })
        });
    } catch (error) {
        console.error("Error al actualizar pokemon:", error);
    }
    printAllPokemons();
    cerrarModal();
}

//DELETE
async function deletePokemon(id) {
    if (!confirm("¿Desea confirmar la eliminación?")) return;
    try {
        const response = await fetch(`${URL}/${id}`,
            {
                method: "DELETE"
            });
    } catch (error) {
        console.error("Error al eliminar el pokemon:", error);
    }
    document.getElementById(`row-${id}`).remove();
}

//MOSTRAR POKEMONES EN LA TABLA
async function printAllPokemons() {
    const data = await getAllPokemons();
    tabla.innerHTML = "";
    data.forEach(pokemon => {
        addPokemonToPokedex(pokemon);
    });
}

//AGREGAR POKEMON A LA TABLA
function addPokemonToPokedex(pokemon) {
    tabla.insertAdjacentHTML("beforeend",
        `
        <tr id="row-${pokemon.id}">
        <td>${pokemon.nombre}</td>
        <td>${pokemon.numero}</td>
        <td>${pokemon.tipo}</td>
        <td><img src="${pokemon.imagen}" alt="imagen" class="imagen-redonda" width="50" height="50"></td>
        
        <td><button class="watch-btn" onclick=""><i class="fa-solid fa-eye"></i></button></td>
        <td><button class="edit-btn" onclick="abrirModal('${pokemon.id}', '${pokemon.nombre}', '${pokemon.numero}', '${pokemon.tipo}', '${pokemon.imagen}')"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button class="delete-btn" onclick="deletePokemon('${pokemon.id}')"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `);
}

// MODAL PARA EDITAR
function abrirModal(id, nombre, numero, tipo, imagen) {
    document.getElementById("edit-id").value = id;
    document.getElementById("edit-nombre").value = nombre;
    document.getElementById("edit-numero").value = numero;
    document.getElementById("edit-tipo").value = tipo;
    document.getElementById("edit-imagen").value = imagen;

    document.getElementById("modal-editar").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal-editar").style.display = "none";
}

document.getElementById("form-editar").addEventListener("submit", async function (event) {
    event.preventDefault();
    const id = document.getElementById("edit-id").value;

    updatePokemon(id);
});

printAllPokemons();