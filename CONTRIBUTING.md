We're glad that you want to help! Here are a few guidelines to help you get started. This document is very early stage so please reach out to us before starting anything significant.

# Out of scope PRs
Before digging into what would be good contributions, let's discuss what would be systematicaly rejected:

* External contributors can not ask new questions about people's health, symptoms or anything related to PII (name, phone, etc.). Questions asked in the app are deciced by our research partners. They are only added for research purpose.
* Change of wording to the questions is extremely likely to be rejected unless fixing a typo. Questions are phrased by our research partners and go through internal and external reviews. 
* Changes to T&Cs, privacy policy or consent screens. Those are legally binding and are reviewed by legal council.
* Support for new countries. While we would love for the COVID Symptom Tracker to be accessible worldwide, each country has specific data sharing laws that need to be assessed before releasing in the country. Our capacity to do so is heavily constrained.

# In scope PRs
Now that we've excluded a few things, let's discuss what would be great contributions:

* General bugfixes - there are quite a lot of those, as seen in the reviews on the store.
* Small screen support - Devices with a small screen are unlikely to render properly.
* Accessibility - The app has never been tested for this, it's most likely broken.
* UX Improvements
  * Better validation - Error messages are not consistently showned next to the actual error.
  * Better retry - our backend doesn't have 100% uptime atm, mostly due to how it scale up or down. This is something we can and will fix, but we should still give better error messages and retry mecanism.
  * Better UI - we have some great designs that we never had time to implement.
* general code quality improvements.
  * Code refacoring .
  * Unit tests.
  * End to End tests.
* New features - We will expose a list in issues, the most important one would be the ability to:
  * Edit your info
  * View when you reported assessment and backfill them
  * Manage your family members or relatives

