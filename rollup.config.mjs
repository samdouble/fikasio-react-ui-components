import image from '@rollup/plugin-image';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

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
    {
      exports: 'named',
      file: pkg.module.replace('.js', '.mjs'),
      format: 'es',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    {
      name: 'bundle-fikasio-styles',
      resolveId(source) {
        if (source === '@fikasio/styles') {
          return path.join(rootDir, 'node_modules/@fikasio/styles/dist/index.js');
        }
        return null;
      },
    },
    image(),
    postcss({
      inject: true,
      plugins: [],
    }),
    typescript({
      include: ['**/*.{ts,tsx}'],
      exclude: ['**/*.d.ts'],
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext',
          moduleResolution: 'bundler',
        },
      },
    }),
    terser(),
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
};

export default config;
