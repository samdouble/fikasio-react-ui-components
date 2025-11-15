import '@testing-library/jest-dom';

// Mock scrollIntoView for tests
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = jest.fn();
}
