import { localhost, urlAPI } from "./urls.js";

const listaChats = document.querySelector('#listaChats');

const regresarBoton = document.querySelector('#regresarBoton');

window.onload = () => {
    const { idPublicacion, idSeller, idBuyer } = obtenerParametrosURL();
    comprobarChat(idSeller, idBuyer);
}

const obtenerParametrosURL = () => {
    const URLactual = new URL(window.location);
    const idPublicacion = URLactual.searchParams.get('idpublication');
    const idSeller = URLactual.searchParams.get('idseller');
    const idBuyer = URLactual.searchParams.get('idbuyer');
    return { idPublicacion, idSeller, idBuyer };
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

const comprobarChat = async (idSeller, idBuyer) => {
    const chatExistente = await obtenerDatos('chat/check/', idSeller + ';' + idBuyer);
    if(chatExistente === '1'){
        console.log('el chat existe');
    }else{
        console.log('el chat no existe');
    }
}

regresarBoton.onclick = () => {
    const { idPublicacion, idSeller } = obtenerParametrosURL();
    
    const paginaProducto = new URL(localhost + 'producto.html');
    paginaProducto.searchParams.set('idpublication', idPublicacion);
    paginaProducto.searchParams.set('iduser', idSeller);

    window.location.href = paginaProducto;
}

const mostrarChat = () => {
    console.log('mostrando chat ...');
}

const crearChat = () => {
    console.log('creando chat ...');
}

const crearChatHTML = (chat) => {
    const divExterior = document.createElement('div');
    const divSuperior = document.createElement('div');
}