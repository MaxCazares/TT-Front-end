import { alertSuccess, alertFail } from "./alerts.js";

const formulario = document.querySelector('#formularioInicioSesion');
const email = document.querySelector('#emailUsuarioRegistrado');
const password = document.querySelector('#passwordUsuarioRegistrado');

window.onload = () => {
    formulario.addEventListener('submit', validarUsuario);
}

const validarUsuario = e => {
    e.preventDefault();
    if (email.value === '' || password.value === ''){
        alertFail('Ambos campos son requeridos');
        return
    }
    else
        alertSuccess('Bienvenido de nuevo');
}