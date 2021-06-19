import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import path from 'path';

export default {
  input: 'src/index.js',

  output: {
    format: 'cjs',
    file: process.env.NODE_ENV === 'production' ? 'cjs/json-api-query-string.production.min.js' : 'cjs/json-api-query-string.development.js',
    exports: 'named'
  },
  external: [
    'query-string',
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),

    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true
    }),

    (process.env.NODE_ENV === 'production' && terser()),

    license({
      banner: {
        content: {
          file: path.join(__dirname, 'LICENSE')
        }
      }
    })
  ]
};
