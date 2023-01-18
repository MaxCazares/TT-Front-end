// export const urlAPI = 'http://20.150.141.5:5000/';
export const urlAPI = 'http://20.25.130.71:5000/';
export const localhost = 'http://127.0.0.1:5500/src/html/'
// let urlAPI;

const ipsNodos = ['http://20.150.141.5:5000/', 'http://20.125.145.70:5000/', 'http://20.25.130.71:5000/'];

// window.onload = async () => {
//     urlAPI = await comprobarConexion();
//     console.log(urlAPI);
//     const deportes = await obtenerDatos('publicaciones/getbycategory/', 'deportes', true);
//     console.log(deportes);
// }

// const comprobarConexion = async () => {
//     try {
//         let res1 = await fetch(ipsNodos[0]);
//         if(res1.status === 200)
//             return ipsNodos[0];
//     } catch (error) {
//         console.error(error);
//         try {
//             let res2 = await fetch(ipsNodos[1]);
//             if(res2.status === 200)
//                 return ipsNodos[1];
//         } catch (error) {
//             console.error(error);
//             try {
//                 let res3 = await fetch(ipsNodos[2]);
//                 if(res3.status === 200)
//                     return ipsNodos[2];
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     }
// }

// const obtenerDatos = async (urlConsulta, datoConsulta, multiple = false) => {
//     try {
//         const respuesta = await fetch(urlAPI + urlConsulta + datoConsulta);
//         const datosJSON = await respuesta.json();
//         const datos = multiple ? datosJSON.response : datosJSON.response[0];
//         return datos;
//     } catch (error) {
//         console.error(error);
//     }
// }