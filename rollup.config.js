import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import json from 'rollup-plugin-json';
import scss from 'rollup-plugin-scss'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/build.js',
    format: 'es',
    globals: { jquery: '$' }
  },
  external: [
    'react',
    'react-dom',
    'lodash',
    'axios',
    'jsonp',
    'moment',
    'rc-time-picker',
    'moment-timezone',
    'jquery',
  ],
  plugins: [
    resolve({
      extensions: [ '.js', '.jsx' ],
      jsnext: true,
      main: true
    }),
    json(),
    commonjs(),
    scss({output: 'dist/build.css',}),
    babel({
      exclude: [ 'node_modules/**', '**/*.json' ]
    }),
  ]
};