import { localhost, urlAPI } from "./urls.js";

const logoInicio = document.querySelector('#logoInicio');

const listaChats = document.querySelector('#listaChats');

const mensajeIzquierda = document.querySelector('#mensajeIzquierda');
const mensajeDerecha = document.querySelector('#mensajeDerecha');
const mensajeUsuario = document.querySelector('#mensajeUsuario')

const enviarMensajeBoton = document.querySelector('#enviarMensajeBoton');
const regresarBoton = document.querySelector('#regresarBoton');

let chatActual = '';

window.onload = () => {
    const { idSeller, idUser } = obtenerParametrosURL();
    comprobarChat(idSeller, idUser);
    mostrarChats(idUser);
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

const obtenerImagen = async (hostImage, tipoImagen, id) => {
    const consultaImagen = `:5000/${tipoImagen}/getimage/`;
    try {
        const respuesta = await fetch('http://' + hostImage + consultaImagen + id);
        const a = await respuesta.text();
        return a;
    } catch (error) {
        console.error(error);
    }
}

const comprobarChat = async (idSeller, idUser) => {
    if (idSeller != 'null') {
        const chatExistente = await obtenerDatos('chat/check/', idSeller + ';' + idUser);

        if (chatExistente === '1') {
            console.log('el chat existe');
            mostrarChatActual(idSeller, idUser);
        } else {
            console.log('el chat no existe');
            crearChat();
            mostrarChatActual(idSeller, idUser);
        }
    }
}

const mostrarChats = async (idUser) => {
    const chatsUser = await obtenerDatos('chat/getalluserchats/', idUser, true);
    chatsUser.forEach(chat => crearChatHTML(chat));
}

const mostrarChatActual = async (idSeller, idUser) => {
    const chat = await obtenerDatos('chat/getchat/', idSeller + ';' + idUser);
    chatActual = chat.id_chat;
    chat.message_list.forEach(mensaje => burbujasChat(mensaje, idUser));
}

const crearChat = async () => {
    const { idSeller, idUser } = obtenerParametrosURL();

    const nuevoChat = {
        "user1_id": idSeller,
        "user2_id": idUser
    }

    console.log('creando chat ...');
    try {
        await fetch(urlAPI + 'chat/', {
            method: "POST",
            body: JSON.stringify(nuevoChat),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        mostrarChatActual(idSeller, idUser);
    } catch (error) {
        console.error(error);
    }
}

const crearChatHTML = async (chat) => {
    const { idUser } = obtenerParametrosURL()

    const divExterior = document.createElement('div');
    const divSuperior = document.createElement('div');
    const imagenUsuario1 = document.createElement('img');
    const imagenUsuario2 = document.createElement('img');
    const divInferior = document.createElement('div');
    const ultimoMensaje = document.createElement('label');
    const span = document.createElement('span');
    const iconoLeer = document.createElement('i');
    const iconoEliminar = document.createElement('i');

    const usuario1 = await obtenerDatos('usuarios/getbyid/', chat.user1_id);
    const imgUsuario1 = await obtenerImagen(usuario1.host, 'usuarios', usuario1.id_usuario);
    
    const usuario2 = await obtenerDatos('usuarios/getbyid/', chat.user2_id);
    const imgUsuario2 = await obtenerImagen(usuario2.host, 'usuarios', usuario2.id_usuario);

    if (usuario2.id_usuario === idUser) {
        imagenUsuario1.src = imgUsuario1;
        imagenUsuario2.src = imgUsuario2;
    } else {
        imagenUsuario1.src = imgUsuario2;
        imagenUsuario2.src = imgUsuario1;
    }

    ultimoMensaje.textContent = chat.message_list[0].contenido;

    iconoLeer.onclick = () => mostrarChat(chat.user1_id, chat.user2_id);
    iconoEliminar.onclick = () => eliminarChat(chat.id_chat);

    divExterior.classList.add('flex', 'flex-row', 'px-4', 'py-3', 'shadow-slate-300', 'shadow-lg', 'rounded-lg');
    divSuperior.classList.add('flex', 'flex-row', 'mr-5', 'w-40');
    imagenUsuario1.classList.add('w-20', 'h-20', 'rounded-full', 'select-none', '-mr-7');
    imagenUsuario2.classList.add('w-20', 'h-20', 'rounded-full', 'select-none');
    divInferior.classList.add('flex', 'flex-col');
    ultimoMensaje.classList.add('my-auto', 'text-base');
    span.classList.add('flex', 'flex-row', 'space-x-5');
    iconoLeer.classList.add('fa-brands', 'fa-readme', 'text-blue-400', 'my-auto');
    iconoEliminar.classList.add('fa-solid', 'fa-trash-can', 'justify-end', 'text-red-500', 'my-auto');

    span.appendChild(iconoLeer);
    span.appendChild(iconoEliminar);
    divInferior.appendChild(ultimoMensaje);
    divInferior.appendChild(span);
    divSuperior.appendChild(imagenUsuario1);
    divSuperior.appendChild(imagenUsuario2);
    divExterior.appendChild(divSuperior);
    divExterior.appendChild(divInferior);

    listaChats.appendChild(divExterior);
}

enviarMensajeBoton.onclick = async () => {
    const { idUser } = obtenerParametrosURL();
    const mensajeInput = mensajeUsuario.value;
    let date = new Date();

    const nuevoMensaje = {
        "id_chat": chatActual,
        "message": {
            "usuario": idUser,
            "contenido": mensajeInput,
            "hora": String(date.toLocaleDateString('es-MX') + ' - ' + date.toLocaleTimeString('es-MX'))
        }
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
    const { idSeller, idUser, origin } = obtenerParametrosURL();

    const perfil = new URL(localhost + 'perfil.html');
    perfil.searchParams.set('idseller', idSeller);
    perfil.searchParams.set('iduser', idUser);
    perfil.searchParams.set('origin', origin);

    window.location.href = perfil;
}

logoInicio.onclick = () => {
    const { idUser } = obtenerParametrosURL();

    const perfil = new URL(localhost + 'index.html');
    perfil.searchParams.set('iduser', idUser);

    window.location.href = perfil;
}

const mostrarChat = async (user1, user2) => {
    const { idUser } = obtenerParametrosURL();

    const chat = await obtenerDatos('chat/getchat/', user1 + ';' + user2);
    chatActual = chat.id_chat;

    mensajeDerecha.textContent = '';
    mensajeIzquierda.textContent = '';

    chat.message_list.forEach(mensaje => burbujasChat(mensaje, idUser));
}

const eliminarChat = (idChat) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'No es posible recuperar chats borrados',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#174e9d',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar chat'
    }).then(async (result) => {
        if (result.isConfirmed) {

            await fetch(urlAPI + `chat/${idChat}`, {
                method: "DELETE",
            });

            Swal.fire({
                icon: 'success',
                title: 'El chat ha sido borrado',
                showConfirmButton: false,
                timer: 1000
            })

            setTimeout(() => {
                location.reload();
            }, 1500);
        }
    })
}

const burbujasChat = (mensaje, idUser) => {
    const espacio = document.createElement('label');
    const div = document.createElement('div');
    const message = document.createElement('label');
    const hora = document.createElement('label');

    espacio.classList.add('bg-white', 'text-white', 'rounded-xl', 'py-2', 'px-3', 'select-none');
    div.classList.add('flex', 'flex-col', 'py-2', 'px-3', 'rounded-xl', 'space-y-2');
    message.classList.add('text-black');
    hora.classList.add('text-slate-500', 'text-xs', 'mt-2');

    espacio.textContent = '?';
    hora.textContent = mensaje.hora;

    div.appendChild(message);
    div.appendChild(hora);

    if (mensaje.usuario === idUser) {
        div.classList.add('bg-amber-200');
        message.textContent = mensaje.contenido;

        mensajeDerecha.appendChild(div);
        mensajeIzquierda.appendChild(espacio);

    } else {
        div.classList.add('bg-blue-200');
        message.textContent = mensaje.contenido;

        mensajeIzquierda.appendChild(div);
        mensajeDerecha.appendChild(espacio);
    }
}