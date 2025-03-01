const vscode = require('vscode');
const path = require('path');
const exec = require('child_process').exec;

// Función para ejecutar un archivo .exe en el sistema
function runExecutable(executablePath, args = []) {
    return new Promise((resolve, reject) => {
        exec(`"${executablePath}" ${args.join(' ')}`, (error, stdout, stderr) => {
            if (error) {
                reject(`Error executing ${executablePath}: ${stderr || error.message}`);
            } else {
                resolve(stdout);
            }
        });
    });
}

// Comando para ejecutar FachaScript Normal
async function runFachaScriptNormal() {
    const executablePath = path.join(__dirname, 'scripts', 'fachascript_indentado_ejecutor.exe');
    try {
        const result = await runExecutable(executablePath);
        vscode.window.showInformationMessage('FachaScript Normal ejecutado exitosamente!');
        console.log(result);
    } catch (error) {
        vscode.window.showErrorMessage('Error al ejecutar FachaScript Normal: ' + error);
    }
}

// Comando para detectar errores en FachaScript Normal
async function checkFachaScriptNormalErrors() {
    const executablePath = path.join(__dirname, 'scripts', 'fachascript_indentado_error.exe');
    try {
        const result = await runExecutable(executablePath);
        vscode.window.showInformationMessage('Errores de FachaScript Normal detectados!');
        console.log(result);
    } catch (error) {
        vscode.window.showErrorMessage('Error al verificar errores de FachaScript Normal: ' + error);
    }
}

// Comando para ejecutar FachaScript Brackets
async function runFachaScriptBrackets() {
    const executablePath = path.join(__dirname, 'scripts', 'fachascript_brackets_runner.exe');
    try {
        const result = await runExecutable(executablePath);
        vscode.window.showInformationMessage('FachaScript Brackets ejecutado exitosamente!');
        console.log(result);
    } catch (error) {
        vscode.window.showErrorMessage('Error al ejecutar FachaScript Brackets: ' + error);
    }
}

// Comando para detectar errores en FachaScript Brackets
async function checkFachaScriptBracketsErrors() {
    const executablePath = path.join(__dirname, 'scripts', 'fachascript_brackets_checker.exe');
    try {
        const result = await runExecutable(executablePath);
        vscode.window.showInformationMessage('Errores de FachaScript Brackets detectados!');
        console.log(result);
    } catch (error) {
        vscode.window.showErrorMessage('Error al verificar errores de FachaScript Brackets: ' + error);
    }
}

// Activar la extensión
function activate(context) {
    // Comandos para ejecutar FachaScript Normal
    let runFachaScriptNormalCommand = vscode.commands.registerCommand('fachascript.runFachaScriptNormal', runFachaScriptNormal);
    let checkFachaScriptNormalErrorsCommand = vscode.commands.registerCommand('fachascript.checkFachaScriptNormalErrors', checkFachaScriptNormalErrors);

    // Comandos para ejecutar FachaScript Brackets
    let runFachaScriptBracketsCommand = vscode.commands.registerCommand('fachascript.runFachaScriptBrackets', runFachaScriptBrackets);
    let checkFachaScriptBracketsErrorsCommand = vscode.commands.registerCommand('fachascript.checkFachaScriptBracketsErrors', checkFachaScriptBracketsErrors);

    context.subscriptions.push(runFachaScriptNormalCommand, checkFachaScriptNormalErrorsCommand, runFachaScriptBracketsCommand, checkFachaScriptBracketsErrorsCommand);
}

// Desactivar la extensión
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
