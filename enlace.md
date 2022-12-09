# Enlace con el backend de Azure

1. Prender el Nodo1 (nodo1, Qwerty_123456)
2. Usar ThunderClient para probar la api
3. Para iniciar la api:  
    `sudo systemctl stop quickshop`  
    `sudo systemctl start mongod`  
    `cd quickshop`  
    `source quickshopenv/bin/activate`  
    `gunicorn --bind 0.0.0.0:5000 wsgi:app`

## comandos importantes
- matar un proceso: `kill -kill pid_proceso`