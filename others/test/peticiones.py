# 'http://20.150.141.5:5000/',
# 'http://20.125.145.70:5000/',
# 'http://20.25.130.71:5000/

import sys
import time
import requests

url = sys.argv[1]

inicio = time.time()

for i in range(1000):
    res = requests.get(f'http://{url}:5000/publicaciones/getrandom')
    # print(f'{i + 1} - {res.text}')

fin = time.time()
print(f'Tiempo total de ejecución: {fin - inicio}')