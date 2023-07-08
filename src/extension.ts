import * as vscode from 'vscode';
import { colorize } from './usecases/colorize';

export function activate(context: vscode.ExtensionContext) {
  console.log(vscode.workspace.name);
  if (!vscode.workspace.name) {
    console.log('extension ignored, as this is not a workspace.');
    return;
  }

  colorize(vscode.workspace);

  const disposable = vscode.commands.registerCommand(
    'auto-colorize.recolor',
    async () => {
      // todo
    }
  );

  context.subscriptions.push(disposable);
}
