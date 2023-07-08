import * as vscode from 'vscode';
import { getColorHexFromString } from '../utils/get-color';

export async function colorize(workspace: typeof vscode.workspace) {
  if (!workspace.name) {
    return;
  }

  const color = getColorHexFromString(workspace.name);

  workspace.getConfiguration().update(
    'workbench.colorCustomizations',
    {
      'titleBar.activeBackground': color,
      // 'titleBar.activeForeground': '#e7e7e7',
      // 'titleBar.inactiveBackground': '#dd053199',
      // 'titleBar.inactiveForeground': '#e7e7e799',
    },
    false
  );
}
