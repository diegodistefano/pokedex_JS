const URL = "http://localhost:3000/pokemon";

parrafo = document.getElementById("parrafo");

//Get

async function getAllPokemons() ¨{
    const response = await fetch(URL);
    const data = await response.json();
    printAllPokemons();
    return data;
    
}

printAllPokemons();
    parrafo.innerHTML = "";
    data.forEach(pokemon => {
        const
    });

getAllPokemons();

