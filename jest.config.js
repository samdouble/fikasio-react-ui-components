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
  coverageReporters: [
    "text",
    "lcov",
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
    "\\.(css)$": "<rootDir>/tests/__mocks__/styleMock.js",
    "\\.(gif|png|jpe?g|svg)$": "<rootDir>/tests/__mocks__/fileMock.js",
    "^@fikasio/styles$": "<rootDir>/node_modules/@fikasio/styles/dist/index.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!@fikasio/styles/)",
  ],
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
          types: ["jest", "node"],
        },
      },
    ],
    "node_modules/@fikasio/styles/.+\\.js$": [
      "ts-jest",
      {
        tsconfig: {
          allowJs: true,
          esModuleInterop: true,
          module: "commonjs",
        },
      },
    ],
  },
};
