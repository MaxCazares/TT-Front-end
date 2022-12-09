import { urlAPI, localhost } from './urls.js'

const nombreUsuario = document.querySelector('#nombreUsuario');
const emailUsuario = document.querySelector('#emailUsuario');
const telefonoUsuario = document.querySelector('#telefonoUsuario');
const zonaUsuario = document.querySelector('#zonaUsuario');
const comentarioUsuario = document.querySelector('#comentarioUsuario');

const menuOpciones = document.querySelector('#menuOpciones');
const dropdown = document.querySelector('#dropdown');
const editarPerfil = document.querySelector('#editarPerfil');

window.onload = async () => {
    // obtenerDatosUsuario();    
}

const obtenerParametrosURL = () => {
    const URLactual = new URL(window.location);
    const idUsuario = URLactual.searchParams.get('iduser');
    return idUsuario;
}

const obtenerDatosUsuario = async () => {
    const idUsuario = obtenerParametrosURL();
    try {
        const respuesta = await fetch(urlAPI + `usuarios/getbyid/${idUsuario}`);
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

// editarPerfil.onclick = () => {
//     const idUsuario = obtenerParametrosURL();

//     const paginaEditarPerfil = new URL(localhost + 'editarPerfil.html');
//     paginaEditarPerfil.searchParams.set('iduser', idUsuario);

//     window.location.href = paginaEditarPerfil;
// }

menuOpciones.onclick = () => {
    dropdown.classList.toggle('hidden');
    dropdown.classList.toggle('flex');
}