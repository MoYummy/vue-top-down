const fs = require('fs')
const path = require('path')
const rm = require('rimraf').sync
const rollup = require('rollup')

const dist = path.resolve(__dirname, '../dist')
const builds = require('./config').getAllBuilds()

function clean () {
  rm(dist)
  fs.mkdirSync(dist)
}

function _build (config) {
  return rollup.rollup(config)
    .then(bundle => bundle.write(config.output))
}

function build () {
  return Promise.all(builds.map(config => {
    return _build(config)
  }))
}

clean()
build()