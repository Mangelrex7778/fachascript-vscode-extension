# FachaScript 2.0

FachaScript es un lenguaje de programación desarrollado por **Pibe Emoji Studios**. Su objetivo es ofrecer una alternativa sencilla y eficiente para la creación de scripts de programación. FachaScript tiene dos variantes principales de sintaxis:

- **FachaScript (Indentado)**: Utiliza la indentación estilo Python para definir los bloques de código.
- **FachaScript (Con Llaves)**: Utiliza llaves `{}` para definir los bloques de código, similar a lenguajes como C y Java.

## Características

- **Sintaxis Simples**: FachaScript utiliza palabras clave fáciles de entender, como `imprimir`, `crear`, `sumar`, etc.
- **Comentarios**: Los comentarios se realizan utilizando `#` en la versión con indentación y `//` en la versión con llaves.
- **Control de Flujo**: Contiene estructuras de control como `si`, `mientras`, y `para`, que permiten crear programas dinámicos.
- **Ejecución de Scripts**: Los intérpretes correspondientes ejecutan los scripts escritos en FachaScript con o sin indentación, según la variante elegida.

## Novedades en FachaScript 2.0: "Operación Éxito"

Esta actualización trae consigo una serie de mejoras y nuevas funcionalidades para que FachaScript sea aún más potente y fácil de usar:

- **Flujo de Comandos Optimizado:** Sintaxis más intuitiva y comandos más directos para acceder a la información del sistema y manipular archivos.
- **Comandos Adicionales:** Se han añadido nuevos comandos para el manejo de arrays, cadenas, operaciones matemáticas y control de errores.
- **Mayor Flexibilidad:** Ahora es posible usar comandos base o de operaciones, para una mayor funcionalidad.
Ahora está adaptada para VS Code.

**Nuevos Comandos:**

-   **`lista`:** Muestra los elementos de un array.
-   **`agregar`:** Agrega un elemento a un array.
-   **`remover`:** Remueve un elemento de un array.
-   **`longitud`:** Obtiene la longitud de un array.
-   **`invertir`:** Invierte el orden de los elementos en un array.
-   **`ordenar`:** Ordena los elementos de un array.
-   **`mezclar`:** Mezcla los elementos de un array aleatoriamente.
-   **`abrir_archivo`:** Abre un archivo y muestra los primeros 100 caracteres.
-   **`leer_archivo`:** Lee el contenido completo de un archivo.
-   **`escribir_archivo`:** Escribe contenido en un archivo.
-   **`cerrar_archivo`:** Simula cerrar un archivo.
-   **`mayusculas`:** Convierte una cadena a mayúsculas.
-   **`minusculas`:** Convierte una cadena a minúsculas.
-   **`reemplazar`:** Reemplaza una subcadena en una cadena.
-   **`concatenar`:** Concatena dos cadenas.
-   **`potencia`:** Calcula la potencia de un número.
-   **`raiz`:** Calcula la raíz cuadrada de un número.
-   **`redondear`:** Redondea un número al entero más cercano.
-   **`esperar`:** Pausa la ejecución durante un número específico de milisegundos (simulación).
-   **`temporizador`:** Simula un temporizador.
-   **`intentar`:** Simula un bloque try-catch.
-   **`capturar`:** Simula la captura de un error.
-   **`lanzar_error`:** Simula el lanzamiento de un error.
-   **`json_parse`:** Convierte una cadena JSON a un objeto JavaScript.
-   **`json_stringify`:** Convierte un objeto JavaScript a una cadena JSON.
-   **`fecha_actual`:** Obtiene la fecha actual.
-   **`hora_actual`:** Obtiene la hora actual.
-   **`contar`:** Cuenta la cantidad de caracteres en un texto.
-   **`promedio`:** Calcula el promedio de una lista de números.
-   **`aleatorio`:** Genera un número aleatorio.
-   **`factorial`:** Calcula el factorial de un número.
    **`modulo`:** Calcula el valor del modulo de los numeros.
    **`comparar`:** Compara una variable con otra.

## Instalación

1.  Instala **Visual Studio Code** si no lo tienes ya.
2.  Descarga esta extensión de FachaScript desde [el repositorio oficial](#) (en caso de estar disponible).
3.  Abre Visual Studio Code y ve a la pestaña de extensiones.
4.  Busca `FachaScript` y haz clic en "Instalar".

## Uso

Para utilizar FachaScript, simplemente crea un archivo con la extensión `.fch`, `.facha`, o `.fchs` y empieza a escribir tu código. Dependiendo de la variante de sintaxis que prefieras, puedes elegir entre las siguientes:

- **Indentado (Python Style)**: Archivos con extensión `.fch` o `.facha`.
- **Con Llaves**: Archivos con extensión `.fchs`.

### Ejemplo de código (Indentado):

```facha
# Este es un comentario
variable miLista = [1, 2, 3, 4, 5]
imprimir miLista
longitud(miLista)

### Ejemplo de código (Llaves):
// Este es un comentario
variable miLista = [1, 2, 3, 4, 5];
imprimir miLista;
longitud(miLista);

### Créditos
FachaScript fue creado por Pibe Emoji Studios, un estudio conocido por su trabajo en desarrollo de software, videojuegos y más.

Copyright Pibe Emoji Studios 2025
Copyright Pibe Emoji Studios 2021-2025 (anteriormente conocido como Facha Team)
