let dom = {};

window.onload = () => {
    dom['nombre'] = document.getElementById('nombre');
    dom['modelo'] = document.getElementById('modelo');
    dom['manufacturer'] = document.getElementById('manufacturer');
    dom['precio'] = document.getElementById('precio');
    dom['longitud'] = document.getElementById('longitud');
    dom['tripulacion'] = document.getElementById('tripulacion');
    dom['pasajeros'] = document.getElementById('pasajeros');
    dom['velocidad'] = document.getElementById('velocidad');
    dom['carga'] = document.getElementById('carga');
    dom['clase'] = document.getElementById('clase');
    dom['peliculas'] = document.getElementById('peliculas');
    datosVehiculos();
}

function datosVehiculos() {
    let num = obtenerIdURLRecursoSWAPI(window.location.href);
    let url = `https://swapi.dev/api/vehicles/${num}`;
    fetch(url).then(r => r.json()).then(data => {
        console.log(data);

        let nombre = dom['nombre'];
        let modelo = dom['modelo'];
        let manufacturer = dom['manufacturer'];
        let precio = dom['precio'];
        let longitud = dom['longitud'];
        let tripulacion = dom['tripulacion'];
        let pasajeros = dom['pasajeros'];
        let carga = dom['carga'];
        let clase = dom['clase'];
        let velocidad = dom['velocidad'];

        nombre.innerHTML = "<p>" + data.name + "</p>";
        let mo = document.createElement('p');

        mo.innerHTML = "<p>" + data.model + "</p>";
        modelo.appendChild(mo);
        let ma = document.createElement('p');
        ma.innerHTML = "<p>" + data.manufacturer + "</p>";
        manufacturer.appendChild(ma);
        let l = document.createElement('p');
        l.innerHTML = "<p>" + data.length + "</p>";
        longitud.appendChild(l);
        let p = document.createElement('p');
        p.innerHTML = "<p>" + data.passengers + "</p>";
        pasajeros.appendChild(p);
        let ca = document.createElement('p');
        ca.innerHTML = "<p>" + data.cargo_capacity + "</p>";
        carga.appendChild(ca);
        let cl = document.createElement('p');
        cl.innerHTML = "<p>" + data.vehicle_class + "</p>";
        clase.appendChild(cl);
        let pr = document.createElement('p');
        pr.innerHTML = "<p>" + data.cost_in_credits + "</p>";
        precio.appendChild(pr);
        let t = document.createElement('p');
        t.innerHTML = "<p>" + data.crew + "</p>";
        tripulacion.appendChild(t);
        let v = document.createElement('p');
        v.innerHTML = "<p>" + data.max_atmosphering_speed + "</p>";
        velocidad.appendChild(v);

        for (let i = 0; i < data.films.length; i++) {
            getPeliculas(data.films[i]);
        }
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
