/*** VARIABLES ***/

//Selecciona los 'selects' del HTML
const marca = document.querySelector('#marca'); 
const year = document.querySelector('#year'); 
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const maxYear = new Date().getFullYear(); //Genera el año actual
const minYear = maxYear - 10;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//Event listener para los 'selects'
marca.addEventListener('change', (evnt) =>{
    datosBusqueda.marca = evnt.target.value;
    filtrarAuto();
});
year.addEventListener('change', (evnt) =>{
    datosBusqueda.year = parseInt(evnt.target.value);
    filtrarAuto();
});
minimo.addEventListener('change', (evnt) =>{
    datosBusqueda.minimo = evnt.target.value;
    filtrarAuto();
});
maximo.addEventListener('change', (evnt) =>{
    datosBusqueda.maximo = evnt.target.value;
    filtrarAuto();
});
puertas.addEventListener('change', (evnt) =>{
    datosBusqueda.puertas = parseInt(evnt.target.value);
    filtrarAuto();
});
transmision.addEventListener('change', (evnt) =>{
    datosBusqueda.transmision = evnt.target.value;
    filtrarAuto();
});
color.addEventListener('change', (evnt) =>{
    datosBusqueda.color = evnt.target.value;
    filtrarAuto();
});



/*** EVENTOS ***/
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos); //Muestra los automoviles al cargar

    //Llena las opciones de año
    llenarSelectYear();

});



/*** FUNCIONES ***/
function mostrarAutos(autos) {
    limpiarHTML(); //Elimina el HTML previo

    autos.forEach(auto =>{

        const {marca, modelo, year, puertas, transmision, precio, color} = auto; //Object destructuring
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - 
            Precio: ${precio} - Color: ${color}
        `;

        //Insertar el parrafo en el HTML
        resultado.appendChild(autoHTML);

    });
}

//Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera los años del select
function llenarSelectYear(){
    for(let i = maxYear; i >= minYear; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;

        year.appendChild(opcion); //Agrega las opciones de año al select
    }
}

//Funcion que filtra en base a la busqueda
function filtrarAuto(){
    //'const resultado' devuelve un array
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).
    filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor); 

    //Muestra un mensaje si no hay resultados 
    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();

    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta con otros terminos de busqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if(marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color) {
        return auto.color === color;
    }
    return auto;
}
