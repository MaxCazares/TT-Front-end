import { localhost, urlAPI } from "./urls.js";

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

window.onload = async () => {
    const idPublicacion = obtenerParametrosURL();
    const datosPublicacion = await obtenerDatos('publicaciones/getbyid/', idPublicacion);
    const datosUsuario = await obtenerDatos('usuarios/getbyid/', datosPublicacion.id_usuario);
    imprimirDatos(datosPublicacion, datosUsuario);

    mostrarPublicacionesRecomendadas(datosPublicacion.categoria);
}

const obtenerParametrosURL = () => {
    const URLactual = new URL(window.location);
    const idPublicacion = URLactual.searchParams.get('idpublicacion');
    return idPublicacion;
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

const imprimirDatos = (datosPublicacion, datosUsuario) => {
    fotoPublicacion.src = datosPublicacion.img_list[0].file;
    nombrePublicacion.innerHTML = datosPublicacion.nombre;
    descripcionPublicacion.innerHTML = datosPublicacion.descripcion;
    precioPublicacion.innerHTML = '$' + datosPublicacion.precio;

    zonaEntregaPublicacion.innerHTML = datosUsuario.zona_entrega_usuario;
    nombreVendedor.innerHTML = datosUsuario.nombre_usuario;
    correoVendedor.innerHTML = datosUsuario.correo_usuario;
    telefonoVendedor.innerHTML = datosUsuario.telefono_usuario;

    perfilVendedor.onclick = () => verPerfilVendedor(datosUsuario.id_usuario);
}

const verPerfilVendedor = idUsuario => {
    const paginaPerfil = new URL(localhost + 'perfil.html');
    paginaPerfil.searchParams.set('iduser', idUsuario);
    paginaPerfil.searchParams.set('product', 'true');

    window.location.href = paginaPerfil;
}

const mostrarPublicacionesRecomendadas = async (categoria) => {
    const publicaciones = await obtenerDatos('publicaciones/getbycategory/', categoria, true);
    
    publicaciones.forEach(publicacion => crearPublicacionHTML(publicacion));
}

const crearPublicacionHTML = (publicacion) => {
    const divExterior = document.createElement('div');
    const divInterior = document.createElement('div');
    const etiquetaA = document.createElement('a');
    const imagen = document.createElement('img');
    const h3 = document.createElement('h3');
    const h2 = document.createElement('h2');
    const etiquetaP = document.createElement('p');

    etiquetaA.onclick = () => irAlProducto(publicacion.id_publicacion);
    imagen.src = publicacion.img_list[0].file;
    h3.innerHTML = 'Tlalnepantla';
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

    publicacionesRecomendadas.appendChild(divExterior);
}

const irAlProducto = (idPublicacion) => {
    const publicacion = new URL(localhost + 'producto.html');
    publicacion.searchParams.set('idpublicacion', idPublicacion);

    window.location.href = publicacion;
}