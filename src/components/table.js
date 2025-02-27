import { tabla } from '../main.js';
import { getPokemon, postPokemon, updatePokemon, deletePokemon } from '../api/pokemonService.js';
// cambiar nombre archivo de table.js

//MOSTRAR POKEMONES EN LA TABLA
export async function printAllPokemons() {
    const data = await getPokemon();
    tabla.innerHTML = "";
    data.forEach(pokemon => {
        addPokemonToTable(pokemon);
    });
}

//AGREGAR POKEMON A LA TABLA
function addPokemonToTable(pokemon) {
    tabla.insertAdjacentHTML("beforeend", `
        <tr id="row-${pokemon.id}">

        <td>${pokemon.nombre}</td>
        <td>${pokemon.numero}</td>
        <td>${pokemon.tipo}</td>
        <td><img src="${pokemon.imagen}" alt="imagen" class="imagen-redonda" width="50" height="50"></td>
        
        <td><button class="watch-btn"><i class="fa-solid fa-eye"></i></button></td>
        <td><button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button class="delete-btn"><i class="fa-solid fa-trash"></i></button></td>

        </tr>
    `);

    // Capturar los botones recién creados
    // const editBtn = row.querySelector(".edit-btn");
    // const deleteBtn = row.querySelector(".delete-btn");

//     // Agregar eventos
//     editBtn.addEventListener("click", () => {
//         abrirModal(pokemon.id, pokemon.nombre, pokemon.numero, pokemon.tipo, pokemon.imagen);
//     });

//     deleteBtn.addEventListener("click", () => {
//         deletePokemon(pokemon.id);
//     });
}

// //AGREGAR NUEVO POKEMON
// export async function handleNewPokemon() {
//     const nombre = document.getElementById('create-nombre').value;
//     const numero = document.getElementById('create-numero').value;
//     const tipo = document.getElementById('create-tipo').value;
//     const imagen = document.getElementById('create-imagen').value;

//     if (!nombre || !numero || !tipo || !imagen) {
//         alert("Todos los datos son obligatorios");
//         return;
//     }
//     const newPokemon = {
//         nombre: nombre,
//         numero: numero,
//         tipo: tipo,
//         imagen: imagen
//     };
//     await postPokemon(newPokemon);
//     printAllPokemons();
//     formulario.reset();
// }





// // MODAL PARA EDITAR
// export function abrirModal(id, nombre, numero, tipo, imagen) {
//     document.getElementById("edit-id").value = id;
//     document.getElementById("edit-nombre").value = nombre;
//     document.getElementById("edit-numero").value = numero;
//     document.getElementById("edit-tipo").value = tipo;
//     document.getElementById("edit-imagen").value = imagen;

//     document.getElementById("modal-editar").style.display = "flex";
// }

// export function cerrarModal() {
//     document.getElementById("modal-editar").style.display = "none";
// }

// document.getElementById("form-editar").addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const id = document.getElementById("edit-id").value;

//     await updatePokemon(id);
// });



// //ELIMINAR POKEMON DE LA LISTA
// export async function deletePokemonFromList(id) {
//     if (!confirm("¿Desea confirmar la eliminación?")) return;
//     await deletePokemon(id);
//     document.getElementById(`row-${id}`).remove();
// }