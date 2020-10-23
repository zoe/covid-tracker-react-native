#!/bin/bash

rm -rf .private-assets

# git clone https://github.com/zoe/covid-symptoms-study-assets .private-assets
git clone git@github.com:zoe/covid-symptoms-study-assets.git .private-assets

mkdir -p .private-assets

# Copy assets into iOS folders
cp -f .private-assets/assets/fonts/*.otf assets/fonts/
cp -f .private-assets/assets/fonts/*.otf android/app/src/main/assets/fonts/
