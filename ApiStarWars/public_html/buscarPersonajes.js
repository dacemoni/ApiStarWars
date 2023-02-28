let dom = {}

window.onload = () => {
    dom['nombre'] = document.getElementById('nombre');
    dom['altura'] = document.getElementById('altura');
    dom['peso'] = document.getElementById('peso');
    dom['color'] = document.getElementById('color');
    dom['ojos'] = document.getElementById('ojos');
    dom['pelo'] = document.getElementById('pelo');
    dom['gender'] = document.getElementById('gender');
    dom['naves'] = document.getElementById('naves');
    dom['origen'] = document.getElementById('origen');
    dom['nacimiento'] = document.getElementById('nacimiento');
    dom['vehiculos'] = document.getElementById('vehiculos');
    dom['peliculas'] = document.getElementById('peliculas');
    dom['especie'] = document.getElementById('especie');
    datosPersonaje();
};

function datosPersonaje() {
    let num = obtenerIdURLRecursoSWAPI(window.location.href);
    let url = `https://swapi.dev/api/people/${num}`;
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);

        let nombre = dom['nombre'];
        let peso = dom['peso'];
        let altura = dom['altura'];
        let color = dom['color'];
        let pelo = dom['pelo'];
        let gender = dom['gender'];
        let nacimiento = dom['nacimiento'];
        let ojos = dom['ojos'];
        let especie = dom['especie'];
        let p = document.createElement('p');
        let a = document.createElement('p');
        a.innerHTML = "<p>" + data.height + "</p>";
        p.innerHTML = "<p>" + data.mass + "</p>";
        nombre.innerHTML = "<p>" + data.name + "</p>";
        peso.appendChild(p);
        altura.appendChild(a);
        let c = document.createElement('p');

        c.innerHTML = "<p>" + data.skin_color + "</p>";
        color.appendChild(c);
        let pel = document.createElement('p');
        pel.innerHTML = "<p>" + data.hair_color + "</p>";
        pelo.appendChild(pel);
        let n = document.createElement('p');
        n.innerHTML = "<p>" + data.birth_year + "</p>";
        nacimiento.appendChild(n);
        let g = document.createElement('p');
        g.innerHTML = "<p>" + data.gender + "</p>";
        gender.appendChild(g);
        let o = document.createElement('p');
        o.innerHTML = "<p>" + data.eye_color + "</p>";
        ojos.appendChild(o);

        for (let i = 0; i < data.films.length; i++) {
            getPeliculas(data.films[i]);
        }

        for (let i = 0; i < data.vehicles.length; i++) {
            if (data.vehicles.length !== 0) {
                getVehiculo(data.vehicles[i]);
            }
        }

        for (let i = 0; i < data.starships.length; i++) {
            if (data.starships.length !== 0) {
                getNave(data.starships[i]);
            }
        }

        getEspecie(data.species);
        getOrigen(data.homeworld);
    });
}

function obtenerIdURLRecursoSWAPI(url) {
    return Number(url.match(/([0-9]*)\/?$/)[1]);
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
    });
}

function getEspecie(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let especie = dom['especie'];
        let nombre = data.name;
        let texto = document.createElement('p');
        texto.innerHTML = `<p><a href=especie.html?id=${numId}>${nombre}</a></p>`;
        especie.appendChild(texto);
    });
}

function getOrigen(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let origen = dom['origen'];
        let texto = document.createElement('p');
        let nombre = data.name;
        texto.innerHTML = `<p><a href=planeta.html?id=${numId}>${nombre}</a></p>`;
        origen.appendChild(texto);
    });
}

function getVehiculo(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        console.log(data.name);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let vehiculos = dom['vehiculos'];
        let texto = document.createElement('p');
        let nombre = data.model;
        texto.innerHTML = `<a href=vehiculo.html?id=${numId}>${nombre}</a>`;
        vehiculos.appendChild(texto);
    });
}

function getNave(url) {
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);
        let nextURL = data.url;
        let numId = nextURL.replace(/\D/g, '');
        let naves = dom['naves'];
        let texto = document.createElement('p');
        let nombre = data.name;
        texto.innerHTML = `<a href=nave.html?id=${numId}>${nombre}</a>`;
        naves.appendChild(texto);
    });
}
