const nativeBase: any = jest.genMockFromModule('native-base');

// add mocked implementations when needed
nativeBase.Toast = {
  show: jest.fn(),
};

module.exports = nativeBase;
