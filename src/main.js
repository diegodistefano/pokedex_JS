const URL = "http://localhost:3000/pokemon";
tabla = document.getElementById('tabla');

//GET
async function getPokemon() {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

//POST
async function postPokemon(newPokemon) {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPokemon)
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear pokemon:", error);
    }
}

//PUT
async function putPokemon(id, nombre, numero, tipo, imagen) {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, numero, tipo, imagen })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar pokemon:", error);
    }
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
}



//PRINT IN TABLE
async function printAllPokemons() {
    const data = await getPokemon();
    tabla.innerHTML = "";
    data.forEach(pokemon => {
        addPokemonToTable(pokemon);
    });
}

//AGREGAR NUEVO POKEMON
async function handleNewPokemon() {
    const nombre = document.getElementById('create-nombre').value;
    const numero = document.getElementById('create-numero').value;
    const tipo = document.getElementById('create-tipo').value;
    const imagen = document.getElementById('create-imagen').value;
    if (!nombre || !numero || !tipo || !imagen) {
        alert("Todos los datos son obligatorios");
        return;
    }
    const newPokemon = {
        nombre: nombre,
        numero: numero,
        tipo: tipo,
        imagen: imagen
    };
    await postPokemon(newPokemon);
    printAllPokemons();
    formulario.reset();
}

// AGREGAR POKEMON A LA TABLA
function addPokemonToTable(pokemon) {
    const row = document.createElement("tr");
    row.id = `row-${pokemon.id}`;
    row.innerHTML = `
        <td>${pokemon.nombre}</td>
        <td>${pokemon.numero}</td>
        <td>${pokemon.tipo}</td>
        <td><img src="${pokemon.imagen}" alt="imagen" class="imagen-redonda" width="50" height="50"></td>
        <td><button class="watch-btn"><i class="fa-solid fa-eye"></i></button></td>
        <td><button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>
    `;

    tabla.appendChild(row);

    const watchBtn = row.querySelector(".watch-btn");
    const editBtn = row.querySelector(".edit-btn");
    const deleteBtn = row.querySelector(".delete-btn");

    watchBtn.addEventListener("click", () => {
        abrirModalTarjetas(pokemon.id, pokemon.nombre, pokemon.numero, pokemon.tipo, pokemon.imagen);
    });
    editBtn.addEventListener("click", () => {
        abrirModal(pokemon.id, pokemon.nombre, pokemon.numero, pokemon.tipo, pokemon.imagen);
    });
    deleteBtn.addEventListener("click", () => {
        deletePokemon(pokemon.id);
        document.getElementById(`row-${id}`).remove();
    });
}


//UPDATE
async function updatePokemon(id) {
    const nombre = document.getElementById("edit-nombre").value;
    const numero = document.getElementById("edit-numero").value;
    const tipo = document.getElementById("edit-tipo").value;
    const imagen = document.getElementById("edit-imagen").value;

    if (!nombre || !numero || !tipo || !imagen) {
        alert("Todos los datos son obligatorios");
        return;
    }
    await putPokemon(id, nombre, numero, tipo, imagen);
    printAllPokemons();
    cerrarModal();
}


// MODAL PARA MOSTRAR TARJETAS
function abrirModalTarjetas(id, nombre, numero, tipo, imagen) {
    document.getElementById("watch-id").value = id;
    document.getElementById("watch-nombre").value = nombre;
    document.getElementById("watch-numero").value = numero;
    document.getElementById("watch-tipo").value = tipo;
    document.getElementById("watch-imagen").value = imagen;

    document.getElementById("watch-img").src = imagen;
    document.getElementById("watch-img").alt = `Imagen de ${nombre}`;

    document.getElementById("modal-tarjetas-pokemon").style.display = "flex";
}

function cerrarModalTarjetas() {
    document.getElementById("modal-tarjetas-pokemon").style.display = "none";
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