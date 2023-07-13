import { browser } from '@wdio/globals';
import { TextEditor } from 'wdio-vscode-service';

import {
  getBasenameFromPath,
  openWorkspace,
  resolveFixture,
  snapshotFile,
} from './utils';

describe('multiroot', () => {
  describe('configured', () => {
    const workspaceFile = resolveFixture(
      'workspaces/multiroot-configured.code-workspace',
    );

    snapshotFile(workspaceFile);

    it('should not be colorized', async () => {
      await openWorkspace(workspaceFile);

      const workbench = await browser.getWorkbench();

      await workbench.executeCommand('Open Workspace Configuration File');
      const textEditor = (await workbench
        .getEditorView()
        .openEditor(getBasenameFromPath(workspaceFile))) as TextEditor;
      const text = await textEditor.getText();

      expect(text.includes('"titleBar.activeBackground": "#000000"')).toBe(
        true,
      );
      expect(text.includes('"titleBar.activeForeground"')).toBe(false);
    });
  });
});
