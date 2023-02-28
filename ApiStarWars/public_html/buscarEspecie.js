let dom = {};

window.onload = () => {
    dom['nombre'] = document.getElementById('nombre');
    dom['class'] = document.getElementById('class');
    dom['designacion'] = document.getElementById('designacion');
    dom['altura'] = document.getElementById('altura');
    dom['piel'] = document.getElementById('piel');
    dom['pelo'] = document.getElementById('pelo');
    dom['ojos'] = document.getElementById('ojos');
    dom['vida'] = document.getElementById('vida');
    dom['mundo'] = document.getElementById('mundo');
    dom['idioma'] = document.getElementById('idioma');
    dom['gente'] = document.getElementById('gente');
    dom['peliculas'] = document.getElementById('peliculas');
    datosEspecie();
}

function datosEspecie() {
    let num = obtenerIdURLRecursoSWAPI(window.location.href);
    let url = `https://swapi.dev/api/species/${num}/`;
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        let nombre = dom['nombre'];
        nombre.innerHTML = `<p>${data.name}</p>`;
        let clase = dom['class'];

        let c = document.createElement('p');
        c.innerHTML = `<p>${data.classification}</p>`;
        clase.appendChild(c);
        let d = document.createElement('p');
        let designacion = dom['designacion'];
        d.innerHTML = `<p>${data.designation}</p>`;
        designacion.appendChild(d);
        let altura = dom['altura'];
        let a = document.createElement('p');
        a.innerHTML = `<p>${data.average_height}</p>`;
        altura.appendChild(a);
        let p = document.createElement('p');
        let piel = dom['piel'];
        p.innerHTML = `<p>${data.skin_colors}</p>`;
        piel.appendChild(p);
        let pelo = dom['pelo'];
        let pe = document.createElement('p');
        pe.innerHTML = `<p>${data.hair_colors}</p>`;
        pelo.appendChild(pe);
        let ojos = dom['ojos'];
        let o = document.createElement('p');
        o.innerHTML = `<p>${data.eye_colors}</p>`;
        ojos.appendChild(o);
        let vida = dom['vida'];
        let v = document.createElement('p');
        v.innerHTML = `<p>${data.average_lifespan}</p>`;
        vida.appendChild(v);
        let idioma = dom['idioma'];
        let i = document.createElement('p');
        i.innerHTML = `<p>${data.language}</p>`;
        idioma.appendChild(i);

        for (let i = 0; i < data.people.length; i++) {
            if (data.people !== 0) {
                getGente(data.people[i]);
            }
        }

        for (let i = 0; i < data.films.length; i++) {
            getPeliculas(data.films[i]);
        }

        getMundo(data.homeworld);
    })
}

function getGente(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        console.log(data.name);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let gente = dom['gente'];
        let texto = document.createElement('p');
        let nombre = data.name;
        texto.innerHTML = `<a href=personaje.html?id=${numId}>${nombre}</a>`;
        gente.appendChild(texto);
    })
}

function getMundo(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let mundo = dom['mundo'];
        let texto = document.createElement('p');
        let nombre = data.name;
        texto.innerHTML = `<a href=planeta.html?id=${numId}>${nombre}</a>`;
        mundo.appendChild(texto);
    })
}

function getPeliculas(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let peliculas = dom['peliculas'];
        let nombre = data.title;
        let texto = document.createElement('p');
        texto.innerHTML = `<a href=pelicula.html?id=${numId}>${nombre}</a>`;
        peliculas.appendChild(texto);
    })
}

function obtenerIdURLRecursoSWAPI(url) {
    return Number(url.match(/([0-9]*)\/?$/)[1]);
}
