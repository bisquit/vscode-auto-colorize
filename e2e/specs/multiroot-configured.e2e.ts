import { browser } from '@wdio/globals';
import { readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { TextEditor } from 'wdio-vscode-service';

import {
  getWorkspaceFixture,
  openWorkspace,
  resolveFixture,
  snapshotFile,
} from './utils';

describe('multiroot', () => {
  describe('configured', () => {
    const workspaceName = 'multiroot-configured';

    snapshotFile(
      resolveFixture('workspaces/multiroot-configured.code-workspace'),
    );

    it('should not be colorized', async () => {
      await openWorkspace(workspaceName);

      const workbench = await browser.getWorkbench();

      await workbench.executeCommand('Open Workspace Configuration File');
      const textEditor = (await workbench
        .getEditorView()
        .openEditor(`${workspaceName}.code-workspace`)) as TextEditor;
      const text = await textEditor.getText();
      expect(text.includes('"titleBar.activeBackground": "#000000"')).toBe(
        true,
      );
      expect(text.includes('"titleBar.activeForeground"')).toBe(false);
    });
  });
});
