import re

# Diccionario de variables
variables = {}

# Limpiar código (remover comentarios y líneas vacías)
def limpiar_codigo(codigo):
    codigo = re.sub(r'//.*', '', codigo)
    codigo = re.sub(r'\n\s*\n', '\n', codigo)
    return codigo.strip()

# Ejecutar línea de código
def ejecutar_linea(linea):
    if "crear" in linea:
        variable = linea.split()[1]
        variables[variable] = None
        print(f"✅ Variable '{variable}' creada.")

    elif "=" in linea:
        partes = linea.split("=")
        variable = partes[0].strip()
        valor = partes[1].strip()
        if valor in variables:
            variables[variable] = variables[valor]
        elif valor.isnumeric():
            variables[variable] = int(valor)
        elif valor.replace('.', '', 1).isdigit():
            variables[variable] = float(valor)
        else:
            variables[variable] = valor
        print(f"✅ Variable '{variable}' asignada con valor '{variables[variable]}'.")

    elif "imprimir" in linea:
        variable = linea.split()[1]
        if variable in variables:
            print(f"📢 {variables[variable]}")
        else:
            print(f"⚠️ Error: La variable '{variable}' no existe.")

    elif "sumar" in linea or "restar" in linea or "multiplicar" in linea or "dividir" in linea:
        if re.search(r'\d+\s*[\+\-\*/]\s*\d+', linea):
            num1, operador, num2 = re.split(r'([\+\-\*/])', linea.strip())
            num1, num2 = float(num1.strip()), float(num2.strip())

            if operador == "+":
                print(f"Resultado: {num1 + num2}")
            elif operador == "-":
                print(f"Resultado: {num1 - num2}")
            elif operador == "*":
                print(f"Resultado: {num1 * num2}")
            elif operador == "/" and num2 != 0:
                print(f"Resultado: {num1 / num2}")
            else:
                print("⚠️ Error: División por cero.")
        else:
            print("⚠️ Error: Operación matemática inválida.")

    elif "si" in linea:
        condicion = linea.split()[1].strip().lower()
        if condicion == "verdadero":
            print("✅ Condición es verdadera.")
        elif condicion == "falso":
            print("✅ Condición es falsa.")
        else:
            print("⚠️ Error: Condición inválida.")

    elif "mientras" in linea:
        print("⚠️ Simulación de bucle mientras. Evitando ejecución infinita.")

    else:
        print(f"⚠️ Error: Comando desconocido '{linea.strip()}'.")

# Ejecutar código desde un archivo
def ejecutar_archivo(archivo):
    try:
        with open(archivo, 'r') as f:
            codigo = limpiar_codigo(f.read())

        lineas = codigo.split('\n')
        for linea in lineas:
            if linea.strip():
                ejecutar_linea(linea)

    except FileNotFoundError:
        print("⚠️ Error: Archivo no encontrado.")

# Código principal
if __name__ == "__main__":
    archivo_fachascript = "mi_script.fchs"  # Cambia esto por el archivo a ejecutar
    ejecutar_archivo(archivo_fachascript)
