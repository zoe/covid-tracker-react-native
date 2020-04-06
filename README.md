# COVID Symptom Tracker

## Getting Started with Development

### Clone the repo
git clone git@github.com:zoe/covid-tracker-react-native.git

### Run the mock api server
```
npm run mock-server
```

### Get the Cloudbase Authentication file and place it in ./google-services.json

### Start the application
npm install
expo start

### create a .env file
When you first start your application you should see the IP Address in the console. (Located just above the QR Code.)
e.g. exp://123.456.7.890:19000

Create an .env file by running the following. (Replace <hostIP> with the host only e.g. 123.456.7.890)
```
echo "API_URL=http://<hostIP>:3000" > .env
```

e.g.
```
echo "API_URL=http://123.456.7.890:3000" > .env
```