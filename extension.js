const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Función para ejecutar FachaScript Indentado
function ejecutarFachaScriptIndentado() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const codigo = editor.document.getText();
        const archivo = editor.document.fileName;

        exec(`python3 ./scripts/fachascript_indentado_ejecutor.py "${archivo}"`, (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(`Error al ejecutar FachaScript: ${stderr}`);
            } else {
                vscode.window.showInformationMessage(`Resultado: ${stdout}`);
            }
        });
    }
}

// Función para ejecutar FachaScript Brackets
function ejecutarFachaScriptBrackets() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const codigo = editor.document.getText();
        const archivo = editor.document.fileName;

        exec(`python3 ./scripts/fachascript_brackets_runner.py "${archivo}"`, (err, stdout, stderr) => {
            if (err) {
                vscode.window.showErrorMessage(`Error al ejecutar FachaScript Brackets: ${stderr}`);
            } else {
                vscode.window.showInformationMessage(`Resultado: ${stdout}`);
            }
        });
    }
}

// Registrar los comandos
function activar(context) {
    let ejecutarIndentado = vscode.commands.registerCommand('fachascript.runIndentado', () => {
        ejecutarFachaScriptIndentado();
    });

    let ejecutarBrackets = vscode.commands.registerCommand('fachascript.runBrackets', () => {
        ejecutarFachaScriptBrackets();
    });

    context.subscriptions.push(ejecutarIndentado);
    context.subscriptions.push(ejecutarBrackets);
}

exports.activate = activar;

function desactivar() {}

exports.deactivate = desactivar;
