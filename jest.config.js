/** @type {import("jest").Config} **/
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{ts,tsx}",
  ],
  coveragePathIgnorePatterns: [
    "node_modules",
    "./src/stories/",
    "./src/setupTests.ts",
    "./tests/*.visual.test.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 2,
      functions: 9,
      lines: 27,
      statements: 27,
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "<rootDir>/tests/__mocks__/styleMock.js",
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/tests/'],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          module: "commonjs",
          esModuleInterop: true,
        },
      },
    ],
  },
};