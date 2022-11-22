export const alertSuccess = message => {
    Swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2000,
    });
}

export const alertFail = message => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        showConfirmButton: false,
        timer: 1500,
    });
}

export const infoPassword = () => {
    Swal.fire({
        icon: 'info',
        title: 'La contraseña debe de...',
        text: '...contener un dígito, una letra, un número y una longitud de 6 caracteres',
        showConfirmButton: false,
        timer: 2500,
    });
}