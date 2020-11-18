#!/bin/bash

mkdir -p .signing

echo "$GOOGLE_SERVICE_JSON" | base64 --decode > google-services.json
echo $KEYSTORE_FILE | base64 -d > .signing/release.jks

cp google-services.json ./android/app/google-services.json

EXPO_VERSION=$(cat package.json | jq -r '.dependencies.expo' | cut -d '^' -f2)
EXPO_OTA_VERSION=$(cat app.json | jq -r '.expo.version')
EXPO_RELEASE_CHANNEL=$RELEASE_TYPE'-v'$EXPO_OTA_VERSION

# Expo iOS 
EXPO_PLIST_FOLDER=ios/Covid/Supporting
EXPO_PLIST_TEMPLATE=$EXPO_PLIST_FOLDER/Expo.template.plist
EXPO_PLIST=$EXPO_PLIST_FOLDER/Expo.plist

# Expo Android
EXPO_ANDROID_MANIFEST_FOLDER=android/app/src/main
EXPO_ANDROID_MANIFEST=$EXPO_ANDROID_MANIFEST_FOLDER/AndroidManifest.xml
EXPO_ANDROID_MANIFEST_TEMPLATE=$EXPO_ANDROID_MANIFEST_FOLDER/AndroidManifest.template.xml

COVID_IOS_APP_ID=com.joinzoe.covid-zoe
COVID_ANDROID_APP_ID=com.joinzoe.covid_zoe

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

# iOS
rm -f $EXPO_PLIST
sed -e 's/EX_RELEASE_CHANNEL/'$EXPO_RELEASE_CHANNEL'/' -e 's/EX_VERSION/'$EXPO_VERSION'/' $EXPO_PLIST_TEMPLATE > $EXPO_PLIST 

# Android
# ANDROID_EXPO_SDK_INJECT='    <meta-data android:name="expo.modules.updates.EXPO_SDK_VERSION" android:value="'$EXPO_VERSION'"\/>'
# ANDROID_EXPO_RELEASE_CHANNEL_INJECT='    <meta-data android:name="expo.modules.updates.EXPO_RELEASE_CHANNEL" android:value="'$EXPO_RELEASE_CHANNEL'"\/>'

# Remove existing template file & copy current manifest to make a new template
rm -f $EXPO_ANDROID_MANIFEST_TEMPLATE
cp $EXPO_ANDROID_MANIFEST $EXPO_ANDROID_MANIFEST_TEMPLATE

# Replace lines in templates, create new manifest, remove template
rm -f $EXPO_ANDROID_MANIFEST
sed -e 's/.*updates.EXPO_SDK_VERSION.*/    <meta-data android:name="expo.modules.updates.EXPO_SDK_VERSION" android:value="'$EXPO_VERSION'"\/>/' $EXPO_ANDROID_MANIFEST_TEMPLATE > $EXPO_ANDROID_MANIFEST
cp $EXPO_ANDROID_MANIFEST $EXPO_ANDROID_MANIFEST_TEMPLATE
sed -e 's/.*updates.EXPO_RELEASE_CHANNEL.*/    <meta-data android:name="expo.modules.updates.EXPO_RELEASE_CHANNEL" android:value="'$EXPO_RELEASE_CHANNEL'"\/>/' $EXPO_ANDROID_MANIFEST_TEMPLATE > $EXPO_ANDROID_MANIFEST
rm -f $EXPO_ANDROID_MANIFEST_TEMPLATE


# Override app identifiers in expo's app.json
# if [ $RELEASE_TYPE == "stage" ]; then
#   sed -e 's/'$COVID_IOS_APP_ID'/'$COVID_IOS_APP_ID'.qa/g' -e 's/'$COVID_ANDROID_APP_ID'/'$COVID_ANDROID_APP_ID'.qa/g' app.json > app.json.tmp && rm -f app.json && mv app.json.tmp app.json
# fi
