import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

type WorkspaceName = 'multi-root.configured' | 'multi-root.not.configured';

export function getWorkspaceFixture(workspaceName: WorkspaceName) {
  return resolve(
    __dirname,
    `../fixtures/workspaces/${workspaceName}.code-workspace`,
  );
}

export function storeWorkspace(workspaceName: WorkspaceName) {
  let originalContent: string;

  before(async () => {
    // store original content
    const content = await readFile(getWorkspaceFixture(workspaceName), {
      encoding: 'utf-8',
    });
    originalContent = content;
  });

  after(async () => {
    // reset content
    if (originalContent) {
      await writeFile(getWorkspaceFixture(workspaceName), originalContent);
    }
  });
}

export async function openWorkspace(workspaceName: WorkspaceName) {
  const workspaceFile = getWorkspaceFixture(workspaceName);

  await browser.executeWorkbench((vscode, workspaceFile) => {
    vscode.commands.executeCommand(
      'vscode.openFolder',
      vscode.Uri.parse(workspaceFile),
    );
  }, workspaceFile);

  await browser.waitUntil(async () => {
    const title = await (await browser.getWorkbench()).getTitleBar().getTitle();
    return title.includes(workspaceName);
  });
}
