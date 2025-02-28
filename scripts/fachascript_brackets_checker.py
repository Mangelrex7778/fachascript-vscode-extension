import re

# Variables definidas en el código
variables = set()

# Lista de errores detectados
errores = []

# Limpiar el código (quitar comentarios y saltos innecesarios)
def limpiar_codigo(codigo):
    codigo = re.sub(r'//.*', '', codigo)  # Eliminar comentarios
    codigo = re.sub(r'\n\s*\n', '\n', codigo)  # Eliminar líneas vacías
    return codigo.strip()

# Analizar una línea de código
def analizar_linea(linea, numero_linea):
    global errores

    # Detectar errores de indentación
    if linea.startswith(" ") or linea.startswith("\t"):
        errores.append(f"Línea {numero_linea}: Error de indentación inesperada.")

    # Verificar estructura de comandos conocidos
    if "crear" in linea:
        variable = linea.split()[1]
        if variable in variables:
            errores.append(f"Línea {numero_linea}: La variable '{variable}' ya está creada.")
        else:
            variables.add(variable)

    elif "=" in linea:
        partes = linea.split("=")
        if len(partes) != 2:
            errores.append(f"Línea {numero_linea}: Error de sintaxis en asignación.")
        else:
            variable = partes[0].strip()
            if variable not in variables:
                errores.append(f"Línea {numero_linea}: La variable '{variable}' no está definida.")

    elif "imprimir" in linea:
        variable = linea.split()[1]
        if variable not in variables:
            errores.append(f"Línea {numero_linea}: La variable '{variable}' no existe.")

    elif "sumar" in linea or "restar" in linea or "multiplicar" in linea or "dividir" in linea:
        if not re.search(r'\d+\s*[\+\-\*/]\s*\d+', linea):
            errores.append(f"Línea {numero_linea}: Error de sintaxis en operación matemática.")

    elif "si" in linea or "mientras" in linea:
        condicion = linea.split()[1].strip().lower()
        if condicion not in ["verdadero", "falso"]:
            errores.append(f"Línea {numero_linea}: Condición inválida en '{linea.strip()}'.")

    else:
        errores.append(f"Línea {numero_linea}: Comando desconocido '{linea.strip()}'.")

# Función principal para detectar errores en un archivo
def detectar_errores(archivo):
    global errores, variables
    errores = []
    variables = set()

    try:
        with open(archivo, 'r') as f:
            codigo = limpiar_codigo(f.read())

        lineas = codigo.split('\n')
        for i, linea in enumerate(lineas, start=1):
            if linea.strip():
                analizar_linea(linea, i)

        if errores:
            print("\n🔴 Errores detectados en el código:")
            for error in errores:
                print("❌", error)
        else:
            print("\n✅ No se encontraron errores.")

    except FileNotFoundError:
        print("⚠️ Error: El archivo no existe.")

# Ejecutar si se ejecuta directamente
if __name__ == "__main__":
    archivo_fachascript = "mi_script.fchs"  # Cambia esto por el archivo a analizar
    detectar_errores(archivo_fachascript)
