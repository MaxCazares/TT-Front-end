import { alertFail, alertSuccess } from "./alerts.js";
import { localhost, urlAPI } from "./urls.js";

const fotoPublicacion = document.querySelector('#fotoPublicacion');
const inputFotoPublicacion = document.querySelector('#inputFotoPublicacion');
const tituloPublicacion = document.querySelector('#tituloPublicacion');
const descripcionPublicacion = document.querySelector('#descripcionPublicacion');
const precioPublicacion = document.querySelector('#precioPublicacion');
const categoriaPublicacion = document.querySelector('#categoriaPublicacion');

const crearPublicacion = document.querySelector('#crearPublicacion');
const actualizarPublicacion = document.querySelector('#actualizarPublicacion');
const volverPerfil = document.querySelector('#volverPerfil');

const listaPublicaciones = document.querySelector('#listaPublicaciones');

let fotoPublicacionBytes = '';

window.onload = async () => {
    consultarPublicaciones();
}

const obtenerParametrosURL = () => {
    const URLactual = new URL(window.location);
    const idSeller = URLactual.searchParams.get('idseller');
    const idUser = URLactual.searchParams.get('iduser');
    const origin = URLactual.searchParams.get('origin');
    return { idSeller, idUser, origin };
}

const consultarPublicaciones = async () => {
    const {idUser} = obtenerParametrosURL();
    try {
        const respuesta = await fetch(urlAPI + `publicaciones/getbyuserid/${idUser}`);
        const publicacionesJSON = await respuesta.json();
        const publicaciones = publicacionesJSON.response;
        
        publicaciones.forEach(publicacion => crearPublicacionHTML(publicacion));

    } catch (error) {
        console.error(error);
    }
}

const crearPublicacionHTML = (publicacion) => {
    const idPublicacion = publicacion.id_publicacion;
    const imagenPublicacion = publicacion.img_list[0].file;
    const nombrePublicacion = publicacion.nombre;
    const precioPublicacion = publicacion.precio;

    const divExterior = document.createElement('div');
    const imagen = document.createElement('img');
    const divIntermedio = document.createElement('div');
    const titulo = document.createElement('label');
    const divInterior = document.createElement('div');
    const precio = document.createElement('label');
    const iconoEdicion = document.createElement('i');
    const iconoEliminar = document.createElement('i');

    imagen.src = imagenPublicacion;
    titulo.innerHTML = nombrePublicacion;
    precio.textContent = '$' + precioPublicacion;

    iconoEdicion.onclick = () => editarPublicacion(publicacion);
    iconoEliminar.onclick = () => eliminarPublicacion(idPublicacion);

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

const editarPublicacion = publicacion => {
    const idPublicacion = publicacion.id_publicacion;
    const imagen = publicacion.img_list[0].file;
    const nombre = publicacion.nombre;
    const precio = publicacion.precio;
    const categoria = publicacion.categoria;
    const descripcion = publicacion.descripcion;

    fotoPublicacionBytes = imagen;

    fotoPublicacion.src = imagen;
    tituloPublicacion.value = nombre;
    precioPublicacion.value = precio;
    categoriaPublicacion.value = categoria;
    descripcionPublicacion.value = descripcion;

    crearPublicacion.classList.add('hidden');
    actualizarPublicacion.classList.remove('hidden');
    actualizarPublicacion.onclick = () => modificarPublicacion(idPublicacion);
}

const modificarPublicacion = async (idPublicacion) => {
    const {idUser} = obtenerParametrosURL();

    if (tituloPublicacion.value === '' || precioPublicacion.value === ''
        || categoriaPublicacion.value === '' || descripcionPublicacion.value === ''
        || fotoPublicacionBytes === '') {

        alertFail('Todos los campos son requeridos');
        return
    }

    const publicacionModificada = {
        "id": idPublicacion,
        "campos": {
            "nombre": tituloPublicacion.value,
            "id_usuario": idUser,
            "precio": precioPublicacion.value,
            "descripcion": descripcionPublicacion.value,
            "categoria": categoriaPublicacion.value,
            "img_list": [{
                "file": fotoPublicacionBytes
            }]
        }
    }

    try {
        await fetch(urlAPI + 'publicaciones/update', {
            method: "PUT",
            body: JSON.stringify(publicacionModificada),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        alertSuccess('Publicación actualizada correctamente');

        setTimeout(() => {
            location.reload();
        }, 1500);

    } catch (error) {
        console.error(error);
    }
}

const eliminarPublicacion = (idPublicacion) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'No es posible recuperar publicaciones borradas',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#174e9d',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar publicación'
    }).then(async (result) => {
        if (result.isConfirmed) {

            await fetch(urlAPI + `publicaciones/${idPublicacion}`, {
                method: "DELETE",
            });

            Swal.fire({
                icon: 'success',
                title: 'La publicación ha sido borrada',
                showConfirmButton: false,
                timer: 1000
            })

            setTimeout(() => {
                location.reload();
            }, 1500);
        }
    })
}

crearPublicacion.onclick = async () => {
    const {idUser} = obtenerParametrosURL();

    if (tituloPublicacion.value === '' || precioPublicacion.value === ''
        || categoriaPublicacion.value === '' || descripcionPublicacion.value === ''
        || fotoPublicacionBytes === '') {

        alertFail('Todos los campos son requeridos');
        return
    }

    const nuevaPublicacion = {
        "nombre": tituloPublicacion.value,
        "id_usuario": idUser,
        "precio": precioPublicacion.value,
        "descripcion": descripcionPublicacion.value,
        "categoria": categoriaPublicacion.value,
        "img_list": [{
            "file": fotoPublicacionBytes
        }]
    }

    try {
        const respuesta = await fetch(urlAPI + 'publicaciones', {
            method: "POST",
            body: JSON.stringify(nuevaPublicacion),
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

volverPerfil.onclick = () => {
    const { idSeller, idUser, origin } = obtenerParametrosURL();

    const volverPerfil = new URL(localhost + 'perfil.html');
    volverPerfil.searchParams.set('idseller', idSeller);
    volverPerfil.searchParams.set('iduser', idUser);
    volverPerfil.searchParams.set('origin', origin);

    window.location.href = volverPerfil;
}

inputFotoPublicacion.addEventListener('change', () => {
    const foto = inputFotoPublicacion.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        fotoPublicacion.src = reader.result;
        fotoPublicacionBytes = reader.result;
    });

    reader.readAsDataURL(foto);
});