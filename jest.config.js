module.exports = {
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
  coveragePathIgnorePatterns: ["node_modules/"],
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/tests/(.*)$": "<rootDir>/tests/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/"],
};
