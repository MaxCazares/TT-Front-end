import { alertSuccess, alertFail } from "./alerts.js";
import { url } from "./url.js";

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
        const respuesta = await fetch(url + `usuarios/getbyname/${email}`);

        const usuarioJSON = await respuesta.json();
        const usuario = usuarioJSON.response[0];
        console.log(usuario);

        if(email === usuario.nombre_usuario && password === usuario.contraseña_usuario){
            alertSuccess(`Bienvenido de nuevo \n${usuario.nombre_usuario}`);
            
            setTimeout(() => {
                window.location.href = 'perfil.html';                
            }, 2000);

        }else{
            alertFail('Algunos de los campos es incorrecto')
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