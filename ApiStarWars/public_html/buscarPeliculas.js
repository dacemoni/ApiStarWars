"use strict"
let nPersonajes = 0;
let dom = {};
let charac = "";

window.onload = () => {
    dom['todo'] = document.getElementById('todo');
    dom['resumen'] = document.getElementById('resumen')
    dom['personajes'] = document.getElementById('personajes')
    dom['planetas'] = document.getElementById('planetas')
    dom['vehiculos'] = document.getElementById('vehiculos')
    dom['naves'] = document.getElementById('naves')
    dom['especies'] = document.getElementById('especies')
    buscarPelicula();
}

function buscarPelicula() {
    let num = obtenerIdURLRecursoSWAPI(window.location.href);
    const a = `https://swapi.dev/api/films/${num}/`;
    fetch(a).then(r => r.json())
        .then(data => {
            console.log(data);
            let titulo = document.getElementById('nombre');
            titulo.style.fontSize = "20px";
            titulo.style.textDecoration = "underline";
            titulo.innerHTML = data.title;
            let div = dom['resumen'];
            let resumen = document.createElement('p');
            resumen.style.fontSize = "30px";
            resumen.innerHTML = `<p>${data.opening_crawl}</p>`;
            div.appendChild(resumen);

            for (let i = 0; i < data.characters.length; i++) {
                buscarPersonaje(data.characters[i]);
            }

            for (let i = 0; i < data.planets.length; i++) {
                buscarPlanetas(data.planets[i]);
            }

            for (let i = 0; i < data.vehicles.length; i++) {
                buscarVehiculos(data.vehicles[i]);
            }

            for (let i = 0; i < data.starships.length; i++) {
                buscarNaves(data.starships[i]);
            }

            for (let i = 0; i < data.species.length; i++) {
                buscarEspecies(data.species[i]);
            }

            for (let i = 0; i < data.species.length; i++) {
                buscarEspecies(data.species[i]);
            }
        })
}

function obtenerIdURLRecursoSWAPI(url) {
    return Number(url.match(/([0-9]*)\/?$/)[1]);
}

function buscarPersonaje(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        console.log(data.name);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        console.log("id: " + numId);
        console.log(data.url);
        let div = dom['personajes'];
        let texto = document.createElement('p');
        let nombre = data.name;
        texto.innerHTML = `<h3><a href=personaje.html?id=${numId}>${nombre}</a><h3>`;
        div.appendChild(texto);
    });
}

function buscarPlanetas(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let div = dom['planetas'];
        let texto = document.createElement('p');
        let nombre = data.name;
        texto.innerHTML = `<h3><a href=planeta.html?id=${numId}>${nombre}</a><h3>`;
        div.appendChild(texto);
    })
}

function buscarVehiculos(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let div = dom['vehiculos'];
        let texto = document.createElement('p');
        let nombre = data.name;
        texto.innerHTML = `<h3><a href=vehiculo.html?id=${numId}>${nombre}</a><h3>`;
        div.appendChild(texto);
    })
}

function buscarNaves(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let div = dom['naves'];
        let texto = document.createElement('p');
        let nombre = data.name;
        texto.innerHTML = `<h3><a href=nave.html?id=${numId}>${nombre}</a><h3>`;
        div.appendChild(texto);
    })
}

function buscarEspecies(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let div = dom['especies'];
        let texto = document.createElement('p');
        let nombre = data.name;
        texto.innerHTML = `<a href=especie.html?id=${numId}>${nombre}</a>`;
        div.appendChild(texto);
    })
}