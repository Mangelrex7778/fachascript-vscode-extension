import re

# Diccionario de variables definidas
variables = {}

# Función para ejecutar FachaScript
def ejecutar_fachascript(codigo):
    # Limpiamos el código de comentarios y saltos innecesarios
    codigo = limpiar_codigo(codigo)

    # Dividir el código en líneas
    lineas = codigo.split('\n')

    # Ejecutar cada línea
    for linea in lineas:
        if linea.strip():  # Ignorar líneas vacías
            ejecutar_linea(linea)

# Limpiar el código (quitar comentarios y saltos innecesarios)
def limpiar_codigo(codigo):
    # Eliminar comentarios (todo lo que sigue después de //)
    codigo = re.sub(r'//.*', '', codigo)
    
    # Eliminar líneas vacías
    codigo = re.sub(r'\n\s*\n', '\n', codigo)

    return codigo

# Ejecutar una línea de código
def ejecutar_linea(linea):
    # Detectar declaraciones de variables y asignación
    if "crear" in linea:
        crear_variable(linea)
    elif "=" in linea:
        asignar_variable(linea)
    elif "imprimir" in linea:
        imprimir_variable(linea)
    elif "si" in linea:
        ejecutar_condicional(linea)
    elif "mientras" in linea:
        ejecutar_bucle_while(linea)
    elif "sumar" in linea:
        operar(linea, "+")
    elif "restar" in linea:
        operar(linea, "-")
    elif "multiplicar" in linea:
        operar(linea, "*")
    elif "dividir" in linea:
        operar(linea, "/")
    else:
        print(f"Error: Comando no reconocido: {linea}")

# Crear variable
def crear_variable(linea):
    variable = linea.split()[1]
    if variable not in variables:
        variables[variable] = None
        print(f"Variable {variable} creada.")

# Asignar valor a variable
def asignar_variable(linea):
    partes = linea.split("=")
    variable = partes[0].strip()
    valor = partes[1].strip()

    # Si es un número, asignar como número, sino como string
    if valor.isnumeric():
        variables[variable] = int(valor)
    elif valor.replace('.', '', 1).isdigit():
        variables[variable] = float(valor)
    elif valor in variables:
        variables[variable] = variables[valor]
    else:
        variables[variable] = valor
    
    print(f"Variable {variable} asignada a {valor}")

# Imprimir valor de una variable
def imprimir_variable(linea):
    variable = linea.split()[1]
    if variable in variables:
        print(variables[variable])
    else:
        print(f"Error: La variable {variable} no existe.")

# Ejecutar condicional
def ejecutar_condicional(linea):
    # Simular un condicional simple como 'si verdadero' o 'si falso'
    condicion = linea.split()[1].strip().lower()
    if condicion == "verdadero":
        print("Condición es verdadera")
    elif condicion == "falso":
        print("Condición es falsa")
    else:
        print("Error: Condición inválida")

# Ejecutar bucle while
def ejecutar_bucle_while(linea):
    condicion = linea.split()[1].strip().lower()
    if condicion == "verdadero":
        while True:
            print("Bucle infinito.")
            break  # Para evitar un bucle infinito en este ejemplo
    else:
        print("Error: Condición de 'mientras' no válida.")

# Operaciones matemáticas
def operar(linea, operador):
    partes = linea.split(operador)
    if len(partes) == 2:
        num1 = float(partes[0].strip())
        num2 = float(partes[1].strip())
        if operador == "+":
            print(f"Resultado de la suma: {num1 + num2}")
        elif operador == "-":
            print(f"Resultado de la resta: {num1 - num2}")
        elif operador == "*":
            print(f"Resultado de la multiplicación: {num1 * num2}")
        elif operador == "/":
            if num2 != 0:
                print(f"Resultado de la división: {num1 / num2}")
            else:
                print("Error: División por cero.")
    else:
        print("Error: Operación incorrecta.")

# Código de ejemplo para probar el intérprete
codigo_fachascript = """
// Este es un comentario
crear mi_variable;
asignar mi_variable = 10;
imprimir mi_variable;
sumar 5 + 3;
restar 10 - 4;
multiplicar 2 * 3;
dividir 9 / 3;
si verdadero;
mientras verdadero;
"""

# Ejecutar el código de FachaScript
ejecutar_fachascript(codigo_fachascript)
