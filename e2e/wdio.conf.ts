import type { Options } from '@wdio/types';

import { resolve } from 'node:path';

// https://webdriver.io/docs/configurationfile/
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
      browserVersion: '1.80.0',
      'wdio:vscodeOptions': {
        // specify extension path that includes `package.json`
        extensionPath: resolve(__dirname, '..'),
      },
    },
  ],
  connectionRetryCount: 3,
  connectionRetryTimeout: 120000,
  exclude: [],
  framework: 'mocha',
  // less info to more easily see spec result
  logLevel: 'warn',
  // avoid manipulation conflict
  maxInstancesPerCapability: 1,
  mochaOpts: {
    timeout: 60000,
    ui: 'bdd',
  },
  reporters: ['spec'],
  runner: 'local',
  services: ['vscode'],
  // specify spec path
  specs: ['./specs/**/*.e2e.ts'],
  waitforTimeout: 10000,
};
