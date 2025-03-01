// fachascript_indentado.js
// Este archivo define los comandos y sus funcionalidades para ser utilizados en VS Code

const os = require('os');
const platform = require('os');
const psutil = require('psutil'); // npm install psutil
const time = require('time'); // npm install time
const { DateTime } = require('luxon'); // npm install luxon
const fs = require('fs');
const child_process = require('child_process');

// Variables base de FachaScript
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
    sistema: os.platform(),
    ruta: process.cwd(),
    version: 'FachaScript 0.1.3 Stable', // Versión fija
    facha_lenguage: "español"
};

// Comandos de FachaScript definidos en formato de funcionalidad

function imprimir(expresion) {
    if (expresion in variables) {
        return variables[expresion];
    } else {
        return expresion;
    }
}

function crear(variable) {
    variables[variable] = null;
    return `Variable '${variable}' creada.`;
}

function asignar(variable, valor) {
    if (valor in variables) {
        variables[variable] = variables[valor];
    } else {
        variables[variable] = valor;
    }
    return `Variable '${variable}' asignada con valor '${valor}'.`;
}

function sumar(valor1, valor2) {
    const resultado = parseFloat(valor1) + parseFloat(valor2);
    return `Resultado de la suma: ${resultado}`;
}

function restar(valor1, valor2) {
    const resultado = parseFloat(valor1) - parseFloat(valor2);
    return `Resultado de la resta: ${resultado}`;
}

function multiplicar(valor1, valor2) {
    const resultado = parseFloat(valor1) * parseFloat(valor2);
    return `Resultado de la multiplicación: ${resultado}`;
}

function dividir(valor1, valor2) {
    const divisor = parseFloat(valor2);
    if (divisor !== 0) {
        const resultado = parseFloat(valor1) / divisor;
        return `Resultado de la división: ${resultado}`;
    } else {
        return "Error: División por cero.";
    }
}

function si(condicion) {
    if (condicion.toLowerCase() === "verdadero") {
        return "Condición es verdadera.";
    } else if (condicion.toLowerCase() === "falso") {
        return "Error: Condición inválida.";
    } else {
        return "Error: Condición inválida.";
    }
}

function mientras(condicion) {
    if (condicion.toLowerCase() === "verdadero") {
        return "Bucle infinito simulado.";
    } else {
        return "Error: Condición no válida.";
    }
}

function comando_variable(nombre, valor) {
    variables[nombre] = valor;
    return `Variable '${nombre}' asignada con valor '${valor}'.`;
}

function comando_funcion(nombre, codigo) {
    // **Importante:** Esto solo almacena el código como una cadena. Para ejecutar funciones, necesitarías un intérprete.
    variables[nombre] = codigo;
    return `Función '${nombre}' definida (simulación).`;
}

function comando_ruta(nombre, ruta) {
    variables[nombre] = ruta;
    return `Variable '${nombre}' asignada con ruta '${ruta}'.`;
}

function usuario() {
    return os.userInfo().username;
}

function sistema() {
    return os.platform();
}

async function memoria_libre() {
    try {
        const mem = await psutil.virtualMemory();
        return mem.available;
    } catch (error) {
        return "Error al obtener la memoria libre. Asegúrate de haber instalado psutil correctamente.";
    }
}

function cpu() {
    try {
        const cpus = os.cpus();
        return `Modelo: ${cpus[0].model}, Núcleos: ${cpus.length}`;
    } catch (error) {
        return "Error al obtener información de la CPU.";
    }
}

async function lista_procesos() {
    try {
        const processes = await psutil.processList();
        const processList = processes.map(p => ({ pid: p.pid, name: p.name }));
        return JSON.stringify(processList); // Devuelve la lista como JSON
    } catch (error) {
        return "Error al obtener la lista de procesos. Asegúrate de haber instalado psutil correctamente.";
    }
}

async function archivos(ruta) {
    try {
        const files = fs.readdirSync(ruta); // Use synchronous method to be simpler
        return JSON.stringify(files); // Devuelve la lista como JSON
    } catch (error) {
        return `Error al leer el directorio: ${error}`;
    }
}

function red_ip() {
  try {
      // Ejecuta el comando ipconfig (Windows) o ifconfig (Linux/macOS)
      let command = os.platform() === 'win32' ? 'ipconfig' : 'ifconfig';
      const result = child_process.execSync(command).toString();
      return result
  } catch (error) {
      return `Error al obtener la IP: ${error}`;
  }
}

function modo_terminal() {
    // No hay forma confiable de detectar esto directamente en VS Code.  Podrías intentar usar un setting en la extensión
    return "No se puede determinar el modo terminal/GUI.";
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
        return "Error al obtener la zona horaria.";
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
    comando_variable,
    comando_funcion, // Added comando_funcion
    comando_ruta,
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
    facha_lenguage
};