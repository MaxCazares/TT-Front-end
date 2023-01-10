## Enlace con el backend de Azure
1. Prender el Nodo 1, 2 o 3 (nodo#, Qwerty_123456)
2. Para iniciar la api:  
    `sudo systemctl start mongod`  
    `cd quickshop`  
    `source quickshopenv/bin/activate`  
    `gunicorn --bind 0.0.0.0:5000 wsgi:app`
3. Usar ThunderClient para probar la api

## Comandos importantes
- Ver los procesos: `top`
- Matar un proceso: `kill -kill pid_proceso`

## Crear un servidor local con Python3
- `python3 -m http.server 5500`