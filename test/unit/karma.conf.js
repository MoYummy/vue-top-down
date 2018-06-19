const puppeteer = require('puppeteer')
process.env.CHROME_BIN = puppeteer.executablePath()

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    frameworks: ['mocha', 'sinon-chai'],
    files: ['specs/**/*.js'],

    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]

    }
  })
}