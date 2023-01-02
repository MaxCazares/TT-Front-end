import { infoMensaje as info } from "./alerts.js";
import { localhost, urlAPI } from "./urls.js";

const logoInicio = document.querySelector('#logoInicio');

const fotoPublicacion = document.querySelector('#fotoPublicacion');
const nombrePublicacion = document.querySelector('#nombrePublicacion');
const zonaEntregaPublicacion = document.querySelector('#zonaEntregaPublicacion');
const nombreVendedor = document.querySelector('#nombreVendedor');
const descripcionPublicacion = document.querySelector('#descripcionPublicacion');
const correoVendedor = document.querySelector('#correoVendedor');
const telefonoVendedor = document.querySelector('#telefonoVendedor');
const precioPublicacion = document.querySelector('#precioPublicacion');

const perfilVendedor = document.querySelector('#perfilVendedor');
const publicacionesRecomendadas = document.querySelector('#publicacionesRecomendadas');

const mandarMensaje = document.querySelector('#mandarMensaje');
const infoMensaje = document.querySelector('#infoMensaje');

window.onload = async () => {
    const { idPublicacion } = obtenerParametrosURL();

    const datosPublicacion = await obtenerDatos('publicaciones/getbyid/', idPublicacion);
    const datosUsuario = await obtenerDatos('usuarios/getbyid/', datosPublicacion.id_usuario);

    imprimirDatos(datosPublicacion, datosUsuario);
    mostrarPublicacionesRecomendadas(datosPublicacion.categoria);
    // botonMensaje(datosUsuario);
}

const obtenerParametrosURL = () => {
    const URLactual = new URL(window.location);
    const idPublicacion = URLactual.searchParams.get('idpublication');
    const idUser = URLactual.searchParams.get('iduser');
    return { idPublicacion, idUser };
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

const imprimirDatos = (datosPublicacion, datosUsuario) => {
    fotoPublicacion.src = datosPublicacion.img_list[0].file;
    nombrePublicacion.innerHTML = datosPublicacion.nombre;
    descripcionPublicacion.innerHTML = datosPublicacion.descripcion;
    precioPublicacion.innerHTML = '$' + Number(datosPublicacion.precio).toLocaleString('mx');

    zonaEntregaPublicacion.innerHTML = datosUsuario.zona_entrega_usuario;
    nombreVendedor.innerHTML = datosUsuario.nombre_usuario;
    correoVendedor.innerHTML = datosUsuario.correo_usuario;
    telefonoVendedor.innerHTML = datosUsuario.telefono_usuario;

    perfilVendedor.onclick = () => verPerfilVendedor(datosUsuario.id_usuario);
}

const verPerfilVendedor = idSeller => {
    const { idUser } = obtenerParametrosURL();
    const paginaPerfil = new URL(localhost + 'perfil.html');
    paginaPerfil.searchParams.set('idseller', idSeller);
    paginaPerfil.searchParams.set('iduser', idUser);
    paginaPerfil.searchParams.set('origin', 'publicacion');

    window.location.href = paginaPerfil;
}

const mostrarPublicacionesRecomendadas = async (categoria) => {
    const publicaciones = await obtenerDatos('publicaciones/getbycategory/', categoria, true);

    for (let i = 0; i < 4; i++)
        crearPublicacionRecomendadaHTML(publicaciones[i]);
}

const crearPublicacionRecomendadaHTML = async (publicacion) => {
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
    etiquetaP.innerHTML = '$' + Number(publicacion.precio).toLocaleString('mx');

    divExterior.classList.add('md:w-1/3', 'xl:w-1/4', 'p-2');
    divInterior.classList.add('bg-gray-100', 'p-4', 'rounded-lg', 'shadow-lg');
    etiquetaA.classList.add('cursor-pointer');
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

    publicacionesRecomendadas.appendChild(divExterior);
}

const irAlProducto = (idPublicacion) => {
    const { idUser } = obtenerParametrosURL();

    const publicacion = new URL(localhost + 'producto.html');
    publicacion.searchParams.set('idpublication', idPublicacion);

    if (idUser !== null)
        publicacion.searchParams.set('iduser', idUser);

    window.location.href = publicacion;
}

logoInicio.onclick = () => {
    const { idUser } = obtenerParametrosURL();
    const inicio = new URL(localhost + 'index.html');

    if (idUser !== null)
        inicio.searchParams.set('iduser', idUser);

    window.location.href = inicio;
}

// const botonMensaje = async (datosUsuario) => {
//     const { idUser } = obtenerParametrosURL();

//     if (idUser) {
//         infoMensaje.classList.add('hidden');

//         if (idUser != datosUsuario.id_usuario)
//             mandarMensaje.classList.remove('hidden');
//     }
// }

// infoMensaje.onclick = () => info();

// mandarMensaje.onclick = async () => {
//     const { idPublicacion, idUser } = obtenerParametrosURL();
//     const publicacion = await obtenerDatos('publicaciones/getbyid/', idPublicacion);

//     const mensajes = new URL(localhost + 'mensajes.html');
//     mensajes.searchParams.set('idpublication', idPublicacion);
//     mensajes.searchParams.set('idseller', publicacion.id_usuario);
//     mensajes.searchParams.set('idbuyer', idUser);
//     window.location.href = mensajes;
// }