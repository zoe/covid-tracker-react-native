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
### get_build_number_by_time
```
fastlane get_build_number_by_time
```

### bump
```
fastlane bump
```
Bump build numbers, and set the version to match the pacakage.json version.
### get_expo_release_channel
```
fastlane get_expo_release_channel
```
Get Expo OTA release channel name
### generate_beta_icons
```
fastlane generate_beta_icons
```
Create Beta icons
### get_version_no
```
fastlane get_version_no
```

### release_notes
```
fastlane release_notes
```

### register
```
fastlane register
```


----

## Android
### android release
```
fastlane android release
```
Build Android Staging
### android appcenter
```
fastlane android appcenter
```


----

## iOS
### ios certificates
```
fastlane ios certificates
```

### ios build
```
fastlane ios build
```
Build
### ios release
```
fastlane ios release
```
Release
### ios appcenter
```
fastlane ios appcenter
```


----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
