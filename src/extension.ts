import * as vscode from 'vscode';

import { colorize } from './colorize';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('auto-colorize.recolor', async () => {
      vscode.window.showInformationMessage('Recolorize');
      await colorize({ overwriteConfig: true });
    }),
  );

  colorize();
}
