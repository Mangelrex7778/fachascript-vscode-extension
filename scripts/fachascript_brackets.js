// fachascript_brackets.js
// Este archivo define los comandos y sus funcionalidades para ser utilizados en VS Code (FachaScript Brackets)

const os = require('os');
const platform = require('os');
const { DateTime } = require('luxon');
const fs = require('fs');
const child_process = require('child_process');

// Variables base de FachaScript Brackets
const variables = {
    verdadero: true,
    falso: false,
    nulo: null,
    cero: 0,
    uno: 1,
    pi: 3.1415926535,
    e: 2.7182818284,
    vacio: "",
    usuario: os.userInfo().username,
    sistema: platform.system(),
    ruta: process.cwd(),
    version: 'FachaScript Brackets 2.0', // Versión fija
    facha_lenguage: "español"
};

// Comandos de FachaScript Brackets definidos en formato de funcionalidad

function imprimir(expresion) {
    if (expresion in variables) {
        return variables[expresion];
    } else {
        return expresion;
    }
}

function crear(variable) {
    variables[variable] = null;
    return `Variable '${variable}' creada;`;
}

function asignar(variable, valor) {
     if (valor in variables) {
        return `Error: No se puede asignar una variable a otra en la línea actual, solo valores escalares como texto, números, etcétera.;`;
    } else {
        variables[variable] = valor;
        return `Variable '${variable}' asignada con valor '${valor}';`;
    }
}

function sumar(valor1, valor2) {
    const resultado = parseFloat(valor1) + parseFloat(valor2);
    return `Resultado de la suma: ${resultado};`;
}

function restar(valor1, valor2) {
    const resultado = parseFloat(valor1) - parseFloat(valor2);
    return `Resultado de la resta: ${resultado};`;
}

function multiplicar(valor1, valor2) {
    const resultado = parseFloat(valor1) * parseFloat(valor2);
    return `Resultado de la multiplicación: ${resultado};`;
}

function dividir(valor1, valor2) {
    const divisor = parseFloat(valor2);
    if (divisor !== 0) {
        const resultado = parseFloat(valor1) / divisor;
        return `Resultado de la división: ${resultado};`;
    } else {
        return "Error: División por cero;";
    }
}

function si(condicion) {
    if (condicion.toLowerCase() === "verdadero") {
        return "Condición es verdadera;";
    } else if (condicion.toLowerCase() === "falso") {
        return "Condición es falsa;";
    } else {
        return "Error: Condición inválida;";
    }
}

function mientras(condicion) {
    if (condicion.toLowerCase() === "verdadero") {
        return "Bucle infinito simulado;";
    } else {
        return "Error: Condición no válida;";
    }
}

function variable(nombre, valor) {
    variables[nombre] = valor;
    return `Variable '${nombre}' asignada con valor '${valor}';`;
}

function funcion(nombre, codigo) {
    // **Importante:** Esto solo almacena el código de la función como una cadena.
    variables[nombre] = codigo;
    return `Función '${nombre}' definida (simulación);`;
}

function Ruta(nombre) {
    if (nombre in variables) {
        return variables[nombre];
    } else {
        return `Error: La ruta de la variable '${nombre}' no está definida;`;
    }
}

function usuario() {
    return os.userInfo().username;
}

function sistema() {
    return os.platform();
}

async function memoria_libre() {
    try {
        const command = `powershell -command "(Get-WmiObject Win32_OperatingSystem).FreePhysicalMemory"`;
        const result = child_process.execSync(command).toString();
        // Clean the string.
        const cleanedResult = result.trim();
         //Convert the result to int so JS know what it is.
        const memValue = parseInt(cleanedResult, 10);
        return `Memoria libre: ${memValue} bytes`;
    } catch (error) {
        return "Error al obtener la memoria libre en Windows;";
    }
}

function cpu() {
    try {
        const command = `wmic cpu get Name, NumberOfCores /Format:List`;
        const result = child_process.execSync(command).toString();
        // Split the result into lines, and process them so we can actually print something.
        const lines = result.trim().split('\r\n');
        let cpuName = '';
        let numCores = '';

        for (const line of lines) {
            if (line.startsWith('Name=')) {
                cpuName = line.substring('Name='.length).trim();
            } else if (line.startsWith('NumberOfCores=')) {
                numCores = line.substring('NumberOfCores='.length).trim();
            }
        }

        return `Modelo: ${cpuName}, Núcleos: ${numCores};`;
    } catch (error) {
        return "Error al obtener información de la CPU;";
    }
}

async function lista_procesos() {
    try {
        const command = `tasklist /fo csv /nh`;
        const result = child_process.execSync(command).toString();
        //Split this list into proper JSON notation
        const processList = result.trim().split('\r\n').map(line => {
            const parts = line.split('","');
            return {
                name: parts[0].replace('"', ''),
                pid: parts[1].replace('"', ''),
                memUsage: parts[4].replace('"', '') // Get mem usage
            };
        });
        return JSON.stringify(processList);
    } catch (error) {
        return "Error al obtener la lista de procesos;";
    }
}

async function archivos(ruta) {
    try {
        const files = fs.readdirSync(ruta);
        return JSON.stringify(files); // Devuelve la lista como JSON
    } catch (error) {
        return `Error al leer el directorio: ${error};`;
    }
}

function red_ip() {
    try {
        // Ejecuta el comando ipconfig (Windows)
        let command = 'ipconfig';
        const result = child_process.execSync(command).toString();
        return result
    } catch (error) {
        return `Error al obtener la IP: ${error};`;
    }
}

function modo_terminal() {
    // No hay forma confiable de detectar esto directamente en VS Code.  Podrías intentar usar un setting en la extensión
    return "No se puede determinar el modo terminal/GUI;";
}

function hoy() {
    return DateTime.now().toFormat('yyyy-MM-dd');
}

function ahora() {
    return DateTime.now().toFormat('HH:mm:ss');
}

function zona_horaria() {
    try {
        return DateTime.now().toFormat('ZZ');
    } catch (error) {
        return "Error al obtener la zona horaria;";
    }
}

function facha_sistema() {
    return os.platform();
}

function facha_ruta_script(ruta) {
    if (variables[ruta]) {
        return variables[ruta];
    } else {
        return ruta;
    }
}

function facha_lenguage() {
    return variables.facha_lenguage;
}

function limpiar() {
    // No hay una forma cross-platform de limpiar la consola desde JavaScript en VS Code.
    // La mejor opción es mostrar un mensaje al usuario indicando cómo limpiar la consola manualmente.
    return "Para limpiar la consola, usa el comando 'Terminal: Clear' en VS Code (Ctrl+Shift+P);";
}

function negar(variable) {
    if (variables.hasOwnProperty(variable)) {
        variables[variable] = !variables[variable]; // Invierte el valor booleano
        return `Variable '${variable}' negada. Nuevo valor: ${variables[variable]};`;
    } else {
        return `Error: Variable '${variable}' no existe;`;
    }
}

function retroceder(valor) {
    // **Simulación:** En un intérprete real, esto detendría la ejecución de la función actual y devolvería un valor.
    return `Retrocediendo con valor: ${valor} (simulación);`;
}

function cerrar() {
    // **Simulación:** En un lenguaje real, esto detendría la ejecución del programa.
    return "Cerrando ejecución (simulación);";
}

//Nuevos comandos de la version 2.0

function lista(variable) {
 if (variables.hasOwnProperty(variable)) {
        if(Array.isArray(variables[variable])) {
            return JSON.stringify(variables[variable]);
        } else {
            return `Error: Variable '${variable}' no es un array;`
        }
    } else {
        return `Error: Variable '${variable}' no existe;`;
    }
}

function agregar(variable, valor) {
 if (variables.hasOwnProperty(variable)) {
        if(Array.isArray(variables[variable])) {
            variables[variable].push(valor);
            return `Valor '${valor}' agregado a la variable '${variable}';`;
        } else {
            return `Error: La variable '${variable}' no es un array;`;
        }
    } else {
        return `Error: La variable '${variable}' no existe;`;
    }
}

function remover(variable, index) {
   try {
        if (variables.hasOwnProperty(variable)) {
          if(Array.isArray(variables[variable])){
              variables[variable].splice(index, 1);
              return `Indice '${index}' removido a la variable '${variable}';`;
          } else {
              return `Error: La variable '${variable}' no es un array;`;
          }
        } else {
            return `Error: La variable '${variable}' no existe;`;
        }
    }catch(err) {
      return `Error al intentar remover  el elemento: ${err.message}`;
    }
}

function longitud(variable) {
     if (variables.hasOwnProperty(variable)) {
        if(Array.isArray(variables[variable])) {
              return variables[variable].length;
        } else {
            return `Error: La variable '${variable}' no es un array;`;
        }
    } else {
        return `Error: La variable '${variable}' no existe;`;
    }
}

function invertir(variable) {
      if (variables.hasOwnProperty(variable)) {
        if(Array.isArray(variables[variable])) {
            variables[variable].reverse();
            return `La lista '${variable}' se ha invertido con exito`;
        } else {
            return `Error: La variable '${variable}' no es un array;`;
        }
    } else {
        return `Error: La variable '${variable}' no existe;`;
    }
}

function ordenar(variable) {
    if (variables.hasOwnProperty(variable)) {
        if(Array.isArray(variables[variable])) {
           variables[variable].sort()
            return `La lista '${variable}' se ha ordenado con exito`;
        } else {
            return `Error: La variable '${variable}' no es un array;`;
        }
    } else {
        return `Error: La variable '${variable}' no existe;`;
    }
}

function mezclar(variable) {
      if (variables.hasOwnProperty(variable)) {
         if(Array.isArray(variables[variable])) {
           variables[variable].sort(() => Math.random() - 0.5);
           return `La lista '${variable}' se ha mezclado con exito`;
         } else {
           return `Error: La variable '${variable}' no es un array;`;
        }
    } else {
        return `Error: La variable '${variable}' no existe;`;
    }
}

function abrir_archivo(ruta) {
      try {
            const contenido = fs.readFileSync(ruta, 'utf-8');
            return `Archivo '${ruta}' abierto correctamente. Contenido: ${contenido.substring(0, 100)}...`; // Muestra los primeros 100 caracteres
        } catch (error) {
            return `Error al abrir el archivo: ${error.message};`;
        }
}

function leer_archivo(ruta) {
        try {
            const contenido = fs.readFileSync(ruta, 'utf-8');
            return contenido;
        } catch (error) {
            return `Error al leer el archivo: ${error.message};`;
        }
    }

function escribir_archivo(ruta, contenido) {
      try {
            fs.writeFileSync(ruta, contenido);
            return `Archivo '${ruta}' escrito correctamente;`;
        } catch (error) {
            return `Error al escribir el archivo: ${error.message};`;
        }
}

function cerrar_archivo(ruta) {
    return `Archivo '${ruta}' cerrado (simulación);`;  // No se puede cerrar realmente un archivo con fs.readFileSync/writeFileSync
}

function mayusculas(texto) {
        return texto.toUpperCase();
}

function minusculas(texto) {
return texto.toLowerCase();
}

function reemplazar(texto, busqueda, reemplazo) {
return texto.replace(busqueda, reemplazo);
}

function concatenar(texto1, texto2) {
        return texto1 + texto2;
}

function potencia(base, exponente) {
        return Math.pow(base, exponente);
}

function raiz(numero) {
        return Math.sqrt(numero);
}

function redondear(numero) {
return Math.round(numero);
}

async function esperar(milisegundos) {
  await new Promise(resolve => setTimeout(resolve, milisegundos));
   return `Espera de ${milisegundos} milisegundos completada.`;
}

function temporizador() {
    const start = Date.now();
    return {
        iniciar: () => {
            start = Date.now();
            return "Temporizador iniciado;";
        },
        obtener_tiempo: () => {
            const elapsed = Date.now() - start;
            return `Tiempo transcurrido: ${elapsed} ms`;
        }
}
}

function intentar(codigo) {
   try {
            // En un lenguaje real, aquí se ejecutaría el código.
            return `Intento exitoso (simulación): ${codigo}`;
        } catch (error) {
            return `Error en el intento: ${error.message}`;
        }
}

function capturar(error) {
        // En un lenguaje real, aquí se capturaría el error.
        return `Error capturado (simulación): ${error}`;
}

function lanzar_error(mensaje) {
        // Esto no lanzará un error real en VS Code, solo mostrará un mensaje.
        return `Error lanzado: ${mensaje}`;
}

function json_parse(jsonString) {
        try {
            const obj = JSON.parse(jsonString);
            return JSON.stringify(obj, null, 2);  // Formatear JSON para que sea legible
        } catch (error) {
            return `Error al analizar JSON: ${error.message}`;
        }
}

function json_stringify(obj) {
        try {
            return JSON.stringify(obj, null, 2);  // Formatear JSON para que sea legible
        } catch (error) {
            return `Error al convertir objeto a JSON: ${error.message}`;
        }
}

function fecha_actual() {
return DateTime.now().toFormat('yyyy-MM-dd');
}

function hora_actual() {
return DateTime.now().toFormat('HH:mm:ss');
}

function contar(texto) {
    return texto.length;
}

function promedio(numeros) {
  if (!Array.isArray(numeros)) {
            return "Error: Se requiere un array de números.";
        }
        if (numeros.length === 0) {
            return "Error: El array está vacío.";
        }
        const suma = numeros.reduce((a, b) => a + b, 0);
        return suma / numeros.length;
}

function aleatorio(min, max) {
    const minVal = Math.ceil(min);
        const maxVal = Math.floor(max);
    return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
}

function factorial(n) {
     if (n === 0) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
}

function modulo(a, b) {
        return a % b;
}

function comparar(a, b) {
    if (a < b) {
        return `${a} es menor que ${b}`;
    } else if (a > b) {
        return `${a} es mayor que ${b}`;
    } else {
        return `${a} es igual a ${b}`;
    }
}
//Make it usable in typescript
module.exports = {
    imprimir,
    crear,
    asignar,
    sumar,
    restar,
    multiplicar,
    dividir,
    si,
    mientras,
    variable,
    funcion,
    Ruta,
    usuario,
    sistema,
    memoria_libre,
    cpu,
    lista_procesos,
    archivos,
    red_ip,
    modo_terminal,
    hoy,
    ahora,
    zona_horaria,
    facha_sistema,
    facha_ruta_script,
    facha_lenguage,
    limpiar,
    negar,
    retroceder,
    cerrar,
    lista,
    agregar,
    remover,
    longitud,
    invertir,
    ordenar,
    mezclar,
    abrir_archivo,
    leer_archivo,
    escribir_archivo,
    cerrar_archivo,
    mayusculas,
    minusculas,
    reemplazar,
    concatenar,
    potencia,
    raiz,
    redondear,
    esperar,
    temporizador,
    intentar,
    capturar,
    lanzar_error,
    json_parse,
    json_stringify,
    fecha_actual,
    hora_actual,
    contar,
    promedio,
    aleatorio,
    factorial,
    modulo,
    comparar
};
