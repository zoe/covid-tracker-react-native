# Adding new iOS testers

- Copy `devices.txt.example` to `devices.txt` then add all new devices & names there
- Run `yarn fastlane:ios:register` (requires apple creds to be setup correctly)
- Kick off circle ci build to build and deploy
- Click resign on app center