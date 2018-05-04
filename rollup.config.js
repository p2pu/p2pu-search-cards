import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/build.js',
    format: 'cjs'
  },
  external: [
    'react',
    'react-dom',
    'lodash',
    'axios',
    'p2pu-input-fields',
    'jsonp',
    'moment'
  ],
  plugins: [
    resolve({
      extensions: [ '.js', '.jsx' ],
      jsnext: true,
      main: true
    }),
    json(),
    commonjs(),
    babel({
      exclude: [ 'node_modules/**', '**/*.json' ]
    }),
  ]
};