import * as vscode from 'vscode';
import { getColorHexFromString } from '../utils/get-color';
import { hasColorConfig } from '../utils/has-color-config';

type Option = {
  force?: boolean;
};

export async function colorize({ force = false }: Option = {}) {
  const workspace = vscode.workspace;

  if (!workspace.name) {
    console.log('extension ignored, as this is not a workspace.');
    return;
  }

  if ((await hasColorConfig(workspace)) && !force) {
    console.log(
      'extension ignored, because workspace already has color configuration.'
    );
    return;
  }

  const color = getColorHexFromString(workspace.name);

  workspace.getConfiguration().update(
    'workbench.colorCustomizations',
    {
      'titleBar.activeBackground': color,
      'titleBar.inactiveBackground': color,
    },
    false
  );
}
