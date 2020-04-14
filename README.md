# COVID-19 Symptom Tracker

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [Common issues](#common-issues)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## About The Project

<p float="left" align="middle">
  <img src="images/screenshot_1.png" width="180" />
  <img src="images/screenshot_2.png" width="180" />
  <img src="images/screenshot_3.png" width="180" />
</p>

COVID-19 Symptom Tracker is an open source Android and iOS app whose goal is to stop the spread of COVID-19 disease and help identify people who are at risk sooner.

The COVID Symptom Tracker was designed by doctors and scientists at King's College London, Guys and St Thomas’ Hospitals working in partnership with ZOE Global Ltd – a health science company.

If you're doing research on COVID-19 and you want to contribute or believe this initiative can help your efforts, please let us know at research@joinzoe.com


### Built With
* [React Native](https://reactnative.dev)
* [Expo](https://expo.io)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* npm
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
```
exp://123.456.7.890:19000
```
Copy the host part of the IP address only.

4. Create a `.env` file
```sh
echo "API_URL=<ip_address_host_here>:3000" > .env
```
e.g.
```sh
echo "API_URL=http://123.456.7.890:3000" > .env
```
5. Get the Cloudbase Authentication file and store it as `./google-services.json`

6. Run the following commands
```JS
npm install
expo start
```
7. Run the mock server
```
npm run mock-server
```

## Roadmap

See the [open issues](https://github.com/zoe/covid-tracker-react-native/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Common Issues

These are some known, common issues and their solutions:

1. Changes to .env don't get picked up.

- Solution: Change some of the source code.

## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

## Contact

ZOE Engineering - engineering@joinzoe.com

## Acknowledgements
* [Contributor Covenant](https://www.contributor-covenant.org)
