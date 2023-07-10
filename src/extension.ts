import * as vscode from 'vscode';

import { colorize } from './colorize';

export async function activate(context: vscode.ExtensionContext) {
  await colorize();

  context.subscriptions.push(
    vscode.commands.registerCommand('auto-colorize.recolor', async () => {
      await colorize({ overwriteConfig: true });
    })
  );
}
