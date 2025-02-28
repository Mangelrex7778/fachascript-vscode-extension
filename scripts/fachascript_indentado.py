# fachascript_indentado.py
import sys
import os
import platform
import psutil
import time
from datetime import datetime

# Variables Base de FachaScript
variables = {
    'verdadero': True,
    'falso': False,
    'nulo': None,
    'cero': 0,
    'uno': 1,
    'pi': 3.1415926535,
    'e': 2.7182818284,
    'vacio': "",
    'usuario': os.getlogin(),
    'sistema': platform.system(),
    'ruta': os.getcwd(),
    'memoria_libre': psutil.virtual_memory().available,
    'cpu': platform.processor(),
    'procesos': [p.info for p in psutil.process_iter(['pid', 'name'])],
    'version': '0.1',
    'archivos': os.listdir(),
    'red_ip': None,  # Aquí debería estar el código para obtener la IP (dependiendo de la librería o plataforma)
    'modo_terminal': sys.stdout.isatty(),
    'contador': 0,
    'indice': 0,
    'limite': None,
    'iteracion_actual': 0,
    'estado_bucle': False,
    'entrada': '',
    'salida': '',
    'error': '',
    'resultado': None,
    'hoy': datetime.today().strftime('%Y-%m-%d'),
    'ahora': datetime.today().strftime('%H:%M:%S'),
    'zona_horaria': time.tzname[0],
    'tiempo_inicio': time.time(),
    'tiempo_ejecucion': 0,
    'facha_version': '0.1',
    'facha_sistema': platform.system(),
    'facha_errores': [],
    'facha_ruta_script': '',
    'facha_lenguaje': 'español',
    'facha_config': 'config.json',  # Puede ser un archivo JSON para configuración.
}

# Función para ejecutar el código de FachaScript
def ejecutar_fachascript(codigo):
    try:
        # Limpiamos posibles saltos de línea extra o comentarios
        codigo = codigo.strip()

        # Comandos básicos de FachaScript versión 0.1
        if codigo.startswith('imprimir'):
            # Comando 'imprimir' para mostrar salida en consola
            expresion = codigo[len('imprimir '):].strip()
            if expresion in variables:
                print(variables[expresion])
            else:
                print(expresion)
        
        elif codigo.startswith('crear'):
            # Comando 'crear' para crear variables
            variable = codigo[len('crear '):].strip()
            variables[variable] = None  # Crea una variable con valor None
            print(f"Variable '{variable}' creada.")
        
        elif codigo.startswith('asignar'):
            # Comando 'asignar' para asignar valor a una variable
            partes = codigo[len('asignar '):].split('=')
            if len(partes) == 2:
                variable = partes[0].strip()
                valor = partes[1].strip()
                if valor in variables:
                    variables[variable] = variables[valor]
                else:
                    variables[variable] = valor
                print(f"Variable '{variable}' asignada con valor '{valor}'.")
            else:
                print("Error: Asignación incorrecta.")
        
        elif codigo.startswith('sumar'):
            # Comando 'sumar' para hacer una suma
            partes = codigo[len('sumar '):].split('+')
            if len(partes) == 2:
                resultado = float(partes[0].strip()) + float(partes[1].strip())
                print(f"Resultado de la suma: {resultado}")
            else:
                print("Error: Operación de suma incorrecta.")
        
        elif codigo.startswith('restar'):
            # Comando 'restar' para hacer una resta
            partes = codigo[len('restar '):].split('-')
            if len(partes) == 2:
                resultado = float(partes[0].strip()) - float(partes[1].strip())
                print(f"Resultado de la resta: {resultado}")
            else:
                print("Error: Operación de resta incorrecta.")
        
        elif codigo.startswith('multiplicar'):
            # Comando 'multiplicar' para hacer una multiplicación
            partes = codigo[len('multiplicar '):].split('*')
            if len(partes) == 2:
                resultado = float(partes[0].strip()) * float(partes[1].strip())
                print(f"Resultado de la multiplicación: {resultado}")
            else:
                print("Error: Operación de multiplicación incorrecta.")
        
        elif codigo.startswith('dividir'):
            # Comando 'dividir' para hacer una división
            partes = codigo[len('dividir '):].split('/')
            if len(partes) == 2:
                divisor = float(partes[1].strip())
                if divisor != 0:
                    resultado = float(partes[0].strip()) / divisor
                    print(f"Resultado de la división: {resultado}")
                else:
                    print("Error: División por cero.")
            else:
                print("Error: Operación de división incorrecta.")
        
        elif codigo.startswith('si'):
            # Comando 'si' para hacer un condicional
            condicion = codigo[len('si '):].strip()
            if condicion.lower() == "verdadero":
                print("Condición es verdadera.")
            elif condicion.lower() == "falso":
                print("Condición es falsa.")
            else:
                print("Error: Condición inválida.")
        
        elif codigo.startswith('mientras'):
            # Comando 'mientras' para hacer un bucle while
            condicion = codigo[len('mientras '):].strip()
            if condicion.lower() == "verdadero":
                while True:
                    print("Bucle infinito.")
                    break  # Evitamos un bucle infinito para propósitos demostrativos.
            else:
                print("Error: Condición de 'mientras' no válida.")
        
        else:
            print(f"Error: Comando '{codigo}' no reconocido.")
    except Exception as e:
        print(f"Error al ejecutar el código: {e}")

# Función principal para leer y ejecutar el código desde un archivo
def ejecutar_archivo(archivo):
    try:
        with open(archivo, 'r') as f:
            codigo = f.read()
        # Ejecutar el código de FachaScript
        ejecutar_fachascript(codigo)
    except Exception as e:
        print(f"Error al leer el archivo: {e}")

# Código de ejecución
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Por favor, ingresa el nombre del archivo a ejecutar.")
    else:
        archivo = sys.argv[1]
        ejecutar_archivo(archivo)

