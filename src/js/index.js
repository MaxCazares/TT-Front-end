import { alertFail, alertSuccess } from "./alerts.js";
import { urlAPI, localhost } from "./urls.js";

const formularioBusqueda = document.querySelector('#formularioBusqueda');

const mosaicoTecnologia = document.querySelector('#mosaicoTecnologia');
const contenidoInicio = document.querySelector('#contenidoInicio');
const iniciarSesionBoton = document.querySelector('#iniciarSesionBoton');
const perfilUsuarioBoton = document.querySelector('#perfilUsuarioBoton');

window.onload = () => {
    formularioBusqueda.addEventListener('submit', buscarProductos);
    mostrarBotonPerfil();
}

const mostrarBotonPerfil = () => {
    const {nombreUsuario} = obtenerParametrosURL();
    if(nombreUsuario){
        const icon = '<i class="fa-solid fa-user-astronaut mr-1 my-auto text-current"></i>';

        const usuario = nombreUsuario.split(' ');
        const usuarioConApellido = usuario[0] + ' ' + usuario[1];

        iniciarSesionBoton.classList.add('hidden');
        perfilUsuarioBoton.innerHTML = icon + usuarioConApellido;
        perfilUsuarioBoton.classList.remove('hidden');
    }    
}

const buscarProductos = e => {
    e.preventDefault();

    const busqueda = document.querySelector('#search').value;

    if(busqueda === ''){
        alertFail('Tu busqueda parece vacia');
        return;
    }

    alertSuccess(busqueda);
}

const obtenerParametrosURL = () => {
    const URLactual = new URL(window.location);
    const idUsuario = URLactual.searchParams.get('iduser');
    const nombreUsuario = URLactual.searchParams.get('nameuser');
    return {idUsuario, nombreUsuario};
}

mosaicoTecnologia.onclick = () => consultarProductos('tecnologia');

const consultarProductos = async (categoria) => {
    // console.log(categoria);

    try {
        const respuesta = await fetch('https://www.breakingbadapi.com/api/characters/1');
        // console.log(respuesta);

    } catch (error) {
        console.error(error);
    }
}

perfilUsuarioBoton.onclick = () => {
    const {idUsuario} = obtenerParametrosURL();
    // console.log(idUsuario);
    const perfil = new URL(localhost + 'perfil.html');
    perfil.searchParams.set('iduser', idUsuario);

    setTimeout(() => {
        window.location.href = perfil;                
    }, 1000);
}