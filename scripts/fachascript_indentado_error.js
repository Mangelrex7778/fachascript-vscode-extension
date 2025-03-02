// fachascript_indentado_error.js
// Linter para el lenguaje FachaScript Indentado 2.0

const vscode = require('vscode');
const fachascriptCommands = require('./fachascript_indentado.js');

/**
 * Analiza un documento de FachaScript Indentado y devuelve un array de diagnósticos (errores/advertencias).
 * @param {vscode.TextDocument} document El documento a analizar.
 * @returns {vscode.Diagnostic[]} Un array de objetos vscode.Diagnostic.
 */
function analyzeDocument(document) {
    const diagnostics = [];
    const text = document.getText();
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const lineNumber = i;  // Guarda el número de línea actual

        // Ignorar líneas vacías y comentarios
        if (!line || line.startsWith('#')) {
            continue;
        }

        // Reglas de validación
        validateLine(line, lineNumber, diagnostics, document);
    }

    return diagnostics;
}

/**
 * Valida una línea de código.
 * @param {string} line La línea de código a validar.
 * @param {number} lineNumber El número de línea.
 * @param {vscode.Diagnostic[]} diagnostics El array de diagnósticos.
 * @param {vscode.TextDocument} document El documento.
 */
function validateLine(line, lineNumber, diagnostics, document) {
    // Extraer el nombre del comando (la primera palabra)
    const parts = line.split(' ');
    const commandName = parts[0];
    const args = parts.slice(1);

    // Verificar si el comando existe
    if (!(commandName in fachascriptCommands)) {
        addDiagnostic(lineNumber, `Comando desconocido: "${commandName}"`, vscode.DiagnosticSeverity.Error, diagnostics, document, line);
        return; // No continuar la validación si el comando no existe
    }

    // Validar la cantidad y tipo de argumentos
    validateArguments(commandName, args, lineNumber, diagnostics, document, line);

    // Agregar validaciones adicionales aquí...
}

/**
 * Valida la cantidad y tipo de argumentos según el comando.
 * @param {string} commandName El nombre del comando.
 * @param {string[]} args El array de argumentos.
 * @param {number} lineNumber El número de línea.
 * @param {vscode.Diagnostic[]} diagnostics El array de diagnósticos.
 * @param {vscode.TextDocument} document El documento.
 * @param {string} line La línea de código.
 */
function validateArguments(commandName, args, lineNumber, diagnostics, document, line) {
    switch (commandName) {
        case 'sumar':
        case 'restar':
        case 'multiplicar':
        case 'dividir':
            if (args.length !== 2) {
                addDiagnostic(lineNumber, `El comando "${commandName}" requiere 2 argumentos.`, vscode.DiagnosticSeverity.Error, diagnostics, document, line);
            } else {
                if (isNaN(Number(args[0])) || isNaN(Number(args[1]))) {
                    addDiagnostic(lineNumber, `El comando "${commandName}" requiere argumentos numéricos.`, vscode.DiagnosticSeverity.Error, diagnostics, document, line);
                }
            }
            break;
        case 'variable':
        case 'Ruta':
            if (args.length !== 2) {
                addDiagnostic(lineNumber, `El comando "${commandName}" requiere 2 argumentos.`, vscode.DiagnosticSeverity.Error, diagnostics, document, line);
            }
            break;
        case 'imprimir':
        case 'crear':
        case 'asignar':
        case 'si':
        case 'mientras':
        case 'funcion':
        case 'Archivos':
        case 'Facha_ruta_script':
        case 'limpiar':
        case 'negar':
        case 'retroceder':
        case 'cerrar':
            if (args.length !== 0) {
                addDiagnostic(lineNumber, `El comando "${commandName}" no requiere argumentos.`, vscode.DiagnosticSeverity.Error, diagnostics, document, line);
            }
            break;
        default:
            // No hacer nada para comandos desconocidos (ya se detectaron antes)
            break;
    }
}

/**
 * Agrega un diagnóstico (error/advertencia) al array de diagnósticos.
 * @param {number} lineNumber El número de línea del diagnóstico.
 * @param {string} message El mensaje del diagnóstico.
 * @param {vscode.DiagnosticSeverity} severity La severidad del diagnóstico (Error, Warning, etc.).
 * @param {vscode.Diagnostic[]} diagnostics El array de diagnósticos.
 * @param {vscode.TextDocument} document El documento.
 * @param {string} line La línea de código.
 */
function addDiagnostic(lineNumber, message, severity, diagnostics, document, line) {
    const range = new vscode.Range(lineNumber, 0, lineNumber, line.length);
    const diagnostic = new vscode.Diagnostic(range, message, severity);
    diagnostic.source = 'FachaScript'; // Identificar que el diagnóstico proviene de tu linter
    diagnostics.push(diagnostic);
}

module.exports = {
    analyzeDocument
};
