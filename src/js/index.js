import { alertFail, alertSuccess } from "./alerts.js";
import { urlAPI, localhost } from "./urls.js";

const formularioBusqueda = document.querySelector('#formularioBusqueda');

const mosaicoTecnologia = document.querySelector('#mosaicoTecnologia');
const contenidoInicio = document.querySelector('#contenidoInicio');

const crearCuentaBoton = document.querySelector('#crearCuentaBoton');
const iniciarSesionBoton = document.querySelector('#iniciarSesionBoton');
const perfilUsuarioBoton = document.querySelector('#perfilUsuarioBoton');
const cerrarSesionBoton = document.querySelector('#cerrarSesionBoton');

window.onload = () => {
    formularioBusqueda.addEventListener('submit', buscarProductos);
    mostrarBotonPerfil();
    consultarPublicaciones('tecnologia');
}

const obtenerParametrosURL = () => {
    const URLactual = new URL(window.location);
    const idUsuario = URLactual.searchParams.get('iduser');
    const nombreUsuario = URLactual.searchParams.get('nameuser');
    return {idUsuario, nombreUsuario};
}

const mostrarBotonPerfil = () => {
    const {nombreUsuario} = obtenerParametrosURL();
    if(nombreUsuario){
        const icon = '<i class="fa-solid fa-user-astronaut mr-1 my-auto text-current"></i>';

        const usuario = nombreUsuario.split(' ');
        const usuarioConApellido = usuario[0] + ' ' + usuario[1];

        crearCuentaBoton.classList.add('hidden');
        iniciarSesionBoton.classList.add('hidden');

        perfilUsuarioBoton.innerHTML = icon + usuarioConApellido;
        
        perfilUsuarioBoton.classList.remove('hidden');
        cerrarSesionBoton.classList.remove('hidden');
    }    
}

perfilUsuarioBoton.onclick = () => {
    const {idUsuario} = obtenerParametrosURL();
    const perfil = new URL(localhost + 'perfil.html');
    perfil.searchParams.set('iduser', idUsuario);

    setTimeout(() => {
        window.location.href = perfil;                
    }, 500);
}

const buscarProductos = e => {
    e.preventDefault();

    const busqueda = document.querySelector('#search').value;

    if(busqueda === ''){
        alertFail('Tu busqueda parece vacia');
        return;
    }

    alertSuccess(busqueda);
}

mosaicoTecnologia.onclick = () => {
    const categoria = mosaicoTecnologia.children[0].children[2].innerHTML;
    consultarPublicaciones(categoria);
};

const consultarPublicaciones = async (categoria) => {
    try {
        const respuesta = await fetch(urlAPI + `publicaciones/getbycategory/${categoria}`)
        const publicacionesJSON = await respuesta.json();
        const publicaciones = publicacionesJSON.response;
        mostrarPublicaciones(publicaciones);
    } catch (error) {
        console.error(error);
    }
}

const mostrarPublicaciones = publicaciones => {
    publicaciones.forEach(publicacion => crearPublicacionesHTML(publicacion));
}

const crearPublicacionesHTML = (publicacion) => {
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

    contenidoInicio.appendChild(divExterior);
}

const irAlProducto = (idPublicacion) => {
    const publicacion = new URL(localhost + 'producto.html');
    publicacion.searchParams.set('idpublicacion', idPublicacion);

    window.location.href = publicacion;
}