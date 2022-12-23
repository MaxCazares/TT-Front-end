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
        timer: 2000,
    });
}

export const infoPassword = () => {
    Swal.fire({
        icon: 'info',
        title: 'La contraseña debe',
        text: 'de incluir un dígito, una letra, un simbolo especial y una longitud de 6 caracteres',
        showConfirmButton: false,
        timer: 2500,
    });
}