const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');

function runInterpreter(filePath, interpreter) {
    const command = `python3 ${path.join(__dirname, 'scripts', interpreter)} ${filePath}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            vscode.window.showErrorMessage(`Error: ${stderr}`);
            return;
        }
        vscode.window.showInformationMessage(`Resultado: ${stdout}`);
    });
}

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.runFachaScript', (uri) => {
        const filePath = uri.fsPath;
        let interpreter = '';

        if (filePath.endsWith('.fch') || filePath.endsWith('.facha')) {
            interpreter = 'fachascript_indentado.py';
        } else if (filePath.endsWith('.fchs')) {
            interpreter = 'fachascript_brackets.py';
        } else {
            vscode.window.showErrorMessage('Formato de archivo no soportado');
            return;
        }

        runInterpreter(filePath, interpreter);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
