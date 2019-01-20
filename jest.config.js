module.exports = {
  collectCoverageFrom: ["src/*.{js,jsx}", "!src/index.js", "!src/Context.js"],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 70,
      functions: 70,
      lines: 50,
    },
  },
  verbose: true,
}
