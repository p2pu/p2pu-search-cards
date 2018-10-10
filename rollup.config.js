import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import {terser} from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import json from 'rollup-plugin-json';
import scss from 'rollup-plugin-scss';
import polyfill from 'rollup-plugin-polyfill';
import builtins from 'rollup-plugin-node-builtins';


const env = process.env.NODE_ENV;
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/
};

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/build.js',
    name: 'p2puSearch',
    format: 'umd',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'lodash': 'lodash',
      'axios': 'axios',
      'jsonp': 'jsonp',
      'moment': 'moment',
      "p2pu-input-fields": "p2pu-input-fields",
    }
  },
  external: [
    'react',
    'react-dom',
    'lodash',
    'axios',
    'jsonp',
    'moment',
    "p2pu-input-fields"
  ],
  plugins: [
    builtins(),
    resolve({
      extensions: [ '.js', '.jsx' ],
      jsnext: true,
      main: true,
      preferBuiltins: false
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
      exclude: ["node_modules/**/*", "**/*.json"],
      plugins: [
        "external-helpers",
        "transform-react-jsx",
        'transform-class-properties'
      ]
    }),
    polyfill('src/index.js', ['custom-event-polyfill']),
    terser()
  ]
};