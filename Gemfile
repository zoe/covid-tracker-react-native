# Gemfile
source "https://rubygems.org"

gem "fastlane", '2.182.0'

# In order to use xcode 13 for fixing ios 15 build issue
gem "xcode-install"

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
