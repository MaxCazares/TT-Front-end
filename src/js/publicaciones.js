const tituloPublicacion = document.querySelector('#tituloPublicacion');
const descripcionPublicacion = document.querySelector('#descripcionPublicacion');
const precioPublicacion = document.querySelector('#precioPublicacion');

const crearPublicacion = document.querySelector('#crearPublicacion');
const volverPerfil = document.querySelector('#volverPerfil');

const imprimirValores = () => {
    tituloPublicacion.value = 'Guitarra electrica';
    descripcionPublicacion.value = 'Guitarra electrica nueva cero uso'
    precioPublicacion.value = '3500'
}

crearPublicacion.onclick = () => {
    console.log('crear publicacion');
}

volverPerfil.onclick = () => {
    window.location.href = 'perfil.html'
}

imprimirValores()