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