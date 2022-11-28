import { alertSuccess, alertFail } from "./alerts.js";
import { url } from "./url.js";

const formulario = document.querySelector('#formularioInicioSesion');
const email = document.querySelector('#emailUsuarioRegistrado');
const password = document.querySelector('#passwordUsuarioRegistrado');
const esconderPassword = document.querySelector('#esconderPassword');

window.onload = () => {
    formulario.addEventListener('submit', validarUsuario);
};

const validarUsuario = e => {
    e.preventDefault();
    if (email.value === '' || password.value === '') {
        alertFail('Ambos campos son requeridos');
        return
    }
    else {
        obtenerUsuarios();
    }
};

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
};

const obtenerUsuarios = async (name = 'Pedro') => {
    try {
        const respuesta = await fetch(`http://20.172.176.195:5000/usuarios/getbyname/${name}`, { mode: "no-cors"});
        console.log(respuesta);
        const resultado = await respuesta.json();
        console.log(resultado);

        alertSuccess('Bienvenido de nuevo');
    } catch (e) {
        console.error(e);
    }
};