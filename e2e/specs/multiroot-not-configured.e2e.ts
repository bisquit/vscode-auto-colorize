import { browser } from '@wdio/globals';
import { TextEditor } from 'wdio-vscode-service';

import {
  getBasenameFromPath,
  openWorkspace,
  resolveFixture,
  snapshotFile,
} from './utils';

describe('multi-root', () => {
  describe('not configured', () => {
    const workspaceFile = resolveFixture(
      'workspaces/multiroot-not-configured.code-workspace',
    );

    snapshotFile(workspaceFile);

    it('should be colorized', async () => {
      await openWorkspace(workspaceFile);

      const workbench = await browser.getWorkbench();

      await workbench.executeCommand('Open Workspace Configuration File');
      const textEditor = (await workbench
        .getEditorView()
        .openEditor(getBasenameFromPath(workspaceFile))) as TextEditor;
      const text = await textEditor.getText();

      expect(text.includes('"titleBar.activeBackground"')).toBe(true);
      expect(text.includes('"titleBar.activeForeground"')).toBe(true);
    });
  });
});
