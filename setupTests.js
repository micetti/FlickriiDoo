import 'jest-extended';
import 'react-native/jest/setup';
import '@testing-library/jest-native/extend-expect';

// jest.useFakeTimers()
require('jest-fetch-mock').enableMocks();

global.beforeEach(() => {
  jest.resetAllMocks();
  fetch.resetMocks();
});
