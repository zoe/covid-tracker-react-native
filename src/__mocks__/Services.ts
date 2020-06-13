jest.mock('@covid/core/content/ContentService');
const ContentService = require('@covid/core/content/ContentService');

export default jest.fn().mockImplementation(() => ({
  contentService: jest.fn().mockImplementation(() => ({
    getUserCount: jest.fn(() => Promise.resolve(' 123 ')),
  })),
}));
