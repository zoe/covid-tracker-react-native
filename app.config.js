import env from 'react-native-config';

export default ({ config }) => {
  return {
    ...config,
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'zoe',
            project: 'covid-symptom-study',
            authToken: env.SENTRY_TOKEN,
          },
        },
      ],
    },
  };
};
