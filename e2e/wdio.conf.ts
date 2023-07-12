import type { Options } from '@wdio/types';

import { resolve } from 'node:path';

export const config: Options.Testrunner = {
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
    },
  },
  bail: 0,
  baseUrl: '',
  capabilities: [
    {
      browserName: 'vscode',
      browserVersion: 'stable',
      'wdio:vscodeOptions': {
        extensionPath: resolve(__dirname, '..'),
        userSettings: {
          'editor.fontSize': 14,
        },
      },
    },
  ],
  connectionRetryCount: 3,
  connectionRetryTimeout: 120000,
  exclude: [],
  framework: 'mocha',
  logLevel: 'info',
  maxInstances: 10,
  mochaOpts: {
    timeout: 60000,
    ui: 'bdd',
  },
  reporters: ['spec'],
  runner: 'local',
  services: ['vscode'],
  specs: ['./specs/**/*.ts'],
  waitforTimeout: 10000,
};
