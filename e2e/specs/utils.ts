import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

type WorkspaceName = 'multiroot-configured' | 'multiroot-not-configured';

export function resolveFixture(pathFromFixture: string) {
  return resolve(__dirname, '../fixtures', pathFromFixture);
}

export function getWorkspaceFixture(workspaceName: WorkspaceName) {
  return resolve(
    __dirname,
    `../fixtures/workspaces/${workspaceName}.code-workspace`,
  );
}

export function getFolderFixture(folderName: string) {
  return resolve(__dirname, `../fixtures/folders/${folderName}`);
}

export function snapshotFile(filePath: string) {
  let originalContent: string;

  before(async () => {
    // store original content
    const content = await readFile(filePath, {
      encoding: 'utf-8',
    });
    originalContent = content;
  });

  after(async () => {
    // reset content
    if (originalContent) {
      await writeFile(filePath, originalContent);
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

export async function openFolder(folderName: string) {
  const folder = getFolderFixture(folderName);

  await browser.executeWorkbench((vscode, folder) => {
    vscode.commands.executeCommand(
      'vscode.openFolder',
      vscode.Uri.parse(folder),
    );
  }, folder);

  await browser.waitUntil(async () => {
    const title = await (await browser.getWorkbench()).getTitleBar().getTitle();
    return title.includes(folderName);
  });
}
