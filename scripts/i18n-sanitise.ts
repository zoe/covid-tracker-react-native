const childProcess = require('child_process');
const cleanDeep = require('clean-deep');
const deepDiff = require('deep-diff');
// @ts-expect-error
const fs = require('fs');
// @ts-expect-error
const path = require('path');

childProcess.execSync("yarn i18next 'src/**/*.{ts,tsx}'");

const foundTranslations = require('../.locales/translations.json');

fs.rmdirSync(path.join(__dirname, '../.locales'), { recursive: true });

const ignorePatterns = [
  '__IGNORE__',
  'covid-test-modal.screen-',
  'covid-test.antibody-modal',
  'covid-test.mechanism-modal',
  'dashboard.you-have-reported-x-times',
  'diabetes.hemoglobin-measurement-unit-',
  'diet-study.card-',
  'disease-cards',
  'long-covid.q',
  'mental-health-playback.insights',
  'mental-health-playback.segments',
  'reconsent.request-consent.use-',
];

const cleanOptions = {
  emptyStrings: false,
};

function sanitiseTranslations(translationPath: string, isDefaultLocale = false) {
  const savedTranslations = JSON.parse(fs.readFileSync(path.join(__dirname, translationPath)));

  const diffs = deepDiff
    .diff(savedTranslations, foundTranslations)
    .filter((diff: any) => diff.kind === 'N' || diff.kind === 'D')
    .map((diff: any) => ({
      ...diff,
      fullPath: diff.path.join('.'),
    }))
    .filter((diff: any) => {
      const pattern = ignorePatterns.find((pattern) => diff.fullPath.startsWith(pattern));
      return !pattern;
    });

  const newDiffs: any[] = [];
  const deletedDiffs: any[] = [];

  for (const diff of diffs) {
    if (diff.kind === 'N') {
      newDiffs.push(diff);
    } else if (diff.kind === 'D') {
      deletedDiffs.push(diff);
    }
  }

  for (const diff of deletedDiffs) {
    let obj = savedTranslations;
    for (let i = 0; i < diff.path.length; i += 1) {
      if (i === diff.path.length - 1) {
        delete obj[diff.path[i]];
        break;
      }
      obj = obj[diff.path[i]];
    }
  }

  fs.writeFileSync(
    path.join(__dirname, translationPath),
    JSON.stringify(cleanDeep(savedTranslations, cleanOptions), undefined, 2),
  );

  console.log(`Successfully sanitised the translation file: ${translationPath}\n`);
  console.log(`${deletedDiffs.length} unused translation${deletedDiffs.length === 1 ? '' : 's'} deleted\n`);
  if (isDefaultLocale && newDiffs.length > 0) {
    console.log(`${newDiffs.length} translation${newDiffs.length === 1 ? '' : 's'} missing:\n`);
    console.log(newDiffs);
    console.log('');
  }
  console.log('');
}

sanitiseTranslations('../assets/lang/en-US.json');
sanitiseTranslations('../assets/lang/sv-SE.json');
sanitiseTranslations('../assets/lang/en.json', true);
