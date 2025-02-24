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
    tabla.innerHTML = "";
    data.forEach(pokemon => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${pokemon.nombre}</td>
            <td>${pokemon.numero}</td>
            <td>${pokemon.tipo}</td>
        `;

        tabla.appendChild(tr);
    });
}



getAllPokemons();