import * as vscode from 'vscode';
import { getColorHexFromString } from '../utils/get-color';

export async function hasColorConfig(
  workspace: typeof vscode.workspace
): Promise<boolean> {
  const { workspaceValue } =
    workspace.getConfiguration().inspect('workbench.colorCustomizations') ?? {};
  return !!workspaceValue;
}
