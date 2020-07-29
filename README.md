# COVID-19 Symptom Study

## Table of Contents

- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Tests](#tests)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Common Issues](#common-issues)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About The Project

<p float="left" align="middle">
  <img src="images/screenshot_1.png" width="180" />
  <img src="images/screenshot_2.png" width="180" />
  <img src="images/screenshot_3.png" width="180" />
</p>

COVID Symptom Study is an open source Android and iOS app whose goal is to stop the spread of COVID-19 disease and help identify people who are at risk sooner.

The COVID Symptom Study was designed by doctors and scientists at King's College London, Guys and St Thomas’ Hospitals working in partnership with ZOE Global Ltd – a health science company.

If you're doing research on COVID-19 and you want to contribute or believe this initiative can help your efforts, please let us know at research@joinzoe.com

### Built With

- [React Native](https://reactnative.dev)
- [Expo](https://expo.io)
- [StoryBook](https://storybook.js.org/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- npm
- expo-cli

```sh
npm install npm@latest -g
npm install expo-cli --g
```

### Installation

1. Clone the repo

   ```sh
   git clone git@github.com:zoe/covid-tracker-react-native.git
   ```

2. When you first start your application you should see the IP address in the console (located above the QR code). For example:

   ```sh
   exp://123.456.7.890:19000
   ```

   Copy the host part of the IP address only.

3. Create a `.env` file - please note that `http://` is required otherwise API requests will fail.

   ```sh
   echo "API_URL=http://<ip_address_host_here>:3000" > .env
   ```

   e.g.

   ```sh
   echo "API_URL=http://123.456.7.890:3000" > .env
   ```

4. Run the following command to create `AMPLITUDE_KEY` environment variable:

   ```sh
   echo "AMPLITUDE_KEY=test_key" >> .env
   ```

5. Create an empty `./google-services.json` file in the root of the application.

   ```sh
   echo "{}" > google-services.json
   ```

6. Run the following commands

   ```bash
   npm install
   expo start
   ```

7. Run the mock server

   ```bash
   npm run mock-server
   ```
   
### Git Hooks

The git hook checks can be manually disabled calling git commit and git push with the --no-verify flag if needed.

### Tests

1. Run the standard suite of integration tests

   ```bash
   npm test
   ```

2. Check the i18n strings for a locale are complete

   ```bash
   npm test:i18n sv-SE
   ```

## Storybook

We are trying to embrace Component Driven Design. To develop 

1. Set `ENABLE_STORYBOOK=true` in `App.tsx`

1. Start the storybook server with `npm run storybook`. This will open a webpage where you can flip through the stories in this project, after you've connected a iOS or Android device via `expo start`.  

## Roadmap

See the [open issues](https://github.com/zoe/covid-tracker-react-native/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated** - see the [contributing guidelines](CONTRIBUTING.md).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Common Issues

These are some known, common issues and their solutions:

1. Changes to .env don't get picked up.

- Solution: Change some of the source code or restart the expo project running `expo start -c`

2. Unable to resolve module `deprecated-react-native-listview`

- Solution: Running `rm -rf $TMPDIR/metro-cache` has been reported to solve the problem. 

## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

## Contact

ZOE Engineering - engineering@joinzoe.com

## Acknowledgements

- [Contributor Covenant](https://www.contributor-covenant.org)
