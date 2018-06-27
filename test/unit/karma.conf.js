const puppeteer = require('puppeteer')
const rollupConfig = require('../../scripts/config').genConfig('_test')
process.env.CHROME_BIN = puppeteer.executablePath()

module.exports = function (config) {
  config.set({
    files: [
      './specs/**/*.spec.js'
    ],
    preprocessors: {
      '../../src/**/*.js': ['rollupBabel'],
      './specs/**/*.js': ['rollupBabel']
    },
    customPreprocessors: {
      rollupBabel: {
        base: 'rollup',
        options: rollupConfig
      }
    },

    browsers: ['ChromeHeadlessNoSandbox', 'FirefoxHeadless'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      },
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      }
    },

    frameworks: ['mocha', 'sinon-chai'],
    client: {
      chai: {
        includeStack: true
      }
    },

    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: './coverage',
      reporters: [
        // { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },

    singleRun: true,
  })
}
