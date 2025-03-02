const vscode = require('vscode');
const fachascriptCommandsIndentado = require('./scripts/fachascript_indentado.js');
const fachascriptCommandsBrackets = require('./scripts/fachascript_brackets.js');
const fachascriptLinterIndentado = require('./scripts/fachascript_indentado_error.js');
const fachascriptLinterBrackets = require('./scripts/fachascript_brackets_error.js');
const fachascriptEjecutarIndentado = require('./scripts/fachascript_indentado_ejecutar.js');
const fachascriptEjecutarBrackets = require('./scripts/fachascript_brackets_ejecutar.js');

function activate(context) {
    console.log('¡La extensión FachaScript está activa!');

    // Crear una colección de diagnósticos
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('fachascript');
    context.subscriptions.push(diagnosticCollection);

    // Función para actualizar los diagnósticos
    function updateDiagnostics(document) {
        if (document) {
            if (document.languageId === 'fachascript-indentado') {
                const diagnostics = fachascriptLinterIndentado.analyzeDocument(document);
                diagnosticCollection.set(document.uri, diagnostics);
            } else if (document.languageId === 'fachascript-brackets') {
                const diagnostics = fachascriptLinterBrackets.analyzeDocument(document);
                diagnosticCollection.set(document.uri, diagnostics);
            }
        }
    }

    // Suscribirse a los eventos de cambio y guardado del documento
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event => updateDiagnostics(event.document))
    );
    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument(document => updateDiagnostics(document))
    );
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(document => updateDiagnostics(document))
    );

    // Diagnosticar el documento activo al activar la extensión
    if (vscode.window.activeTextEditor) {
        updateDiagnostics(vscode.window.activeTextEditor.document);
    }

    // Comando para ejecutar FachaScript Indentado
    let ejecutarIndentadoCommand = vscode.commands.registerCommand('fachascript.ejecutarIndentado', () => {
        if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId === 'fachascript-indentado') {
            const document = vscode.window.activeTextEditor.document;
            const outputChannel = vscode.window.createOutputChannel('FachaScript Indentado Ejecución');
            fachascriptEjecutarIndentado.executeDocument(document, outputChannel);
        } else {
            vscode.window.showInformationMessage('No hay un documento activo o no es FachaScript Indentado.');
        }
    });
    context.subscriptions.push(ejecutarIndentadoCommand);

    // Comando para ejecutar FachaScript Brackets
    let ejecutarBracketsCommand = vscode.commands.registerCommand('fachascript.ejecutarBrackets', () => {
        if (vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.languageId === 'fachascript-brackets') {
            const document = vscode.window.activeTextEditor.document;
            const outputChannel = vscode.window.createOutputChannel('FachaScript Brackets Ejecución');
            fachascriptEjecutarBrackets.executeDocument(document, outputChannel);
        } else {
            vscode.window.showInformationMessage('No hay un documento activo o no es FachaScript Brackets.');
        }
    });
    context.subscriptions.push(ejecutarBracketsCommand);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
