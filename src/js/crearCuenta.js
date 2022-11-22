import { alertSuccess, alertFail, infoPassword as info} from "./alerts.js";

const formulario = document.querySelector('#formularioRegistro');
const nombre = document.querySelector('#nombreNuevoUsuario');
const email = document.querySelector('#emailNuevoUsuario');
const password = document.querySelector('#passwordNuevoUsuario');
const infoPassword = document.querySelector('#infoPassword');

window.onload = () => {
    formulario.addEventListener('submit', registrarNuevoUsuario);
}

const registrarNuevoUsuario = e => {
    e.preventDefault();

    if (nombre.value === '' || email.value === '' || password.value === '') {
        alertFail('Debes de llenar todos los campos');
    }
    else
        alertSuccess('Usuario registrado correctamente');
}

infoPassword.onclick = () => {
    info()
}