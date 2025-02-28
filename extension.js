const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');

function activate(context) {
    console.log('FachaScript extension is now active.');

    let disposable = vscode.commands.registerCommand('fachascript.run', function () {
        // Lógica para ejecutar el intérprete
        vscode.window.showInformationMessage('Ejecutando FachaScript...');

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const script = editor.document.getText();
            const fileName = editor.document.fileName;
            const fileExtension = path.extname(fileName);

            let interpreter = '';
            if (fileExtension === '.fch' || fileExtension === '.facha') {
                interpreter = 'python3 scripts/fachascript_indentado.py';
            } else if (fileExtension === '.fchs') {
                interpreter = 'python3 scripts/fachascript_brackets.py';
            }

            exec(`${interpreter} "${fileName}"`, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage(`Error: ${stderr}`);
                } else {
                    vscode.window.showInformationMessage(`Salida: ${stdout}`);
                }
            });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
