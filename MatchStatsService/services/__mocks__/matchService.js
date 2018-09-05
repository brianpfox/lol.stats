"use strict";

const mockGet = jest.fn();

const mock = jest.fn().mockImplementation(() => {
  return {get: mockGet};
});

module.exports = mock;