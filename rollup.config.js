import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'
//import postcss from 'rollup-plugin-postcss';
//import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.js',
  output: {
    file: 'public/uva-render.js',
    format: 'iife',
    name: 'UvaBundle'
  },
  plugins: [
    svelte({
      extensions: ['.svelte', '.css'],
      include: ['src/**/*.svelte', 'node_modules/svelte-intersection-observer/src/*.svelte', 'src/styles/*.css'],
      emitCss: false,
      // compilerOptions: {
      //   dev: true,
      //   customElement: false,
      // }
    }),
    // typescript(),
    resolve({
      browser: true,
      // exportConditions: ['svelte'],
      // extensions: ['.svelte']
      
    }),
    commonjs(),
    // postcss({
    //   extract: true
    // }),
  ]
};