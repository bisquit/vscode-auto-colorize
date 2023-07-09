import * as vscode from 'vscode';
import { colorize } from './usecases/colorize';

export async function activate(context: vscode.ExtensionContext) {
  await colorize();

  const disposable = vscode.commands.registerCommand(
    'auto-colorize.recolor',
    async () => {
      await colorize({ force: true });
    }
  );

  context.subscriptions.push(disposable);
}
