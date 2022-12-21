import { urlAPI, localhost } from './urls.js'

const fotoUsuario = document.querySelector('#fotoUsuario');
const nombreUsuario = document.querySelector('#nombreUsuario');
const emailUsuario = document.querySelector('#emailUsuario');
const telefonoUsuario = document.querySelector('#telefonoUsuario');
const zonaUsuario = document.querySelector('#zonaUsuario');

const logoInicio = document.querySelector('#logoInicio');
const flechaInicio = document.querySelector('#flechaInicio');
const editarPerfil = document.querySelector('#editarPerfil');
const publicaciones = document.querySelector('#publicaciones');

window.onload = async () => {
    obtenerDatosUsuario();    
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
    fotoUsuario.src = usuario.img_usuario.file;
}

editarPerfil.onclick = () => {
    const idUsuario = obtenerParametrosURL();

    const paginaEditarPerfil = new URL(localhost + 'editarPerfil.html');
    paginaEditarPerfil.searchParams.set('iduser', idUsuario);

    window.location.href = paginaEditarPerfil;
}

publicaciones.onclick = () => {
    const idUsuario = obtenerParametrosURL();

    const paginaEditarPerfil = new URL(localhost + 'publicaciones.html');
    paginaEditarPerfil.searchParams.set('iduser', idUsuario);

    window.location.href = paginaEditarPerfil;
}

flechaInicio.onclick = () => regresarInicio()
logoInicio.onclick = () => regresarInicio()

const regresarInicio = () => {
    const idUsuario = obtenerParametrosURL();
    
    const regresarInicioPagina = new URL(localhost + 'index.html');
    regresarInicioPagina.searchParams.set('iduser', idUsuario);    
    regresarInicioPagina.searchParams.set('nameuser', nombreUsuario.value);

    window.location.href = regresarInicioPagina;
}