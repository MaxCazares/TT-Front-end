import { urlAPI } from "./urls.js";

const contenidoInicio = document.querySelector('#contenidoInicio');

window.onload = async () => {
    let t1 = performance.now();
    const publicacionesRandom = await obtenerDatos('publicaciones/getrandom', '', true);
    publicacionesRandom.forEach(publicacion => crearPublicacionesHTML(publicacion));
    // console.log(publicacionesRandom);
    let t2 = performance.now();
    console.log(`Las publicaciones random tardan: ${t2 - t1} milisegundos`);
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

const obtenerImagen = async (hostImage, idPublicacion) => {
    const consultaImagen = ':5000/publicaciones/getimage/';
    try {
        const respuesta = await fetch('http://' + hostImage + consultaImagen + idPublicacion);
        const a = await respuesta.text();
        return a;
    } catch (error) {
        console.error(error);
    }
}

const crearPublicacionesHTML = async (publicacion) => {
    const divExterior = document.createElement('div');
    const divInterior = document.createElement('div');
    const etiquetaA = document.createElement('a');
    const imagenProducto = document.createElement('img');
    const h3 = document.createElement('h3');
    const h2 = document.createElement('h2');
    const etiquetaP = document.createElement('p');

    const usuario = await obtenerDatos('usuarios/getbyid/', publicacion.id_usuario);
    const t1 = performance.now();
    const imagen = await obtenerImagen(publicacion.host, publicacion.id_publicacion);
    // imagenProducto.src = '../img/defaultProduct.png';
    imagenProducto.src = imagen;
    const t2 = performance.now();
    console.log(`Tiempo de la imagen: ${t2-t1}`);

    etiquetaA.onclick = () => irAlProducto(publicacion.id_publicacion);
    h3.innerHTML = usuario.zona_entrega_usuario;
    h2.innerHTML = publicacion.nombre;
    etiquetaP.innerHTML = '$' + Number(publicacion.precio).toLocaleString('mx');

    divExterior.classList.add('md:w-1/3', 'xl:w-1/4', 'p-2');
    divInterior.classList.add('bg-gray-100', 'p-4', 'rounded-lg', 'shadow-lg');
    etiquetaA.classList.add('cursor-pointer');
    imagenProducto.classList.add('w-full', 'rounded-lg', 'mx-auto', 'object-cover', 'object-center', 'mb-6', 'h-52');
    h3.classList.add('tracking-widest', 'text-orange-500', 'text-xs', 'font-bold');
    h2.classList.add('text-lg', 'text-gray-900', 'font-semibold', 'mb-0');
    etiquetaP.classList.add('leading-relaxed', 'text-base');

    etiquetaA.appendChild(imagenProducto);
    etiquetaA.appendChild(h3);
    etiquetaA.appendChild(h2);
    etiquetaA.appendChild(etiquetaP);
    divInterior.appendChild(etiquetaA);
    divExterior.appendChild(divInterior);

    contenidoInicio.appendChild(divExterior);
}