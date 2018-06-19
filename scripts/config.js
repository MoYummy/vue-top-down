const path = require('path')
const babel = require('rollup-plugin-babel')
const buble = require('rollup-plugin-buble')
const minifyes = require('rollup-plugin-minify-es')
const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify').uglify
const istanbul = require('rollup-plugin-istanbul')

const baseConfig = {
  package: 'vue-top-down',
  entry: 'src/index.js'
}

const stages = {
  BABEL: 0,
  MINIFY: 8,
  COVERAGE: 9
}

const builds = {
  'cjs': {
    format: 'cjs',
  },
  'cjs.min': {
    format: 'cjs',
  },
  'umd': {
    format: 'umd',
  },
  'umd.min': {
    format: 'umd',
  },
  'esm': {
    format: 'es',
  },
  'esm.min': {
    format: 'es',
    plugins: {
      [stages.MINIFY]: minifyes()
    }
  },
  '_test': {
    format: 'cjs',
    plugins: {
      [stages.COVERAGE]: istanbul({ exclude: 'test/**/*.js'})
    }
  }
}

function genConfig (name) {
  const opts = builds[name]
  const input = baseConfig.entry

  const external = [

  ]

  const min = /min$/.test(name)
  const plugins = [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      // plugins: ['external-helpers'],
      // externalHelpers: true
    }),
    buble(),
    !min ? null :
      (opts.plugins && opts.plugins[stages.MINIFY]) ? opts.plugins[stages.MINIFY] : uglify({
        output: {
          ascii_only: true
        },
        compress: {
          pure_funcs: ['makeMap']
        }
      }),
    (opts.plugins && opts.plugins[stages.COVERAGE]) ? opts.plugins[stages.COVERAGE]: null
  ].filter(x => x)

  const { format } = opts
  const output = {
    format,
    file: path.resolve(__dirname, '../dist', [baseConfig.package, name, 'js'].join('.')),
    name: baseConfig.package
  }
  return Object.assign({}, { input, external, output, plugins })
}

exports.genConfig = genConfig
exports.getAllBuilds = () => Object.keys(builds).filter(k => !/^_/.test(k)).map(genConfig)
