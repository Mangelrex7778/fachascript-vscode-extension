// fachascript_brackets_ejecutar.js
// Intérprete para el lenguaje FachaScript Brackets (JavaScript)

const vscode = require('vscode');
const fachascriptCommands = require('./fachascript_brackets.js');

/**
 * Ejecuta el código FachaScript Brackets en el documento.
 * @param {vscode.TextDocument} document El documento que contiene el código FachaScript Brackets.
 * @param {vscode.OutputChannel} outputWindow La ventana de salida para mostrar los resultados.
 */
async function executeDocument(document, outputWindow) {
    const text = document.getText();
    const lines = text.split('\n');

    outputWindow.clear();
    outputWindow.show(true);

    let variablesLocales = {}; // Variables locales para la ejecución

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line || line.startsWith('//')) {
            continue;
        }

        try {
            if (!line.endsWith(';')) {
                throw new Error("Se espera un punto y coma al final de la declaración.");
            }

            const result = await executeLine(line, variablesLocales, outputWindow);
            if (result !== undefined) {
                outputWindow.appendLine(result.toString());
            }
        } catch (error) {
            outputWindow.appendLine(`Error en la línea ${i + 1}: ${error}`);
        }
    }
}

/**
 * Ejecuta una sola línea de código FachaScript Brackets.
 * @param {string} line La línea de código a ejecutar.
 * @param {object} variablesLocales Un objeto para almacenar las variables locales.
 * @param {vscode.OutputChannel} outputWindow La ventana de salida para mostrar los resultados.
 * @returns {Promise<any>} El resultado de la ejecución.
 */
async function executeLine(line, variablesLocales, outputWindow) {
    const parts = line.split(' ');
    const commandName = parts[0];
    const args = parts.slice(1);

    if (!(commandName in fachascriptCommands)) {
        throw new Error(`Comando desconocido: "${commandName}"`);
    }

    const commandFunction = fachascriptCommands[commandName];

    // Manejar los argumentos según el comando
    let result;
    try {
        switch (commandName) {
            case 'imprimir':
            case 'crear':
            case 'asignar':
            case 'si':
            case 'mientras':
            case 'funcion':
            case 'Archivos':
            case 'Facha_ruta_script':
                result = await commandFunction(args[0]);
                break;
            case 'sumar':
            case 'restar':
            case 'multiplicar':
            case 'dividir':
            case 'variable':
            case 'Ruta':
                result = await commandFunction(args[0], args[1]);
                break;
            default:
                result = await commandFunction();
                break;
        }

        return result;

    } catch (error) {
        throw new Error(`Error al ejecutar el comando "${commandName}": ${error}`);
    }
}

module.exports = {
    executeDocument
};