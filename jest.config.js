module.exports = {
  collectCoverageFrom: ["src/*.{js,jsx}", "!src/index.js", "!src/Context.js"],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
  verbose: true,
}
