/* eslint-disable no-new */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');

/**
 * return a promise that resolves the list of staged files
 */
const getStagedFiles = () =>
  new Promise((resolve) => {
    const diffCmd = spawn('git', ['diff', '--cached', '--name-only']);
    diffCmd.stdout.on('data', (data) =>
      resolve(
        data
          .toString()
          .split(os.EOL)
          .filter((file) => !!file && fs.existsSync(file))
      )
    );
  });

/**
 * return a promise that resolves after adding the files to the staged files
 * @param {array} files Array of files to add
 */
const gitAddFiles = (files) => {
  new Promise((resolve) => {
    spawn('git', ['add', ...files], {
      stdio: 'inherit',
    }).on('close', (code) => resolve(code));
  });
};

/**
 * return a promise that resolve after running the check
 * @param {string} command The check to be executed
 * @param {function} filterFn The function to be used to filter the files
 * @param {array} files An array of files to check
 */
const check = (command) => (filterFn) => (files) =>
  new Promise((resolve) => {
    files = files.filter(filterFn);

    if (files.length === 0) {
      resolve(0);
      return;
    }

    const [cmd, ...args] = command.replace(/\s+/, ' ').split(' ');
    spawn(cmd, args.concat(files), {
      stdio: 'inherit',
    }).on('close', (code) => resolve(code));
  });

/**
 * runs a single check
 * @param {object} config The check configuration
 * @param {array} files An array of files to check
 */
const runCheck = ({ command, extensions, messages }) => async (files) => {
  const checkRunner = check(command)((file) => extensions.includes(file.split('.').slice(-1).pop()));
  console.log(`\x1b[1m\n${messages.init}\x1b[m`);
  if ((await checkRunner(files)) !== 0) {
    console.error(`\x1b[31m\n${messages.failure}\n\x1b[0m`);
    throw new Error('Check Failed');
  }
  console.log(`\x1b[32m\n${messages.success}\x1b[0m`);
};

/**
 * runs all the tests sequentially
 * @param {array} config The checks configuration
 * @param {array} files An array of files to check
 */
const runAllChecks = (config) => (files) => {
  let seq = Promise.resolve();
  config.forEach((conf) => {
    seq = seq.then(() => runCheck(conf)(files));
  });
  return seq;
};

module.exports = {
  getStagedFiles,
  gitAddFiles,
  runAllChecks,
};
