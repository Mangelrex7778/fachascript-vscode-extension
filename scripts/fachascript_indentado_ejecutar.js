// fachascript_indentado_ejecutar.js
// Intérprete para el lenguaje FachaScript

const vscode = require('vscode');
const fachascriptCommands = require('./fachascript_indentado.js');

/**
 * Ejecuta el código FachaScript en el documento.
 * @param {vscode.TextDocument} document El documento que contiene el código FachaScript.
 */
async function executeDocument(document) {
    const text = document.getText();
    const lines = text.split('\n');

    // Limpiar la consola de salida
    outputWindow.clear();
    outputWindow.show(true);

    // Ejecutar cada línea como un comando
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Ignorar líneas vacías y comentarios
        if (!line || line.startsWith('#')) {
            continue;
        }

        try {
            // Analizar y ejecutar la línea
            const result = await executeLine(line);
            if (result !== undefined) {
                outputWindow.appendLine(result.toString());
            }
        } catch (error) {
            outputWindow.appendLine(`Error en la línea ${i + 1}: ${error}`);
        }
    }
}

/**
 * Ejecuta una sola línea de código FachaScript.
 * @param {string} line La línea de código a ejecutar.
 * @returns {Promise<any>} El resultado de la ejecución.
 */
async function executeLine(line) {
    // Dividir la línea en comando y argumentos
    const parts = line.split(' ');
    const commandName = parts[0];
    const args = parts.slice(1);

    // Verificar si el comando existe
    if (!(commandName in fachascriptCommands)) {
        throw new Error(`Comando desconocido: "${commandName}"`);
    }

    const commandFunction = fachascriptCommands[commandName];

    // Ejecutar el comando con los argumentos
    try {
        return await commandFunction(...args); // Spread syntax para pasar los argumentos
    } catch (error) {
        throw new Error(`Error al ejecutar el comando "${commandName}": ${error}`);
    }
}

// Crear una ventana de salida para mostrar los resultados
const outputWindow = vscode.window.createOutputChannel('FachaScript Ejecución');

module.exports = {
    executeDocument
};