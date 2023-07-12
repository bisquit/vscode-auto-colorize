import { browser } from '@wdio/globals';
import { readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { TextEditor } from 'wdio-vscode-service';

import { getWorkspaceFixture, openWorkspace, storeWorkspace } from './utils';

describe('multi-root workspace', () => {
  describe('has color config', () => {
    const workspaceName = 'multi-root.configured';

    storeWorkspace(workspaceName);

    it('should not be colorized', async () => {
      await openWorkspace(workspaceName);

      const workbench = await browser.getWorkbench();

      await workbench.executeCommand('Open Workspace Configuration File');
      const textEditor = (await workbench
        .getEditorView()
        .openEditor(`${workspaceName}.code-workspace`)) as TextEditor;
      const text = await textEditor.getText();
      await expect(
        text.includes('"titleBar.activeBackground": "#000000"'),
      ).toBe(true);
      await expect(text.includes('"titleBar.activeForeground"')).toBe(false);
    });

    after(async () => {
      const workbench = await browser.getWorkbench();
      await workbench.executeCommand('Close Workspace');
    });
  });
});
