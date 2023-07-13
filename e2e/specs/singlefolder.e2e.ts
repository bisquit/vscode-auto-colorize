import { browser } from '@wdio/globals';
import { TextEditor } from 'wdio-vscode-service';

import { openFolder, resolveFixture, snapshotFile } from './utils';

describe('singlefolder', () => {
  const folder = resolveFixture('folders/a');

  snapshotFile(resolveFixture('folders/a/.vscode/settings.json'));

  it('should not be colorized', async () => {
    await openFolder(folder);

    const workbench = await browser.getWorkbench();

    const inputBox = await workbench.executeCommand('Go to File');
    await inputBox.setText('settings.json');
    await inputBox.confirm();

    const textEditor = (await workbench
      .getEditorView()
      .openEditor('settings.json')) as TextEditor;
    const text = await textEditor.getText();

    expect(text.includes('{}')).toBe(true);
    expect(text.includes('"titleBar.activeBackground"')).toBe(false);
  });
});
