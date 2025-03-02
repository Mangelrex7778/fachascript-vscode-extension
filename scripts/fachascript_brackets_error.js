// fachascript_brackets_error.js
// Linter para el lenguaje FachaScript Brackets

const vscode = require('vscode');
const fachascriptCommands = require('./fachascript_brackets.js');

/**
 * Analiza un documento de FachaScript Brackets y devuelve un array de diagnósticos (errores/advertencias).
 * @param {vscode.TextDocument} document El documento a analizar.
 * @returns {vscode.Diagnostic[]} Un array de objetos vscode.Diagnostic.
 */
function analyzeDocument(document) {
    const diagnostics = [];
    const text = document.getText();
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Ignorar líneas vacías y comentarios
        if (!line || line.startsWith('//')) {
            continue;
        }

        // Reglas de validación
        validateCommandSyntax(line, i, diagnostics, document);
    }

    return diagnostics;
}

/**
 * Valida la sintaxis de un comando en una línea.
 * @param {string} line La línea de código a validar.
 * @param {number} lineNumber El número de línea.
 * @param {vscode.Diagnostic[]} diagnostics El array de diagnósticos.
 * @param {vscode.TextDocument} document El documento.
 */
function validateCommandSyntax(line, lineNumber, diagnostics, document) {
    // Verificar si la línea termina con un punto y coma
    if (!line.endsWith(';')) {
        addDiagnostic(lineNumber, "Se espera un punto y coma al final de la declaración.", vscode.DiagnosticSeverity.Error, diagnostics, document, line);
    }

    // Extraer el nombre del comando (la primera palabra)
    const commandName = line.split(' ')[0];

    // Verificar si el comando existe
    if (!(commandName in fachascriptCommands)) {
        addDiagnostic(lineNumber, `Comando desconocido: "${commandName}"`, vscode.DiagnosticSeverity.Error, diagnostics, document, line);
        return; // No continuar la validación si el comando no existe
    }

    // Validar la cantidad de argumentos según el comando (ejemplo)
    if (['sumar', 'restar', 'multiplicar', 'dividir'].includes(commandName)) {
        const args = line.split(' ').slice(1);
        if (args.length !== 2) {
            addDiagnostic(lineNumber, `El comando "${commandName}" requiere 2 argumentos.`, vscode.DiagnosticSeverity.Error, diagnostics, document, line);
        } else {
          if (isNaN(Number(args[0])) || isNaN(Number(args[1]))){
            addDiagnostic(lineNumber, `El comando "${commandName}" requiere argumentos númericos.`, vscode.DiagnosticSeverity.Error, diagnostics, document, line);
          }
        }
    } else if (['variable', 'Ruta'].includes(commandName)) {
        const args = line.split(' ').slice(1);
        if (args.length !== 2) {
            addDiagnostic(lineNumber, `El comando "${commandName}" requiere 2 argumentos.`, vscode.DiagnosticSeverity.Error, diagnostics, document, line);
        }
    } else if (['imprimir', 'crear', 'asignar', 'si', 'mientras', 'funcion', 'Archivos', 'Facha_ruta_script', 'limpiar', 'negar', 'retroceder', 'cerrar'].includes(commandName)) {
        const args = line.split(' ').slice(1);
        if (args.length !== 0) {
            addDiagnostic(lineNumber, `El comando "${commandName}" no requiere argumentos.`, vscode.DiagnosticSeverity.Error, diagnostics, document, line);
        }
    }

    // Agrega más validaciones para otros comandos aquí...
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
    diagnostic.source = 'FachaScript Brackets'; // Identificar que el diagnóstico proviene de tu linter
    diagnostics.push(diagnostic);
}

module.exports = {
    analyzeDocument
};
