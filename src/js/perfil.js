import { urlAPI, localhost } from './urls.js'

const logoInicio = document.querySelector('#logoInicio');

const fotoUsuario = document.querySelector('#fotoUsuario');
const nombreUsuario = document.querySelector('#nombreUsuario');
const emailUsuario = document.querySelector('#emailUsuario');
const telefonoUsuario = document.querySelector('#telefonoUsuario');
const zonaUsuario = document.querySelector('#zonaUsuario');

const opcionPerfil = document.querySelector('#opcionPerfil');
const editarPerfil = document.querySelector('#editarPerfil');

const opcionPublicaciones = document.querySelector('#opcionPublicaciones');
const publicaciones = document.querySelector('#publicaciones');

const divImagen = document.querySelector('#divImagen');

window.onload = async () => {
    imprimirDatos();
    ocultarOpcionesPerfil();
}

const obtenerParametrosURL = () => {
    const URLactual = new URL(window.location);
    const idSeller = URLactual.searchParams.get('idseller');
    const idUser = URLactual.searchParams.get('iduser');
    const origin = URLactual.searchParams.get('origin');
    return { idSeller, idUser, origin };
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

const imprimirDatos = async () => {
    const { idSeller, idUser, origin } = obtenerParametrosURL();
    let usuario;

    if(origin === 'inicio'){
        const usuarioPerfil = await obtenerDatos('usuarios/getbyid/', idUser);
        usuario = usuarioPerfil;
        console.log('Perfil');
    }else{
        const usuarioVendedor = await obtenerDatos('usuarios/getbyid/', idSeller);
        usuario = usuarioVendedor;
        console.log('Vendedor');
    }

    nombreUsuario.value = usuario.nombre_usuario;
    emailUsuario.value = usuario.correo_usuario;
    telefonoUsuario.value = usuario.telefono_usuario;
    zonaUsuario.value = usuario.zona_entrega_usuario;
    fotoUsuario.src = usuario.img_usuario.file;
}

editarPerfil.onclick = () => {
    const { idSeller, idUser, origin } = obtenerParametrosURL();

    const paginaEditarPerfil = new URL(localhost + 'editarPerfil.html');
    paginaEditarPerfil.searchParams.set('idseller', idSeller);
    paginaEditarPerfil.searchParams.set('iduser', idUser);
    paginaEditarPerfil.searchParams.set('origin', origin);

    window.location.href = paginaEditarPerfil;
}

publicaciones.onclick = () => {
    const { idSeller, idUser, origin } = obtenerParametrosURL();

    const paginaPublicaciones = new URL(localhost + 'publicaciones.html');
    paginaPublicaciones.searchParams.set('idseller', idSeller);
    paginaPublicaciones.searchParams.set('iduser', idUser);
    paginaPublicaciones.searchParams.set('origin', origin);

    window.location.href = paginaPublicaciones;
}

logoInicio.onclick = () => {
    const { idUser } = obtenerParametrosURL();
    const inicio = new URL(localhost + 'index.html');

    if (idUser !== null) {
        inicio.searchParams.set('iduser', idUser);
    }

    window.location.href = inicio;
}

const ocultarOpcionesPerfil = () => {
    const {origin} = obtenerParametrosURL();

    if(origin === 'publicacion'){
        opcionPerfil.classList.add('hidden');
        opcionPublicaciones.classList.add('hidden');
        divImagen.classList.remove('-mt-24');
    }
}