import { alertFail, alertSuccess } from "./alerts.js";

const formularioBusqueda = document.querySelector('#formularioBusqueda');

window.onload = () => {
    formularioBusqueda.addEventListener('submit', cargarPublicaciones);
}

const cargarPublicaciones = e => {
    e.preventDefault();

    const busqueda = document.querySelector('#search').value;

    if(busqueda === ''){
        alertFail('Tu busqueda parece vacia');
        return;
    }

    alertSuccess(busqueda);
}