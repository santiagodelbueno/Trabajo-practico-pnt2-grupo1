let previus;
let next;

const get = async (url) => {
    try{
        const response = await fetch(url);
        const {info, results} = await response.json();
        previus = info.prev;
        next = info.next;
        console.log({info, results});
        return {info, results};
    }
    catch(err){
        console.log(err);
    }
}

const mostrar = (personaje) => {
    const card = 
    `<div class= "col-4 mt-4">
        <div class="card col-4 mt-4" style="width: 18rem;">
            <img src="${personaje.image}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Estado: ${personaje.status}</li>
                <li class="list-group-item">Origen: ${personaje.origin.name}</li>
                <li class="list-group-item">Especie: ${personaje.species}</li>
            </ul>
        </div>
    </div>`;
    document.getElementById("cartas").insertAdjacentHTML('beforeend', card);
}


const start = async () => {
    try{
        const {info, results} = await get('https://rickandmortyapi.com/api/character');
        
        results.forEach((personaje) => {
            mostrar(personaje);
        })
    }
    catch(err){
        console.log(err);
    }
}

window.onload = start();

const searchByName = async () => {
    const name = document.getElementById('name').value;
    const {info, results} = await get('https://rickandmortyapi.com/api/character/?name=' + name);

    document.getElementById("cartas").innerHTML = '';

    results.forEach((personaje) => {
        mostrar(personaje);
    })
}

const filtrarEstado = async () => {
    const estado = document.getElementById('filtrar').value;
    const {info, results} = await get('https://rickandmortyapi.com/api/character/?status=' + estado);
    
    document.getElementById("cartas").innerHTML = '';
    results.forEach((personaje) => {
        mostrar(personaje);
    })
}

const buscarPorEspecie = async () => {
    const especie = document.getElementById('especie').value;
    const {info, results} = await get('https://rickandmortyapi.com/api/character/?species=' + especie);

    document.getElementById("cartas").innerHTML = '';

    results.forEach((personaje) => {
        mostrar(personaje);
    })
}

const previusPage = async () => {
    const {info, results} = await get(previus);
    document.getElementById("cartas").innerHTML = '';
    results.forEach((personaje) => {
        mostrar(personaje);
    })
}

const nextPage = async () => {
    const {info, results} = await get(next);
    document.getElementById("cartas").innerHTML = '';
    results.forEach((personaje) => {
        mostrar(personaje);
    })
}
