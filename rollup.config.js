import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import {uglify} from 'rollup-plugin-uglify';
import css from 'rollup-plugin-css-only';
import json from 'rollup-plugin-json';
import scss from 'rollup-plugin-scss';

const env = process.env.NODE_ENV;

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/build.js',
    name: 'p2puSearch',
    format: 'iife',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'lodash': 'lodash',
      'axios': 'axios',
      'jsonp': 'jsonp',
      'moment': 'moment',
      'rc-time-picker': 'rc-time-picker'
    }
  },
  external: [
    'react',
    'react-dom',
    'lodash',
    'axios',
    'jsonp',
    'moment',
    'rc-time-picker',
  ],
  plugins: [
    resolve({
      extensions: [ '.js', '.jsx' ],
      jsnext: true,
      main: true
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
    json(),
    commonjs(),
    scss({output: 'dist/build.css'}),
    babel({
      presets: [
        [
          "es2015",
          {
            "modules": false
          }
        ]
      ],
      exclude: [ 'node_modules/**', '**/*.json' ],
      plugins: [
        "external-helpers",
        "transform-react-jsx",
        'transform-class-properties'
      ]
    }),
    uglify(),
  ]
};