import { urlAPI, localhost } from './urls.js'

const nombreUsuario = document.querySelector('#nombreUsuario');
const emailUsuario = document.querySelector('#emailUsuario');
const telefonoUsuario = document.querySelector('#telefonoUsuario');
const zonaUsuario = document.querySelector('#zonaUsuario');
const comentarioUsuario = document.querySelector('#comentarioUsuario');

window.onload = () => {
    obtenerParametrosURL();
}

const obtenerParametrosURL = () =>{
    const URLactual = new URL(window.location);
    const idUsuario = URLactual.searchParams.get('iduser');
    obtenerDatosUsuario(idUsuario);
}

const obtenerDatosUsuario = async (idUsuario) => {
    try {
        const respuesta = await fetch(urlAPI + `usuarios/getbyid/${idUsuario}`); //cambiar el correo por el id
        const usuarioJSON = await respuesta.json();
        const usuario = usuarioJSON.response[0];
        imprimirDatos(usuario);

    } catch (error) {
        console.error(error);
    }
}

const imprimirDatos = (usuario) => {
    nombreUsuario.value = usuario.nombre_usuario;
    emailUsuario.value = usuario.correo_usuario;
    telefonoUsuario.value = usuario.telefono_usuario;
    zonaUsuario.value = usuario.zona_entrega_usuario;
    comentarioUsuario.value = '';
}