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
or alternatively using `brew install fastlane`

# Available Actions
### bump
```
fastlane bump
```
Bump build numbers, and set the version to match the pacakage.json version.
### get_version_no
```
fastlane get_version_no
```

### release_notes
```
fastlane release_notes
```


----

## Android
### android staging_android
```
fastlane android staging_android
```
Build a Staging AAB

----

## iOS
### ios certificates
```
fastlane ios certificates
```

### ios release
```
fastlane ios release
```
Build
### ios appcenter
```
fastlane ios appcenter
```


----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
