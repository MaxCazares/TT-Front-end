import { alertSuccess, alertFail, infoPassword as info } from "./alerts.js";
import { localhost, urlAPI } from "./urls.js";

const formulario = document.querySelector('#formularioRegistro');

const defaulUserFoto = document.querySelector('#defaulUserFoto');
const nombreFormulario = document.querySelector('#nombreNuevoUsuario');
const emailFormulario = document.querySelector('#emailNuevoUsuario');
const passwordFormulario = document.querySelector('#passwordNuevoUsuario');

const infoPassword = document.querySelector('#infoPassword');
const esconderPassword = document.querySelector('#esconderPassword');

window.onload = () => {
    formulario.addEventListener('submit', validarCampos);
}

const validarCampos = async (e) => {
    e.preventDefault();

    if (nombreFormulario.value === '' || emailFormulario.value === '' || passwordFormulario.value === '') {
        alertFail('Debes de llenar todos los campos');
    }
    else {
        const usuarioRegistrado = await obtenerDatos('usuarios/getbyemail/', emailFormulario.value);
        if (usuarioRegistrado){
            alertFail('Este correo ha sido registrado en otra cuenta');
            formulario.reset();
        }else{
            registrarUsuario(nombreFormulario.value, emailFormulario.value, passwordFormulario.value)
        }
    }
}

const registrarUsuario = async (nombre, email, password) => {
    let nuevoUsuario = {
        "nombre_usuario": `${nombre}`,
        "contraseña_usuario": `${password}`,
        "telefono_usuario": "",
        "correo_usuario": `${email}`,
        "zona_entrega_usuario": "",
        "img_usuario": {
            "file": ""
        }
    }

    try {
        await fetch(urlAPI + 'usuarios', {
            method: "POST",
            body: JSON.stringify(nuevoUsuario),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        
        alertSuccess('Usuario registrado correctamente');

        setTimeout(() => {
            window.location.href = 'iniciarSesion.html';
        }, 1500);

    } catch (error) {
        console.error(error);
    }
}

infoPassword.onclick = () => info();

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
}

const obtenerDatos = async (urlConsulta, datoConsulta, multiple = false) => {
    try {
        const respuesta = await fetch(urlAPI + urlConsulta + datoConsulta);
        const datosJSON = await respuesta.json();
        const datos = multiple ? datosJSON.response: datosJSON.response[0];      
        return datos;        
    } catch (error) {
        console.error(error);
    }
}