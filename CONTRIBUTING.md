# Contributing

We're glad that you want to help! Here are a few guidelines to help you get started. This document is very early stage so please reach out to us before starting anything significant.

## Out of scope PRs

Before digging into what would be good contributions, let's discuss what would be systematically rejected:

- External contributors can not ask new questions about people's health, symptoms or anything related to PII (name, phone, etc.). Questions asked in the app are decided by our research partners. They are only added for research purposes.
- Change of wording to the questions is extremely likely to be rejected unless fixing a typo. Questions are phrased by our research partners and go through internal and external reviews.
- Changes to T&Cs, privacy policy or consent screens. Those are legally binding and are reviewed by legal counsel.
- Support for new countries. While we would love for the COVID Symptom Study to be accessible worldwide, each country has specific data sharing laws that need to be assessed before releasing in the country. Our capacity to do so is heavily constrained.

## In scope PRs

Now that we've excluded a few things, let's discuss what would be great contributions:

- General bugfixes - there are quite a lot of those, as seen in the reviews on the store.
- Small screen support - Devices with a small screen are unlikely to render properly.
- Accessibility - The app has never been tested for this, it's most likely broken.
- UX Improvements
  - Better validation - Error messages are not consistently shown next to the actual error.
  - Better retry - our backend doesn't have 100% uptime atm, mostly due to how it scales up or down. This is something we can and will fix, but we should still give better error messages and retry mechanism.
  - Better UI - we have some great designs that we never had time to implement.
- General code quality improvements.
  - Code refactoring.
  - Unit tests.
  - End to End tests.
- New features - We will expose a list in issues, the most important one would be the ability to:
  - Edit your info
  - View when you reported assessment and backfill them
  - Manage your family members or relatives

## Style guide

We're trying to standardise how we write our code, to make it as easy as possible for others to contribute. Here are some of the standards we use:

- Airbnb's eslint plugin with Typescript: [`eslint-config-airbnb-typescript`](https://github.com/iamturns/eslint-config-airbnb-typescript)
- Prefacing Typescript types and interface names with `T` and `I` respectively. e.g. ` type TComponentNameProps = {}`
- Using `const styles = StyleSheet.create({})` to store all CSS styles pertaining to a specific component
- We follow the TypeScript for React community style guide from: [`typescript-cheatsheets/react`](https://github.com/typescript-cheatsheets/react)
