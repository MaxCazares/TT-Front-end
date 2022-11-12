# Enlace con el backend de Azure

1. Prender el Nodo1 (nodo1, Qwerty_123456)
2. Usar ThunderClient para probar la api
3. Para iniciar la api:  
    `cd quickshop    
    source quickshopenv/bin/activate  
    gunicorn --bind 0.0.0.0:5000 wsgi:app`  
4. En caso que no funciona:
    `sudo systemctl stop quickshop
    sudo systemctl start mongod`

db: quickshop
user: user


{ "_id" : ObjectId("63634e029065e99eeea1d302"), "id_usuario" : "001ad8b59688bcc5a93ba11a5c4f2bd577bf852897b72660580623040a651d6e997aaca520aa9e7808c599edd070df188bd1d7e9a0d236b2ca92a45fdde41615", "nombre_usuario" : "Reginaldo Ramirez", "contraseña_usuario" : "22222222", "telefono_usuario" : "22232313421", "correo_usuario" : "perro_maldito@jsj.com", "zona_entrega_usuario" : "iztapalapa" }
{ "_id" : ObjectId("63634e139065e99eeea1d303"), "id_usuario" : "85ca32442a1ef9ac79821cf0eb089139e1e7e8e3796fb5d97504c839c65e9332fe77bce74a5b59cbd17c079fedd42cd7d7fc27658d886bc96814c077d0f63662", "nombre_usuario" : "Juan", "contraseña_usuario" : "1111", "telefono_usuario" : "2223334455", "correo_usuario" : "dasds@jsj.com", "zona_entrega_usuario" : "chalco" }
