# Peticiones a la API REST Quick Shop

Para cualquiera de las peticiones se necesita la dirección IP de cualquiera de los nodos

## Usuarios

- Get user by id: `:5000/usuarios/getbyid/{idUser}`
- Get user by email: `:5000/usuarios/getbyemail/{emailUser}`
- Get user by name: `5000/usuarios/getbyname/{name}`
- Get user image: `:5000/usuarios/getimage/{idUser}`
- Delete user: `:5000/usuarios/{idUser}`
- Insert user: `:5000/usuarios`  
    `{  
        "nombre_usuario": "",  
        "contraseña_usuario": "",  
        "telefono_usuario": "",  
        "correo_usuario": "",  
        "zona_entrega_usuario": "",  
        "img_usuario": {  
            "file": ""  
        }  
    }`
- Update user: `:5000/usuarios/update`
    `{
        "id": "{idUser}",
        "campos": {
            "nombre_usuario": "",
            "contraseña_usuario": "",
            "telefono_usuario": "",
            "correo_usuario": "",
            "zona_entrega_usuario": "",
            "img_usuario": {
                "file": ""
            }
        }
    }`

## Productos

- Get product by name: `:5000/publicaciones/getbyname/{name}`
- Get product by user id: `:5000/publicaciones/getbyuserid/{idUser}`
- Get product by id: `:5000/publicaciones/getbyid/{idProduct}` 
- Get products by category: `:5000/publicaciones/getbycategory/{category}`
- Get product image: `:5000/publicaciones/getimage/{idProduct}`
- Get random products: `:5000/publicaciones/getrandom`
- Delete product: `:5000/publicaciones/{idProduct}`
- Insert product: `:5000/publicaciones`
    `{
        "nombre": "",
        "id_usuario": "{idUser}",
        "precio": 0,
        "descripcion": "",
        "categoria": "",
        "img_list": [{
            "file": ""
        }]
    }`
- Modify product: `:5000/publicaciones/update`
    `{
        "id": "{idProduct}",
        "campos": {
            "nombre": "",
            "id_usuario": "{idUser}",
            "precio": 0,
            "descripcion": "",
            "categoria": "",
            "img_list": [{
                "file": ""
            }]
        }
    }`

## Reseñas productos (nunca utilizadas)

- Get post by id: `:5000/postcomment/getbypostid/{idComment}`
- Post comment: `:5000/postcomment`
    `{
        "id_usuario": "{idUser}",
        "id_publicacion": "{idProduct}",
        "encabezado": "",
        "fecha_comentario": "",
        "puntuacion": "",
        "descripcion": ""
    }`

## Reseñas usuarios

- Get comment by user id: `:5000/usercomment/getbyuserid/{idUser}`
- Post user comment: `:5000/usercomment`
    `{
        "id_usuario": "{idUser}",
        "encabezado": "",
        "fecha_comentario": "",
        "puntuacion": "",
        "descripcion": ""
    }`

## Chat

- Get chat: `:5000/chat/getchat/{idChat}`
- Get all user chats: `:5000/chat/getalluserchats/{idUser}`
- Check chat: `:5000/chat/check/{idUser1};{idUser2}`
- Delete chat: `:5000/chat/{idChat}`
- Create chat: `:5000/chat/`
    `{
        "user1_id": "{idUser1}",
        "user2_id": "{idUser2}"
    }`
- Insert message: `:5000/chat/insert_message`
    `{
        "id_chat": "{idChat}",
        "message": {
            "usuario": "{idUser}",
            "contenido": "",
            "hora": ""
        }
    }`