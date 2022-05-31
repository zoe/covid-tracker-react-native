fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### get_build_number_by_time

```sh
[bundle exec] fastlane get_build_number_by_time
```



### bump

```sh
[bundle exec] fastlane bump
```

Bump build numbers, and set the version to match the pacakage.json version.

### get_expo_release_channel

```sh
[bundle exec] fastlane get_expo_release_channel
```

Get Expo OTA release channel name

### generate_beta_icons

```sh
[bundle exec] fastlane generate_beta_icons
```

Create Beta icons

### get_version_no

```sh
[bundle exec] fastlane get_version_no
```



### release_notes

```sh
[bundle exec] fastlane release_notes
```



### register

```sh
[bundle exec] fastlane register
```



----


## Android

### android release

```sh
[bundle exec] fastlane android release
```

Build Android Staging

### android appcenter

```sh
[bundle exec] fastlane android appcenter
```



----


## iOS

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```



### ios release

```sh
[bundle exec] fastlane ios release
```

Build

### ios appcenter

```sh
[bundle exec] fastlane ios appcenter
```



----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
