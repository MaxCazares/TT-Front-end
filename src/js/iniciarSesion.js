import { alertSuccess, alertFail } from "./alerts.js";
import { urlAPI, localhost } from "./urls.js";

const formulario = document.querySelector('#formularioInicioSesion');
const emailFormulario = document.querySelector('#emailUsuarioRegistrado');
const passwordFormulario = document.querySelector('#passwordUsuarioRegistrado');
const esconderPassword = document.querySelector('#esconderPassword');

window.onload = () => {
    formulario.addEventListener('submit', validarCampos);
};

const validarCampos = e => {
    e.preventDefault();
    if (emailFormulario.value === '' || passwordFormulario.value === '') {
        alertFail('Ambos campos son requeridos');
        return
    }
    else {
        validarUsuario(emailFormulario.value, passwordFormulario.value);
    }
};

const validarUsuario = async (email, password) => {
    try {
        const respuesta = await fetch(urlAPI + `usuarios/getbyemail/${email}`);

        const usuarioJSON = await respuesta.json();
        const usuario = usuarioJSON.response[0];

        if(email === usuario.correo_usuario && password === usuario.contraseña_usuario){
            alertSuccess(`Bienvenid@ de nuevo \n${usuario.nombre_usuario}`);
            
            const inicio = new URL(localhost + 'index.html');
            inicio.searchParams.set('iduser', usuario.id_usuario);

            setTimeout(() => {
                window.location.href = inicio;                
            }, 1500);

        }else{
            alertFail('Algunos de los campos es incorrecto')
            setTimeout(() => formulario.reset(), 1000);
        }

    } catch (e) {
        console.error(e);
    }
};

esconderPassword.onclick = () => {
    if (passwordFormulario.type == 'password') {
        passwordFormulario.type = 'text';
        esconderPassword.classList.add('fa-eye');
        esconderPassword.classList.remove('fa-sharp');
        esconderPassword.classList.remove('fa-eye-slash');

    } else {
        passwordFormulario.type = 'password';
        esconderPassword.classList.remove('fa-eye');
        esconderPassword.classList.add('fa-sharp');
        esconderPassword.classList.add('fa-eye-slash');
    }
};