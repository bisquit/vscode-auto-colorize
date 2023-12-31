import * as vscode from 'vscode';

type WorkspaceLike = Partial<typeof vscode.workspace>;

const WorkspaceTypes = {
  MultiRoot: 'MultiRoot',
  SingleFolder: 'SingleFolder',
  Unknown: 'Unknown',
} as const;

export function isMultiRootWorkspace(workspace: WorkspaceLike) {
  return detectWorkspaceType(workspace) === WorkspaceTypes.MultiRoot;
}

export async function hasColorConfig(
  workspace: WorkspaceLike,
): Promise<boolean> {
  const { workspaceValue } =
    workspace.getConfiguration?.().inspect('workbench.colorCustomizations') ??
    {};
  return !!workspaceValue;
}

function detectWorkspaceType(workspace: WorkspaceLike) {
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
