let dom = {};

window.onload = () => {
    dom['nombre'] = document.getElementById('nombre');
    dom['periodoO'] = document.getElementById('periodoO');
    dom['periodoR'] = document.getElementById('periodoR');
    dom['diametro'] = document.getElementById('diametro');
    dom['clima'] = document.getElementById('clima');
    dom['gravedad'] = document.getElementById('gravedad');
    dom['terreno'] = document.getElementById('terreno');
    dom['agua'] = document.getElementById('agua');
    dom['poblacion'] = document.getElementById('poblacion');
    dom['residentes'] = document.getElementById('residentes');
    dom['peliculas'] = document.getElementById('peliculas');
    datosPlaneta();
}

function datosPlaneta() {
    let num = obtenerIdURLRecursoSWAPI(window.location.href);
    let url = `https://swapi.dev/api/planets/${num}/`;
    fetch(url).then(r => r.json()).then(data => {
        console.log("datos: " + data.residents);

        let nombre = dom['nombre'];
        let periodoO = dom['periodoO'];
        let periodoR = dom['periodoR'];
        let diametro = dom['diametro'];
        let clima = dom['clima'];
        let gravedad = dom['gravedad'];
        let terreno = dom['terreno'];
        let agua = dom['agua'];
        let poblacion = dom['poblacion'];

        pO = document.createElement('p');
        let peliculas = dom['peliculas'];
        let n = document.createElement('p');

        n.innerHTML = `<p>${data.name}</p>`;
        nombre.appendChild(n);
        pO.innerHTML = `<p>${data.orbital_period}</p>`;
        periodoO.appendChild(pO);
        let pR = document.createElement('p');
        pR.innerHTML = `<p>${data.rotation_period}</p>`;
        periodoR.appendChild(pR);
        let c = document.createElement('p');
        c.innerHTML = `<p>${data.climate}</p>`;
        clima.appendChild(c);
        let d = document.createElement('p');
        d.innerHTML = `<p>${data.diameter}</p>`;
        diametro.appendChild(d);
        let g = document.createElement('p');
        g.innerHTML = `<p>${data.gravity}</p>`;
        gravedad.appendChild(g);
        let t = document.createElement('p');
        t.innerHTML = `<p>${data.terrain}</p>`;
        terreno.appendChild(t);
        let a = document.createElement('p');
        a.innerHTML = `<p>${data.surface_water}</p>`;
        agua.appendChild(a);
        let po = document.createElement('p');
        po.innerHTML = `<p>${data.population}`;
        poblacion.appendChild(po);

        for (let i = 0; i < data.residents.length; i++) {
            if (data.residents.length != 0) {
                getResidentes(data.residents[i]);
            }
        }

        for (let i = 0; i < data.films.length; i++) {
            getPeliculas(data.films[i]);
        }
    })
}

function getResidentes(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        console.log(data.name);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let residentes = dom['residentes'];
        let texto = document.createElement('p');
        let nombre = data.name;
        texto.innerHTML = `<a href=personaje.html?id=${numId}>${nombre}</a>`;
        residentes.appendChild(texto);
    })
}

function getPeliculas(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let pelicula = dom['peliculas'];
        let nombre = data.title;
        let texto = document.createElement('p');
        texto.innerHTML = `<a href=pelicula.html?id=${numId}>${nombre}</a>`;
        pelicula.appendChild(texto);
    })
}

function obtenerIdURLRecursoSWAPI(url) {
    return Number(url.match(/([0-9]*)\/?$/)[1]);
}
