import sys
import re

# Comandos válidos en FachaScript 0.1
COMANDOS_VALIDOS = [
    "imprimir", "crear", "asignar", "sumar", "restar", "multiplicar",
    "dividir", "si", "mientras"
]

# Función para analizar errores en un archivo FachaScript
def analizar_errores(archivo):
    errores = []
    variables_definidas = set()
    indentacion_anterior = 0

    try:
        with open(archivo, "r", encoding="utf-8") as f:
            lineas = f.readlines()

        for numero_linea, linea in enumerate(lineas, start=1):
            linea = linea.rstrip()
            if not linea or linea.startswith("#"):  # Saltar líneas vacías y comentarios
                continue

            # Detectar errores de indentación
            indentacion_actual = len(linea) - len(linea.lstrip())
            if indentacion_actual % 4 != 0:
                errores.append(f"Línea {numero_linea}: Indentación incorrecta. Usa múltiplos de 4 espacios.")

            # Separar comando y argumentos
            partes = linea.strip().split(" ", 1)
            comando = partes[0]

            if comando not in COMANDOS_VALIDOS:
                errores.append(f"Línea {numero_linea}: Comando desconocido '{comando}'.")

            if comando == "crear":
                if len(partes) < 2:
                    errores.append(f"Línea {numero_linea}: Falta el nombre de la variable después de 'crear'.")
                else:
                    variables_definidas.add(partes[1].strip())

            if comando == "asignar":
                if len(partes) < 2 or "=" not in partes[1]:
                    errores.append(f"Línea {numero_linea}: Asignación incorrecta, usa 'asignar variable = valor'.")
                else:
                    variable = partes[1].split("=")[0].strip()
                    if variable not in variables_definidas:
                        errores.append(f"Línea {numero_linea}: La variable '{variable}' no fue definida antes de asignarle un valor.")

            if comando in ["sumar", "restar", "multiplicar", "dividir"]:
                if len(partes) < 2 or not re.match(r'^\s*\d+\s*[\+\-\*/]\s*\d+\s*$', partes[1]):
                    errores.append(f"Línea {numero_linea}: Formato incorrecto para operación matemática en '{comando}'.")

        if errores:
            print("Errores encontrados:")
            for error in errores:
                print(error)
        else:
            print("No se encontraron errores.")

    except FileNotFoundError:
        print(f"Error: El archivo '{archivo}' no existe.")
    except Exception as e:
        print(f"Error inesperado: {e}")

# Ejecutar el analizador si el script es llamado desde la terminal
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python fachascript_indentado_error.py <archivo.fch>")
    else:
        analizar_errores(sys.argv[1])
