import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import css from 'rollup-plugin-css-only';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/build.js',
    format: 'es'
  },
  external: [
    'react',
    'react-dom',
    'lodash',
    'p2pu-input-fields',
    'axios',
    'jsonp'
  ],
  plugins: [
    resolve({
      extensions: [ '.js', '.jsx' ]
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};