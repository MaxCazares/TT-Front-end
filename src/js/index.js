import { alertFail } from "./alerts.js";
import { urlAPI, localhost } from "./urls.js";

const logoInicio = document.querySelector('#logoInicio');
const formularioBusqueda = document.querySelector('#formularioBusqueda');

const mosaicos = document.querySelector('#mosaicos');
const contenidoInicio = document.querySelector('#contenidoInicio');

const crearCuentaBoton = document.querySelector('#crearCuentaBoton');
const iniciarSesionBoton = document.querySelector('#iniciarSesionBoton');
const perfilUsuarioBoton = document.querySelector('#perfilUsuarioBoton');
const cerrarSesionBoton = document.querySelector('#cerrarSesionBoton');

window.onload = async () => {
    formularioBusqueda.addEventListener('submit', buscarProductos);
    mostrarBotonPerfil();

    const publicaciones = await obtenerDatos('publicaciones/getbycategory/', 'tecnologia', true);
    publicaciones.forEach(publicacion => crearPublicacionesHTML(publicacion));
}

const obtenerParametrosURL = () => {
    const URLactual = new URL(window.location);
    const idUsuario = URLactual.searchParams.get('iduser');
    return idUsuario;
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

const mostrarBotonPerfil = async () => {
    const idUsuario = obtenerParametrosURL();
    const usuario = await obtenerDatos('usuarios/getbyid/', idUsuario);

    if (usuario) {
        const nombreUsuario = usuario.nombre_usuario.split(' ');
        const nombreUsuarioApellido = nombreUsuario[0] + ' ' + nombreUsuario[1];

        crearCuentaBoton.classList.add('hidden');
        iniciarSesionBoton.classList.add('hidden');

        perfilUsuarioBoton.innerHTML = nombreUsuarioApellido;

        perfilUsuarioBoton.classList.remove('hidden');
        cerrarSesionBoton.classList.remove('hidden');
    }
}

perfilUsuarioBoton.onclick = () => {
    const idUsuario = obtenerParametrosURL();
    const perfil = new URL(localhost + 'perfil.html');
    perfil.searchParams.set('iduser', idUsuario);
    perfil.searchParams.set('origin', 'inicio');

    window.location.href = perfil;
}

const buscarProductos = async (e) => {
    e.preventDefault();

    const busqueda = document.querySelector('#search').value;

    if (busqueda === '') {
        alertFail('Tu busqueda parece vacia');
        return;
    } else {
        contenidoInicio.innerHTML = '';
        const publicaciones = await obtenerDatos('publicaciones/getbyname/', busqueda, true);
        if (publicaciones.length > 0) {
            publicaciones.forEach(publicacion => crearPublicacionesHTML(publicacion));
        } else {
            alertFail('No se encontro lo que buscabas');
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }
}

mosaicos.onclick = async (e) => {
    const categoria = e.target.dataset.categoria;
    contenidoInicio.innerHTML = '';
    const publicaciones = await obtenerDatos('publicaciones/getbycategory/', categoria, true);
    publicaciones.forEach(publicacion => crearPublicacionesHTML(publicacion));
};

const crearPublicacionesHTML = async (publicacion) => {
    const divExterior = document.createElement('div');
    const divInterior = document.createElement('div');
    const etiquetaA = document.createElement('a');
    const imagen = document.createElement('img');
    const h3 = document.createElement('h3');
    const h2 = document.createElement('h2');
    const etiquetaP = document.createElement('p');

    const usuario = await obtenerDatos('usuarios/getbyid/', publicacion.id_usuario);

    etiquetaA.onclick = () => irAlProducto(publicacion.id_publicacion);
    imagen.src = publicacion.img_list[0].file;
    h3.innerHTML = usuario.zona_entrega_usuario;
    h2.innerHTML = publicacion.nombre;
    etiquetaP.innerHTML = '$' + publicacion.precio;

    divExterior.classList.add('md:w-1/3', 'xl:w-1/4', 'p-2');
    divInterior.classList.add('bg-gray-100', 'p-4', 'rounded-lg', 'shadow-lg');
    // la etiqueta 'a' no tiene estilos
    imagen.classList.add('w-full', 'rounded-lg', 'mx-auto', 'object-cover', 'object-center', 'mb-6', 'h-52');
    h3.classList.add('tracking-widest', 'text-orange-500', 'text-xs', 'font-bold');
    h2.classList.add('text-lg', 'text-gray-900', 'font-semibold', 'mb-0');
    etiquetaP.classList.add('leading-relaxed', 'text-base');

    etiquetaA.appendChild(imagen);
    etiquetaA.appendChild(h3);
    etiquetaA.appendChild(h2);
    etiquetaA.appendChild(etiquetaP);
    divInterior.appendChild(etiquetaA);
    divExterior.appendChild(divInterior);

    contenidoInicio.appendChild(divExterior);
}

const irAlProducto = (idPublicacion) => {
    const idUsuario = obtenerParametrosURL();

    const publicacion = new URL(localhost + 'producto.html');
    publicacion.searchParams.set('idpublication', idPublicacion);

    if(idUsuario !== null)
        publicacion.searchParams.set('iduser', idUsuario);

    window.location.href = publicacion;
}

logoInicio.onclick = () => {
    const idUsuario = obtenerParametrosURL();
    const inicio = new URL(localhost + 'index.html');

    if(idUsuario)
        inicio.searchParams.set('iduser', idUsuario);
    
        window.location.href = inicio;
}