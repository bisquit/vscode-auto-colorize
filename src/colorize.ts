import * as vscode from 'vscode';

import { getColorHexFromString, getReadableForeground } from './utils/color';
import { hasColorConfig, isMultiRootWorkspace } from './utils/workspace';

type Option = {
  /**
   * Overwrite even if workspace already has a color configuration.
   */
  overwriteConfig?: boolean;
};

export async function colorize({
  overwriteConfig: overwriteExistingConfig = false,
}: Option = {}) {
  const workspace = vscode.workspace;

  if (!isMultiRootWorkspace(workspace)) {
    console.log('extension ignored, as this is not a multi-root workspace.');
    return;
  }

  if ((await hasColorConfig(workspace)) && !overwriteExistingConfig) {
    console.log(
      'extension ignored, because workspace already has a color configuration.'
    );
    return;
  }

  const bgColor = getColorHexFromString(workspace.name ?? '');
  const fgColor = getReadableForeground(bgColor);

  workspace.getConfiguration().update(
    'workbench.colorCustomizations',
    {
      'titleBar.activeBackground': bgColor,
      'titleBar.activeForeground': fgColor,
      'titleBar.inactiveBackground': bgColor,
      'titleBar.inactiveForeground': fgColor,
    },
    false
  );

  vscode.window.showInformationMessage(`Automatically colorized to ${bgColor}`);
}
