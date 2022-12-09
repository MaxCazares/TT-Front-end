import { alertSuccess } from './alerts.js';
import { urlAPI, localhost } from './urls.js'

const nombreUsuario = document.querySelector('#nombreUsuario');
const emailUsuario = document.querySelector('#emailUsuario');
const telefonoUsuario = document.querySelector('#telefonoUsuario');
const zonaUsuario = document.querySelector('#zonaUsuario');
const comentarioUsuario = document.querySelector('#comentarioUsuario');

const actualizarInformacion = document.querySelector('#actualizarInformacionUsuario');

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
    comentarioUsuario.value = '';
}

actualizarInformacion.onclick = async () => {
    const idUsuario = obtenerParametrosURL();

    let usuarioModificado = {
        "id": idUsuario,
        "campos": {
            "nombre_usuario": nombreUsuario.value,
            "contraseña_usuario": "1234566",
            "telefono_usuario": telefonoUsuario.value,
            "correo_usuario": emailUsuario.value,
            "zona_entrega_usuario": zonaUsuario.value
        }
    }

    try {
        const respuesta = await fetch(urlAPI + 'usuarios/update', {
            method: "PUT",
            body: JSON.stringify(usuarioModificado),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        
        alertSuccess('Usuario modificado correctamente');

        setTimeout(() => {
            regresoPerfil();
        }, 2000);

    } catch (error) {
        console.error(error);
    }
}

const regresoPerfil = () => {
    const URLactual = new URL(window.location);
    const idUsuario = URLactual.searchParams.get('iduser');

    const paginaPerfil = new URL(localhost + 'perfil.html');
    paginaPerfil.searchParams.set('iduser', idUsuario);

    window.location.href = paginaPerfil;
}