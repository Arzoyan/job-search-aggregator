module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // This is needed for testing React components
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript/TSX files using ts-jest
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock style files
    "^@/(.*)$": "<rootDir>/src/$1", // Map '@/' to 'src' directory
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // Optional if you have setupTests.ts
};
