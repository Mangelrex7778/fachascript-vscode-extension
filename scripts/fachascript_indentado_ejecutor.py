import sys

# Variables Base de FachaScript
variables = {}

def ejecutar_fachascript(codigo):
    lineas = codigo.split("\n")

    for numero_linea, linea in enumerate(lineas, start=1):
        linea = linea.strip()
        if not linea or linea.startswith("#"):  # Ignorar líneas vacías y comentarios
            continue

        partes = linea.split(" ", 1)
        comando = partes[0]

        if comando == "imprimir":
            expresion = partes[1] if len(partes) > 1 else ""
            print(variables.get(expresion, expresion))

        elif comando == "crear":
            if len(partes) < 2:
                print(f"Error en línea {numero_linea}: Falta el nombre de la variable.")
            else:
                variables[partes[1]] = None

        elif comando == "asignar":
            if len(partes) < 2 or "=" not in partes[1]:
                print(f"Error en línea {numero_linea}: Formato incorrecto para asignación.")
            else:
                variable, valor = map(str.strip, partes[1].split("="))
                variables[variable] = valor

        elif comando in ["sumar", "restar", "multiplicar", "dividir"]:
            if len(partes) < 2 or not any(op in partes[1] for op in "+-*/"):
                print(f"Error en línea {numero_linea}: Formato incorrecto para operación matemática.")
            else:
                try:
                    resultado = eval(partes[1], {}, variables)
                    print(f"Resultado: {resultado}")
                except Exception as e:
                    print(f"Error en línea {numero_linea}: {e}")

        else:
            print(f"Error en línea {numero_linea}: Comando desconocido '{comando}'.")

# Función principal para ejecutar un archivo FachaScript
def ejecutar_archivo(archivo):
    try:
        with open(archivo, "r", encoding="utf-8") as f:
            codigo = f.read()
        ejecutar_fachascript(codigo)
    except FileNotFoundError:
        print(f"Error: El archivo '{archivo}' no existe.")
    except Exception as e:
        print(f"Error inesperado: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python fachascript_indentado_ejecutor.py <archivo.fch>")
    else:
        ejecutar_archivo(sys.argv[1])
