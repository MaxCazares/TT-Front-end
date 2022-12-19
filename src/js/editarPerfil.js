import { alertSuccess } from './alerts.js';
import { urlAPI, localhost } from './urls.js'

const fotoUsuario = document.querySelector('#fotoUsuario');
const inputFotoUsuario = document.querySelector('#inputFotoUsuario');
const nombreUsuario = document.querySelector('#nombreUsuario');
const emailUsuario = document.querySelector('#emailUsuario');
const passwordUsuario = document.querySelector('#passwordUsuario');
const telefonoUsuario = document.querySelector('#telefonoUsuario');
const zonaUsuario = document.querySelector('#zonaUsuario');

const actualizarInformacion = document.querySelector('#actualizarInformacionUsuario');

let fotoUsuarioBytes = '';

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
    passwordUsuario.value = usuario.contraseña_usuario;
    telefonoUsuario.value = usuario.telefono_usuario;
    zonaUsuario.value = usuario.zona_entrega_usuario;
    fotoUsuario.src = usuario.img_usuario.file;
}

actualizarInformacion.onclick = async () => {
    const idUsuario = obtenerParametrosURL();

    const usuarioModificado = {
        "id": idUsuario,
        "campos": {
            "nombre_usuario": nombreUsuario.value,
            "contraseña_usuario": passwordUsuario.value,
            "telefono_usuario": telefonoUsuario.value,
            "correo_usuario": emailUsuario.value,
            "zona_entrega_usuario": zonaUsuario.value,
            "img_usuario": {
                "file": fotoUsuarioBytes
            }
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
        }, 1500);

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

inputFotoUsuario.addEventListener('change', e => {
    const foto = inputFotoUsuario.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        fotoUsuario.src = reader.result;
        // console.log(reader.result);
        fotoUsuarioBytes = reader.result;
    });

    reader.readAsDataURL(foto);
});