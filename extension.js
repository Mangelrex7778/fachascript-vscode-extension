const vscode = require('vscode');
const fachascriptCommands = require('./fachascript_indentado.js');
const fachascriptLinter = require('./fachascript_indentado_error.js');
const fachascriptEjecutar = require('./fachascript_indentado_ejecutar.js');

function activate(context) {
    console.log('¡La extensión FachaScript está activa!');

    // Crear una colección de diagnósticos
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('fachascript');
    context.subscriptions.push(diagnosticCollection);

    // Función para actualizar los diagnósticos
    function updateDiagnostics(document) {
        if (document && document.languageId === 'fachascript-indentado') {
            const diagnostics = fachascriptLinter.analyzeDocument(document);
            diagnosticCollection.set(document.uri, diagnostics);
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

    // Comando para ejecutar el código
    let executeCommand = vscode.commands.registerCommand('fachascript.ejecutar', () => {
        if (vscode.window.activeTextEditor) {
            const document = vscode.window.activeTextEditor.document;
            fachascriptEjecutar.executeDocument(document, vscode.window.createOutputChannel('FachaScript Ejecución'));
        } else {
            vscode.window.showInformationMessage('No hay un documento activo.');
        }
    });
    context.subscriptions.push(executeCommand);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
