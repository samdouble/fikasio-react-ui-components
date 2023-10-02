import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import sass from 'rollup-plugin-sass';
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const config = {
  input: 'src/index.ts',
  output: [
    {
      exports: 'named',
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    image(),
    postcss({
      plugins: [],
    }),
    sass({
      insert: true,
      output: 'dist/styles.css',
    }),
    typescript(),
    uglify(),
  ],
  external: ['react', 'react-dom'],
};

export default config;
