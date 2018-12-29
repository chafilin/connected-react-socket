module.exports = {
  collectCoverageFrom: ["src/*.{js,jsx}"],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
}
