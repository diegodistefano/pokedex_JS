const URL = "http://localhost:3000/pokemon";

//GET
export async function getPokemon() {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

//POST
export async function postPokemon(newPokemon ) {
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
export async function updatePokemon(id) {
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
        if (response.ok) {
            printAllPokemons();  // ✅ Solo ejecuta si la actualización fue exitosa
        } else {
            console.error("Error en la actualización:", await response.text());
        }
    } catch (error) {
        console.error("Error al actualizar pokemon:", error);
    }
    cerrarModal();
}

//DELETE
export async function deletePokemon(id) {
    try {
        const response = await fetch(`${URL}/${id}`,
            {
                method: "DELETE"
            });
    } catch (error) {
        console.error("Error al eliminar Pokémon:", error);
    }
}