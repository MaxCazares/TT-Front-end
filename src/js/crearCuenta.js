import { alertSuccess, alertFail, infoPassword as info } from "./alerts.js";
import { urlAPI } from "./urls.js";

const formulario = document.querySelector('#formularioRegistro');

const imagenUsuarioDefault = document.querySelector('#imagenUsuarioDefault');
const nombreFormulario = document.querySelector('#nombreNuevoUsuario');
const emailFormulario = document.querySelector('#emailNuevoUsuario');
const passwordFormulario = document.querySelector('#passwordNuevoUsuario');

const infoPassword = document.querySelector('#infoPassword');
const esconderPassword = document.querySelector('#esconderPassword');

let fotoUsuarioBytes = '';

window.onload = () => {
    formulario.addEventListener('submit', validarCampos);
    compressImage(imagenUsuarioDefault, 0.9, 0.7);
}

const validarCampos = async (e) => {
    e.preventDefault();

    if (nombreFormulario.value === '' || emailFormulario.value === '' || passwordFormulario.value === '') {
        alertFail('Debes de llenar todos los campos');
    }
    else {
        const usuarioRegistrado = await obtenerDatos('usuarios/getbyemail/', emailFormulario.value);
        if (usuarioRegistrado) {
            alertFail('Este correo ha sido registrado en otra cuenta');
            formulario.reset();
        } else {
            registrarUsuario(nombreFormulario.value, emailFormulario.value, passwordFormulario.value)
        }
    }
}

const registrarUsuario = async (nombre, email, password) => {    
    console.log(fotoUsuarioBytes);
    let nuevoUsuario = {
        "nombre_usuario": `${nombre}`,
        "contraseña_usuario": `${password}`,
        "telefono_usuario": "",
        "correo_usuario": `${email}`,
        "zona_entrega_usuario": "",
        "img_usuario": {
            "file": fotoUsuarioBytes
        }
    }
    console.log(nuevoUsuario);

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
        const datos = multiple ? datosJSON.response : datosJSON.response[0];
        return datos;
    } catch (error) {
        console.error(error);
    }
}

const compressImage = (imgToCompress, resizingFactor, quality) => {
    // showing the compressed image
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const originalWidth = imgToCompress.width;
    const originalHeight = imgToCompress.height;

    const canvasWidth = originalWidth * resizingFactor;
    const canvasHeight = originalHeight * resizingFactor;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let compressedImageBlob;

    context.drawImage(
        imgToCompress,
        0,
        0,
        originalWidth * resizingFactor,
        originalHeight * resizingFactor
    );

    // reducing the quality of the image
    canvas.toBlob(
        (blob) => {
            if (blob) {
                compressedImageBlob = blob;
                imgToBytes(compressedImageBlob);
            }
        },
        "image/jpeg",
        quality
    );
}

const imgToBytes = (img) => {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener('load', () => {
        fotoUsuarioBytes = reader.result;
        console.log(fotoUsuarioBytes);
    });
}