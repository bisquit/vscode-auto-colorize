import { readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

export function resolveFixture(pathFromFixture: string) {
  return resolve(__dirname, '../fixtures', pathFromFixture);
}

export function getBasenameFromPath(path: string) {
  return basename(path);
}

export function getWorkspaceNameFromPath(path: string) {
  return basename(path, '.code-workspace');
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

export async function openWorkspace(workspaceFile: string) {
  await browser.executeWorkbench((vscode, workspaceFile) => {
    vscode.commands.executeCommand(
      'vscode.openFolder',
      vscode.Uri.parse(workspaceFile),
    );
  }, workspaceFile);

  const workspaceName = getWorkspaceNameFromPath(workspaceFile);
  await browser.waitUntil(async () => {
    const title = await (await browser.getWorkbench()).getTitleBar().getTitle();
    return title.includes(workspaceName);
  });
}

export async function openFolder(folder: string) {
  await browser.executeWorkbench((vscode, folder) => {
    vscode.commands.executeCommand(
      'vscode.openFolder',
      vscode.Uri.parse(folder),
    );
  }, folder);

  const folderName = getBasenameFromPath(folder);
  await browser.waitUntil(async () => {
    const title = await (await browser.getWorkbench()).getTitleBar().getTitle();
    return title.includes(folderName);
  });
}
