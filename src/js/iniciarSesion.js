import { alertSuccess, alertFail } from "./alerts.js";

const formulario = document.querySelector('#formularioInicioSesion');
const email = document.querySelector('#emailUsuarioRegistrado');
const password = document.querySelector('#passwordUsuarioRegistrado');
const esconderPassword = document.querySelector('#esconderPassword');

window.onload = () => {
    formulario.addEventListener('submit', validarUsuario);
}

const validarUsuario = e => {
    e.preventDefault();
    if (email.value === '' || password.value === '') {
        alertFail('Ambos campos son requeridos');
        return
    }
    else
        alertSuccess('Bienvenido de nuevo');
}

esconderPassword.onclick = () => {
    if (password.type == 'password') {
        password.type = 'text';
        esconderPassword.classList.add('fa-eye');
        esconderPassword.classList.remove('fa-sharp');
        esconderPassword.classList.remove('fa-eye-slash');

    } else {
        password.type = 'password';
        esconderPassword.classList.remove('fa-eye');
        esconderPassword.classList.add('fa-sharp');
        esconderPassword.classList.add('fa-eye-slash');
    }
}