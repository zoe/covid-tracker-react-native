module.exports = {
  moduleNameMapper: {
    '^@assets/(.*)$': '<rootDir>/assets/$1',
    '^@theme/(.*)$': '<rootDir>/theme/$1',
    '^@covid/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'jest-expo',
  setupFiles: ['dotenv/config', './node_modules/reflect-metadata/Reflect.js', './src/provider/services.ts'],
  transformIgnorePatterns: [
    './node_modules/reflect-metadata/Reflect.js',
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)',
  ],
};
