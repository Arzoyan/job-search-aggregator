// jest.config.js
module.exports = {
  preset: "ts-jest", // Use ts-jest preset for TypeScript support
  testEnvironment: "jsdom", // Use jsdom for testing React components
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files using ts-jest
    "^.+\\.jsx?$": "babel-jest", // Transform JavaScript files using babel-jest if needed
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  transformIgnorePatterns: [
    "node_modules/(?!antd)", // Allow transforming antd or any other modules if necessary
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
