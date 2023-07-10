import * as vscode from 'vscode';

const WorkspaceTypes = {
  MultiRoot: 'MultiRoot',
  SingleFolder: 'SingleFolder',
  Unknown: 'Unknown',
} as const;

export function isMultiRootWorkspace(workspace: typeof vscode.workspace) {
  return detectWorkspaceType(workspace) === WorkspaceTypes.MultiRoot;
}

export async function hasColorConfig(
  workspace: typeof vscode.workspace
): Promise<boolean> {
  const { workspaceValue } =
    workspace.getConfiguration().inspect('workbench.colorCustomizations') ?? {};
  return !!workspaceValue;
}

function detectWorkspaceType(workspace: typeof vscode.workspace) {
  /**
   * NOTE:
   * `workspace.workspaceFile` is defined only if multi-root workspace.
   * If workspace doesn't have `.vscode-workspace`, path is random hash and schema is `untitled`.
   *
   * `workspace.workspaceFolders` is defined both multi-root
   * and single folder, and returns included folders.
   * So if you open .vscode-workspace, but there is no folder inside it, `workspace.workspaceFolders` is `[]`.
   */

  if (workspace.workspaceFile) {
    return WorkspaceTypes.MultiRoot;
  }

  if (workspace.workspaceFolders?.length) {
    return WorkspaceTypes.SingleFolder;
  }

  return WorkspaceTypes.Unknown;
}
