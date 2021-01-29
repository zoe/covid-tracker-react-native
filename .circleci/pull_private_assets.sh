#!/bin/bash

rm -rf .private-assets

# git clone https://github.com/zoe/covid-symptoms-study-assets .private-assets
git clone git@github.com:zoe/covid-symptoms-study-assets.git .private-assets

mkdir -p .private-assets
mkdir -p assets/fonts

# Copy assets into iOS folders
cp -f .private-assets/assets/fonts/SofiaPro*.otf assets/fonts/
cp -f .private-assets/assets/fonts/SofiaPro*.otf android/app/src/main/assets/fonts/
cp -f .private-assets/assets/fonts/icomoon.ttf assets/fonts/
cp -f .private-assets/assets/fonts/icomoon.ttf android/app/src/main/assets/fonts/
