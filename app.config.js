import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    hooks: {
      postPublish: [
        {
          config: {
            authToken: process.env.SENTRY_TOKEN,
            organization: 'zoe',
            project: 'covid-symptom-study',
          },
          file: 'sentry-expo/upload-sourcemaps',
        },
      ],
    },
  };
};
