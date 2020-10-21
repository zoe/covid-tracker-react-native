#!/bin/bash

mkdir -p .signing

echo "$GOOGLE_SERVICE_JSON" | base64 --decode > google-services.json
echo $KEYSTORE_FILE | base64 -d > .signing/release.jks

EXPO_VERSION=$(cat package.json | jq -r '.dependencies.expo' | cut -d '^' -f2)
EXPO_OTA_VERSION=$(cat app.json | jq -r '.expo.version')
EXPO_RELEASE_CHANNEL=$RELEASE_TYPE'-v'$EXPO_OTA_VERSION
EXPO_PLIST_FOLDER=ios/Covid/Supporting
EXPO_PLIST_TEMPLATE=$EXPO_PLIST_FOLDER/Expo.template.plist
EXPO_PLIST=$EXPO_PLIST_FOLDER/Expo.plist

echo "NAME=$NAME" > .env
echo "API_URL=$API_URL" >> .env
echo "AMPLITUDE_KEY=$AMPLITUDE_KEY" >> .env

echo "APPCENTER_API_TOKEN=$APPCENTER_API_TOKEN" >> .env
echo "APPCENTER_ANDROID_TOKEN=$APPCENTER_ANDROID_TOKEN" >> .env
echo "APPCENTER_IOS_PROJECT_NAME=$APPCENTER_IOS_PROJECT_NAME" >> .env
echo "APPCENTER_NOTIFY_GROUP=$APPCENTER_NOTIFY_GROUP" >> .env
echo "APPCENTER_DESTINATION_TYPE=$APPCENTER_DESTINATION_TYPE" >> .env

echo "MATCH_PASSWORD=$MATCH_PASSWORD" >> .env
echo "FASTLANE_PASSWORD=$FASTLANE_PASSWORD" >> .env
echo "FASTLANE_SESSION=$FASTLANE_SESSION" >> .env

echo "EXPO_RELEASE_CHANNEL=$EXPO_RELEASE_CHANNEL" >> .env

echo "iOS_SCHEME=$iOS_SCHEME" >> .env
echo "iOS_APP_ID=$iOS_APP_ID" >> .env

echo "" >> android/gradle.properties
echo "KEYSTORE_FILE=../../.signing/release.jks" >> android/gradle.properties
echo "KEYSTORE_PASSWORD=$KEYSTORE_PASSWORD" >> android/gradle.properties
echo "KEYSTORE_KEY_ALIAS=$KEYSTORE_KEY_ALIAS" >> android/gradle.properties
echo "KEYSTORE_KEY_PASSWORD=$KEYSTORE_KEY_PASSWORD" >> android/gradle.properties


echo $EXPO_VERSION
rm -f $EXPO_PLIST
sed -e 's/EX_RELEASE_CHANNEL/'$EXPO_RELEASE_CHANNEL'/' -e 's/EX_VERSION/'$EXPO_VERSION'/' $EXPO_PLIST_TEMPLATE > $EXPO_PLIST 

