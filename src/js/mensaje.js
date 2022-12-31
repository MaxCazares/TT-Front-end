import { localhost, urlAPI } from "./urls.js";

const listaChats = document.querySelector('#listaChats');

const mensajeIzquierda = document.querySelector('#mensajeIzquierda');
const mensajeDerecha = document.querySelector('#mensajeDerecha');
const mensajeUsuario = document.querySelector('#mensajeUsuario')

const enviarMensajeBoton = document.querySelector('#enviarMensajeBoton');
const regresarBoton = document.querySelector('#regresarBoton');

let chatActual = '';

window.onload = () => {
    const { idSeller, idBuyer } = obtenerParametrosURL();
    comprobarChat(idSeller, idBuyer);
    mostrarChats(idBuyer);
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

    if (chatExistente === '1') {
        console.log('el chat existe');
        // console.log(idSeller);
        // console.log(idBuyer);
        mostrarChatActual(idSeller, idBuyer);
    } else {
        console.log('el chat no existe');
        console.log(idSeller);
        console.log(idBuyer);
        crearChat();
    }
}

const mostrarChats = async (idBuyer) => {
    const chatsBuyer = await obtenerDatos('chat/getalluserchats/', idBuyer, true);
    // console.log(chatsBuyer);
    chatsBuyer.forEach(chat => crearChatHTML(chat));
}

const mostrarChatActual = async (idSeller, idBuyer) => {
    const chat = await obtenerDatos('chat/getchat/', idSeller + ';' + idBuyer);
    chatActual = chat.id_chat;
    chat.message_list.forEach(mensaje => {
        mensajeDerecha.textContent += mensaje + '\n';
    });
}

const crearChat = async () => {
    const { idSeller, idBuyer } = obtenerParametrosURL();

    const nuevoChat = {
        "user1_id": idSeller,
        "user2_id": idBuyer
    }

    console.log('creando chat ...');
    try {
        await fetch(urlAPI + 'chat/', {
            method: "POST",
            body: JSON.stringify(nuevoChat),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    } catch (error) {
        console.error(error);
    }
}

const crearChatHTML = async (chat) => {
    const divExterior = document.createElement('div');
    const divSuperior = document.createElement('div');
    const imagenUsuario = document.createElement('img');
    const imagenPublicacion = document.createElement('img');
    const divInferior = document.createElement('div');
    const ultimoMensaje = document.createElement('label');
    const span = document.createElement('span');
    const iconoLeer = document.createElement('i');
    const iconoEliminar = document.createElement('i');

    const seller = await obtenerDatos('usuarios/getbyid/', chat.user1_id);
    const buyer = await obtenerDatos('usuarios/getbyid/', chat.user2_id);

    imagenUsuario.src = seller.img_usuario.file;
    imagenPublicacion.src = buyer.img_usuario.file;
    ultimoMensaje.textContent = chat.message_list;

    divExterior.classList.add('flex', 'flex-row', 'px-4', 'py-3', 'shadow-slate-300', 'shadow-lg', 'rounded-lg');
    divSuperior.classList.add('flex', 'flex-row', 'mr-5', 'w-40');
    imagenUsuario.classList.add('w-20', 'h-20', 'rounded-full', 'select-none', '-mr-7');
    imagenPublicacion.classList.add('w-20', 'h-20', 'rounded-full', 'select-none');
    divInferior.classList.add('flex', 'flex-col');
    ultimoMensaje.classList.add('my-auto', 'text-base');
    span.classList.add('flex', 'flex-row', 'space-x-5');
    iconoLeer.classList.add('fa-brands', 'fa-readme', 'text-blue-400', 'my-auto');
    iconoEliminar.classList.add('fa-solid', 'fa-trash-can', 'justify-end', 'text-red-500', 'my-auto');

    span.appendChild(iconoLeer);
    span.appendChild(iconoEliminar);
    divInferior.appendChild(ultimoMensaje);
    divInferior.appendChild(span);
    divSuperior.appendChild(imagenUsuario);
    divSuperior.appendChild(imagenPublicacion);
    divExterior.appendChild(divSuperior);
    divExterior.appendChild(divInferior);

    listaChats.appendChild(divExterior);
}

enviarMensajeBoton.onclick = async () => {
    const mensajeInput = mensajeUsuario.value;

    const nuevoMensaje = {
        "id_chat": chatActual,
        "message": mensajeInput
    }

    try {
        await fetch(urlAPI + 'chat/insert_message', {
            method: "POST",
            body: JSON.stringify(nuevoMensaje),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        location.reload();

    } catch (error) {
        console.error(error);
    }
}

regresarBoton.onclick = () => {
    const { idPublicacion, idBuyer } = obtenerParametrosURL();

    const paginaProducto = new URL(localhost + 'producto.html');
    paginaProducto.searchParams.set('idpublication', idPublicacion);
    paginaProducto.searchParams.set('iduser', idBuyer);

    window.location.href = paginaProducto;
}