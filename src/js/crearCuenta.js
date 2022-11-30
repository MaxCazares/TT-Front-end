import { alertSuccess, alertFail, infoPassword as info } from "./alerts.js";
import { url } from "./url.js";

const formulario = document.querySelector('#formularioRegistro');
const nombreFormulario = document.querySelector('#nombreNuevoUsuario');
const emailFormulario = document.querySelector('#emailNuevoUsuario');
const passwordFormulario = document.querySelector('#passwordNuevoUsuario');
const infoPassword = document.querySelector('#infoPassword');

window.onload = () => {
    formulario.addEventListener('submit', validarCampos);
}

const validarCampos = e => {
    e.preventDefault();

    if (nombreFormulario.value === '' || emailFormulario.value === '' || passwordFormulario.value === '') {
        alertFail('Debes de llenar todos los campos');
    }
    else {
        registrarUsuario(nombreFormulario.value, emailFormulario.value, passwordFormulario.value)
    }
}

const registrarUsuario = async (nombre, email, password) => {
    let nuevoUsuario = {
        "nombre_usuario": `${nombre}`,
        "contraseña_usuario": `${password}`,
        "telefono_usuario": "",
        "correo_usuario": `${email}`,
        "zona_entrega_usuario": ""
    }

    try {
        const respuesta = await fetch(url + 'usuarios', {
            method: "POST",
            body: JSON.stringify(nuevoUsuario),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        
        alertSuccess('Usuario registrado correctamente');

        setTimeout(() => {
            window.location.href = 'iniciarSesion.html';
        }, 2000);

    } catch (error) {
        console.error(error);
    }
}

infoPassword.onclick = () => {
    info()
}