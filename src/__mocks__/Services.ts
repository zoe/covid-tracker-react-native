jest.mock('@covid/core/content/ContentService');
const ContentService = require('@covid/core/content/ContentService');

// TODO - Not sure how to get this to work? Essentially we need to create a mock for src/Services.ts that loads in all the other mocks implementations.... This feels weird.
export default jest.fn().mockImplementation(() => ({
  contentService: new ContentService(),
}));
