const formularioBusqueda = document.querySelector('#formularioBusqueda');

window.onload = () => {
    formularioBusqueda.addEventListener('submit', prueba);
}

function prueba(e){
    e.preventDefault();

    const busqueda = document.querySelector('#search').value;

    if(busqueda === ''){
        alert('busqueda vacia');
        return;
    }

    alert(busqueda);
}