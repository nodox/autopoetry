// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as childProcess from 'child_process';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let poetryAddDisposable = vscode.workspace.onDidSaveTextDocument(async (document: vscode.TextDocument) => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if (workspaceFolders && workspaceFolders.length > 0) {
            const workspaceRoot = workspaceFolders[0].uri.fsPath;
            const filePath = document.uri.fsPath;

            try {
                const missingPackages = await findMissingPackages(filePath, workspaceRoot);
                if (missingPackages.length > 0) {
                    installPackages(missingPackages, workspaceRoot, document);
                }
            } catch (error) {
                console.log("debug:missingPackages", error)
            }
        }

    });

    context.subscriptions.push(poetryAddDisposable);
}

function findMissingPackages(filePath: string, workspaceRoot: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        const command = `pylint --disable=all --enable=undefined-variable --output-format=json ${filePath}`;

        childProcess.exec(command, (error, stdout, stderr) => {
            console.log('debug:childProcess', stdout, stderr)

            if (error) {
                console.log('debug:childProcess', stdout)

                const analysisResults = JSON.parse(stdout);
                const missingPackages = analysisResults
                    .map((result: any) => {

                        const regex = /(?:Undefined variable ')([^']+)/;
                        const match = result.message.match(regex);
                        const extractedWord = match ? match[1] : null;
                        // console.log(extractedWord)

                        return extractedWord               
                    });
    
                resolve(missingPackages);
            }

            reject(`Failed to analyze Python file`);
            return;
        });
    });
}


function installPackages(packages: string[], workspaceRoot: string, document: vscode.TextDocument): void {
    const installCommand = `cd ${workspaceRoot} && poetry add ${packages.join(' ')}`;
    vscode.window.showInformationMessage(`Packages missing. Want to install with 'poetry add ${packages.join(' ')}'`, "Yes", "No")
    .then(answer => {
      if (answer === "Yes") {
        childProcess.exec(installCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Failed to install packages: ${error.message}`);
            } else {
                console.log(`Packages installed successfully: ${stdout}`);
                for (const name of packages) {
                    writeImportStatement(name, document);
                }

                vscode.window.showInformationMessage('autopoetry: Packages installed successfully.');
            }
        });

      }
    })
}


function writeImportStatement(name: string, document: vscode.TextDocument): void {
    const contentToAppend = `import ${name}\n`;

    // Create a TextEdit to modify the content
    const edit = new vscode.TextEdit(
        new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0)),
        contentToAppend
    );

    // Apply the TextEdit to the TextDocument
    const workspaceEdit = new vscode.WorkspaceEdit();
    workspaceEdit.set(document.uri, [edit]);
    vscode.workspace.applyEdit(workspaceEdit);
}

// This method is called when your extension is deactivated
export function deactivate() {}
