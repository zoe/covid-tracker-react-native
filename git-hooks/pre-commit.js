#!/usr/bin/env node

'use strict';

const { getStagedFiles, gitAddFiles, runAllChecks } = require('./helpers');

const checks = [
  {
    command: 'npm run prettier:pre-commit',
    extensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    messages: {
      init: 'Running Prettier on staged files',
      failure: 'Your commit contains files that do not pass Prettier checks',
      success: 'All Prettier checks passed',
    },
  },
  {
    command: 'npm run lint:pre-commit',
    extensions: ['ts', 'tsx', 'js', 'jsx'],
    messages: {
      init: 'Running Lint on staged files',
      failure: 'Your commit contains files that do not pass Lint checks',
      success: 'All Lint checks passed',
    },
  },
];

(async () => {
  // get the staged files
  const files = await getStagedFiles();

  // runs the checks
  try {
    await runAllChecks(checks)(files);
  } catch (_) {
    process.exit(255);
  }

  // since both prettier and lint can potentially fix files I need to re-add
  // those files to the staging
  gitAddFiles(files);

  process.exit(0);
})();
