import { alertSuccess } from "./alerts.js";
import { localhost, urlAPI } from "./urls.js";

const fotoPublicacion = document.querySelector('#fotoPublicacion');
const inputFotoPublicacion = document.querySelector('#inputFotoPublicacion');
const tituloPublicacion = document.querySelector('#tituloPublicacion');
const descripcionPublicacion = document.querySelector('#descripcionPublicacion');
const precioPublicacion = document.querySelector('#precioPublicacion');
const categoriaPublicacion = document.querySelector('#categoriaPublicacion');

const crearPublicacion = document.querySelector('#crearPublicacion');
const volverPerfil = document.querySelector('#volverPerfil');

const listaPublicaciones = document.querySelector('#listaPublicaciones');

let fotoPublicacionBytes = '';

window.onload = async () => {
    consultarPublicaciones();
}

volverPerfil.onclick = () => {
    const idUsuario = obtenerParametrosURL();

    const volverPerfil = new URL(localhost + 'perfil.html');
    volverPerfil.searchParams.set('iduser', idUsuario);

    window.location.href = volverPerfil;
}

const obtenerParametrosURL = () => {
    const URLactual = new URL(window.location);
    const idUsuario = URLactual.searchParams.get('iduser');
    return idUsuario;
}

const consultarPublicaciones = async () => {
    const idUsuario = obtenerParametrosURL();
    try {
        const respuesta = await fetch(urlAPI + `publicaciones/getbyuserid/${idUsuario}`);
        const publicacionesJSON = await respuesta.json();
        const publicaciones = publicacionesJSON.response;
        mostrarListaPublicaciones(publicaciones);

    } catch (error) {
        console.error(error);
    }
}

crearPublicacion.onclick = async () => {
    const idUsuario = obtenerParametrosURL();

    const publicacionModificada = {
        "nombre": tituloPublicacion.value,
        "id_usuario": idUsuario,
        "precio": precioPublicacion.value,
        "descripcion": descripcionPublicacion.value,
        "categorias": [categoriaPublicacion.value],
        "img_list": [{
            "file": fotoPublicacionBytes
        }]
    }

    try {
        const respuesta = await fetch(urlAPI + 'publicaciones', {
            method: "POST",
            body: JSON.stringify(publicacionModificada),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        
        alertSuccess('Publicación agregada correctamente');
        
        setTimeout(() => {            
            location.reload();
        }, 2500);

    } catch (error) {
        console.error(error);
    }
}

inputFotoPublicacion.addEventListener('change', e => {
    const foto = inputFotoPublicacion.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        fotoPublicacion.src = reader.result;
        fotoPublicacionBytes = reader.result;
    });

    reader.readAsDataURL(foto);
});

const mostrarListaPublicaciones = publicaciones => {
    publicaciones.forEach(publicacion => {
        crearPublicacionHTML(publicacion.nombre, publicacion.precio, publicacion.img_list[0]);
    });
}

const crearPublicacionHTML = (nombreProducto, precioProducto, imagenProducto) => {
    const divExterior = document.createElement('div');
    const imagen = document.createElement('img');
    const divIntermedio = document.createElement('div');
    const titulo = document.createElement('label');
    const divInterior = document.createElement('div');
    const precio = document.createElement('label');
    const iconoEdicion = document.createElement('i');
    const iconoEliminar = document.createElement('i');

    imagen.src = imagenProducto;
    titulo.innerHTML = nombreProducto;
    precio.textContent = '$' + precioProducto;

    divExterior.classList.add('p-3', 'grid', 'grid-cols-3', 'shadow-xl', 'text-xl');
    imagen.classList.add('w-24', 'col-span-1', 'rounded-md');
    divIntermedio.classList.add('col-span-2', 'flex', 'flex-col', 'p-3');
    // titulo no tiene estilos
    divInterior.classList.add('flex', 'flex-row', 'mt-8', 'justify-end', 'space-x-5', 'px-3');
    precio.classList.add('my-auto');
    iconoEdicion.classList.add('fa-solid', 'fa-pen', 'text-blue-400', 'my-auto');
    iconoEliminar.classList.add('fa-solid', 'fa-trash-can', 'justify-end', 'text-red-500', 'my-auto');

    divInterior.appendChild(precio);
    divInterior.appendChild(iconoEdicion);
    divInterior.appendChild(iconoEliminar);

    divIntermedio.appendChild(titulo);
    divIntermedio.appendChild(divInterior);

    divExterior.appendChild(imagen);
    divExterior.appendChild(divIntermedio);

    listaPublicaciones.appendChild(divExterior);
}