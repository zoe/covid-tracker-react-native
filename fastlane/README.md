fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios dev
```
fastlane ios dev
```
iOS publishing lanes

iOS Dev Channel (AppCenter)
### ios stage
```
fastlane ios stage
```
TODO: iOS Stage Channel (AppCenter/TestFlight)
### ios prodution
```
fastlane ios prodution
```
TODO: iOS Production Channel (App Store)

----

## Android
### android dev
```
fastlane android dev
```
Android publishing lanes

Android Dev Channel (AppCenter)
### android stage
```
fastlane android stage
```
TODO: Android Stage Channel (AppCenter/Play Store Beta)
### android prodution
```
fastlane android prodution
```
TODO: Android Production Channel (Play Store)

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
