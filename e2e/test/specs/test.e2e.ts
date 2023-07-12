import { browser } from '@wdio/globals';
import { readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { TextEditor } from 'wdio-vscode-service';

describe('VS Code Extension Testing', () => {
  let originalContent: string;

  before(async () => {
    // store original content
    const content = await readFile(
      resolve(__dirname, '../../fixtures/workspaces/multi-root.code-workspace'),
      { encoding: 'utf-8' },
    );
    originalContent = content;
  });

  it('should be colorized', async () => {
    const workspaceFile = resolve(
      __dirname,
      '../../fixtures/workspaces/multi-root.code-workspace',
    );
    await browser.executeWorkbench((vscode, workspaceFile) => {
      vscode.commands.executeCommand(
        'vscode.openFolder',
        vscode.Uri.parse(workspaceFile),
      );
    }, workspaceFile);

    const workbench = await browser.getWorkbench();

    // open workspace configuration file
    await workbench.executeCommand('Open Workspace Configuration File');
    const textEditor = (await workbench
      .getEditorView()
      .openEditor('multi-root.code-workspace')) as TextEditor;
    const text = await textEditor.getText();
    expect(text.includes('titleBar.activeBackground')).toBe(true);
  });

  after(async () => {
    // reset content
    if (originalContent) {
      await writeFile(
        resolve(
          __dirname,
          '../../fixtures/workspaces/multi-root.code-workspace',
        ),
        originalContent,
      );
    }
  });
});
