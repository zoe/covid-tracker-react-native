export const mockedUserCount = jest.fn(() => Promise.resolve(' 123 '));

export default jest.fn().mockImplementation(() => ({
  getUserCount: mockedUserCount,
}));
