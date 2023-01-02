import { alertFail, alertSuccess } from './alerts.js';
import { urlAPI, localhost } from './urls.js'

const logoInicio = document.querySelector('#logoInicio');
const cerrarSesionBoton = document.querySelector('#cerrarSesionBoton');

const fotoUsuario = document.querySelector('#fotoUsuario');
const nombreUsuario = document.querySelector('#nombreUsuario');
const emailUsuario = document.querySelector('#emailUsuario');
const telefonoUsuario = document.querySelector('#telefonoUsuario');
const zonaUsuario = document.querySelector('#zonaUsuario');

const opcionMandarMensaje = document.querySelector('#opcionMandarMensaje');
const mandarMensaje = document.querySelector('#mandarMensaje');

const opcionPerfil = document.querySelector('#opcionPerfil');
const editarPerfil = document.querySelector('#editarPerfil');

const opcionPublicaciones = document.querySelector('#opcionPublicaciones');
const publicaciones = document.querySelector('#publicaciones');

const opcionMensajes = document.querySelector('#opcionMensajes');
const mensajes = document.querySelector('#mensajes');

const divImagen = document.querySelector('#divImagen');
const estrellasPuntuacion = document.querySelector('#estrellasPuntuacion');

const seccionFormularioComentarios = document.querySelector('#seccionFormularioComentarios');
const formularioComentario = document.querySelector('#formularioComentario');
const fechaComentario = document.querySelector('#fechaComentario');
const encabezadoComentario = document.querySelector('#encabezadoComentario');
const contenidoComentario = document.querySelector('#contenidoComentario');
const seccionComentarios = document.querySelector('#seccionComentarios');

let puntuacionComentario = 0;

window.onload = async () => {
    const { idSeller, idUser, origin } = obtenerParametrosURL();
    imprimirDatos(idSeller, idUser, origin);
    ocultarOpcionesPerfil(origin);
    mostarComentarios(idSeller, idUser, origin);

    formularioComentario.addEventListener('submit', enviarComentario);
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

const imprimirDatos = async (idSeller, idUser, origin) => {
    let usuario;

    if (origin === 'inicio') {
        const usuarioPerfil = await obtenerDatos('usuarios/getbyid/', idUser);
        usuario = usuarioPerfil;
        // console.log('Perfil');
    } else {
        const usuarioVendedor = await obtenerDatos('usuarios/getbyid/', idSeller);
        usuario = usuarioVendedor;
        // console.log('Vendedor');
    }

    nombreUsuario.value = usuario.nombre_usuario;
    emailUsuario.value = usuario.correo_usuario;
    telefonoUsuario.value = usuario.telefono_usuario;
    zonaUsuario.value = usuario.zona_entrega_usuario;
    fotoUsuario.src = usuario.img_usuario.file === '' ?
        "../img/defaulUser.jpeg" : usuario.img_usuario.file;
}

mandarMensaje.onclick = () => {
    const { idSeller, idUser, origin } = obtenerParametrosURL();
    console.log(idSeller);
    const paginaMensajes = new URL(localhost + 'mensajes.html');
    paginaMensajes.searchParams.set('idseller', idSeller);
    paginaMensajes.searchParams.set('iduser', idUser);
    paginaMensajes.searchParams.set('origin', origin);

    window.location.href = paginaMensajes;
}

editarPerfil.onclick = () => {
    const { idUser, origin } = obtenerParametrosURL();

    const paginaEditarPerfil = new URL(localhost + 'editarPerfil.html');
    paginaEditarPerfil.searchParams.set('iduser', idUser);
    paginaEditarPerfil.searchParams.set('origin', origin);

    window.location.href = paginaEditarPerfil;
}

publicaciones.onclick = () => {
    const { idUser, origin } = obtenerParametrosURL();

    const paginaPublicaciones = new URL(localhost + 'publicaciones.html');
    paginaPublicaciones.searchParams.set('iduser', idUser);
    paginaPublicaciones.searchParams.set('origin', origin);

    window.location.href = paginaPublicaciones;
}

mensajes.onclick = () => {
    const { idSeller, idUser, origin } = obtenerParametrosURL();

    const paginaMensajes = new URL(localhost + 'mensajes.html');
    paginaMensajes.searchParams.set('idseller', idSeller);
    paginaMensajes.searchParams.set('iduser', idUser);
    paginaMensajes.searchParams.set('origin', origin);

    window.location.href = paginaMensajes;
}

logoInicio.onclick = () => {
    const { idUser } = obtenerParametrosURL();
    const inicio = new URL(localhost + 'index.html');

    if (idUser !== null) {
        inicio.searchParams.set('iduser', idUser);
    }

    window.location.href = inicio;
}

const ocultarOpcionesPerfil = (origin) => {
    const { idSeller, idUser } = obtenerParametrosURL();

    if (origin === 'publicacion') {
        opcionPerfil.classList.add('hidden');
        opcionPublicaciones.classList.add('hidden');
        opcionMensajes.classList.add('hidden');
        cerrarSesionBoton.classList.add('hidden');
        divImagen.classList.remove('-mt-24');

        if (idSeller === idUser) {
            opcionMandarMensaje.classList.add('hidden');
            seccionFormularioComentarios.classList.add('hidden');
        } else
            if (idUser === 'null') {
                opcionMandarMensaje.classList.add('hidden');
            }

    } else {
        opcionMandarMensaje.classList.add('hidden');
        seccionFormularioComentarios.classList.add('hidden');
    }
}

estrellasPuntuacion.onclick = (e) => {
    let contador = e.target.id[0];
    let nombre = e.target.id.substring(1);

    puntuacionComentario = contador;

    for (let i = 0; i < 5; i++) {
        const estrellaSeleccionada = document.getElementById((i + 1) + nombre);
        if (i < contador)
            estrellaSeleccionada.classList.add('text-blue-700');
        else
            estrellaSeleccionada.classList.remove('text-blue-700');
    }
}

const enviarComentario = async (e) => {
    e.preventDefault();
    const { idSeller } = obtenerParametrosURL();

    if (puntuacionComentario === 0 || fechaComentario.value === ''
        || encabezadoComentario.value === '' || contenidoComentario.value === '') {
        alertFail('Todos los campos son obligatorios');
        formularioComentario.reset();
        return;
    }

    let nuevoComentario = {
        "id_usuario": idSeller,
        "encabezado": encabezadoComentario.value,
        "fecha_comentario": new Date(fechaComentario.value).toLocaleString('es-MX'),
        "puntuacion": puntuacionComentario,
        "descripcion": contenidoComentario.value
    }

    try {
        await fetch(urlAPI + 'usercomment', {
            method: "POST",
            body: JSON.stringify(nuevoComentario),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertSuccess('Comentario registrado correctamente');
        setTimeout(() => window.location.reload(), 1500);

    } catch (error) {
        console.error(error);
    }
}

const mostarComentarios = async (idSeller, idUser, origin) => {
    let comentarios = origin === 'publicacion' ?
        await obtenerDatos('usercomment/getbyuserid/', idSeller, true) :
        await obtenerDatos('usercomment/getbyuserid/', idUser, true);

    comentarios.forEach(comentario => crearComentario(comentario));
}

const crearComentario = (comentario) => {
    const divExterior = document.createElement('div');
    const divSuperior = document.createElement('div');
    const span = document.createElement('span');
    const etiquetaFecha = document.createElement('p');
    const divInferior = document.createElement('div');
    const etiquetaEncabezado = document.createElement('h2');
    const parrafoDescripcion = document.createElement('p');

    etiquetaFecha.textContent = comentario.fecha_comentario;
    etiquetaEncabezado.textContent = comentario.encabezado;
    parrafoDescripcion.textContent = comentario.descripcion;

    divExterior.classList.add('flex', 'flex-col', 'flex-wrap', 'py-4', 'space-y-3');
    divSuperior.classList.add('w-auto', 'flex', 'shadow-sm', 'flex-row', 'py-0.5', 'space-x-5');
    span.classList.add('text-blue-700', 'space-x-2', 'text-base');
    etiquetaFecha.classList.add('text-gray-500');
    divInferior.classList.add('space-y-3');
    etiquetaEncabezado.classList.add('text-2xl', 'font-medium', 'text-gray-900');
    parrafoDescripcion.classList.add('text-justify');

    for (let i = 0; i < comentario.puntuacion; i++) {
        const iconoEstrella = document.createElement('i');
        iconoEstrella.classList.add('fa-solid', 'fa-star');
        span.appendChild(iconoEstrella);
    }

    divSuperior.appendChild(span);
    divSuperior.appendChild(etiquetaFecha);
    divInferior.appendChild(etiquetaEncabezado);
    divInferior.appendChild(parrafoDescripcion);
    divExterior.appendChild(divSuperior);
    divExterior.appendChild(divInferior);

    seccionComentarios.appendChild(divExterior);
}