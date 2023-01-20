import { alertSuccess } from './alerts.js';
import { urlAPI, localhost } from './urls.js'

const fotoUsuario = document.querySelector('#fotoUsuario');
const inputFotoUsuario = document.querySelector('#inputFotoUsuario');
const nombreUsuario = document.querySelector('#nombreUsuario');
const emailUsuario = document.querySelector('#emailUsuario');
const passwordUsuario = document.querySelector('#passwordUsuario');
const esconderPassword = document.querySelector('#esconderPassword');
const telefonoUsuario = document.querySelector('#telefonoUsuario');
const zonaUsuario = document.querySelector('#zonaUsuario');

const actualizarInformacion = document.querySelector('#actualizarInformacionUsuario');

let fotoUsuarioBytes = '';

window.onload = async () => {
    const {idUser} = obtenerParametrosURL();
    const usuario = await obtenerDatos('usuarios/getbyid/', idUser);
    const imagenUsuario = await obtenerImagen(usuario.host, 'usuarios', usuario.id_usuario);
    imprimirDatos(usuario, imagenUsuario);
}

const obtenerParametrosURL = () => {
    const URLactual = new URL(window.location);
    const idUser = URLactual.searchParams.get('iduser');
    const origin = URLactual.searchParams.get('origin');
    return { idUser, origin };
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

const obtenerImagen = async (hostImage, tipoImagen, idPublicacion) => {
    const consultaImagen = `:5000/${tipoImagen}/getimage/`;
    try {
        const respuesta = await fetch('http://' + hostImage + consultaImagen + idPublicacion);
        const a = await respuesta.text();
        return a;
    } catch (error) {
        console.error(error);
    }
}

const imprimirDatos = (usuario, imagenUsuario) => {  
    nombreUsuario.value = usuario.nombre_usuario;
    emailUsuario.value = usuario.correo_usuario;
    passwordUsuario.value = usuario.contraseña_usuario;
    telefonoUsuario.value = usuario.telefono_usuario;
    zonaUsuario.value = usuario.zona_entrega_usuario;
    fotoUsuarioBytes = imagenUsuario;
    fotoUsuario.src = imagenUsuario;
}

actualizarInformacion.onclick = async () => {
    const {idUser} = obtenerParametrosURL();

    const usuarioModificado = {
        "id": idUser,
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
        await fetch(urlAPI + 'usuarios/update', {
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
    const { idUser, origin } = obtenerParametrosURL();

    const paginaPerfil = new URL(localhost + 'perfil.html');
    paginaPerfil.searchParams.set('iduser', idUser);
    paginaPerfil.searchParams.set('origin', origin);

    window.location.href = paginaPerfil;
}

inputFotoUsuario.addEventListener('change', e => {
    const foto = inputFotoUsuario.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        fotoUsuario.src = reader.result;
    });

    reader.readAsDataURL(foto);

    fotoUsuario.addEventListener('load', () => {
        compressImage(fotoUsuario, 1, 0.6);
    });

    console.log(fotoUsuarioBytes);
});

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
    });
}

esconderPassword.onclick = () => {
    if (passwordUsuario.type == 'password') {
        passwordUsuario.type = 'text';
        esconderPassword.classList.add('fa-eye');
        esconderPassword.classList.remove('fa-sharp');
        esconderPassword.classList.remove('fa-eye-slash');

    } else {
        passwordUsuario.type = 'password';
        esconderPassword.classList.remove('fa-eye');
        esconderPassword.classList.add('fa-sharp');
        esconderPassword.classList.add('fa-eye-slash');
    }
};