import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

let output = [{
	format: 'es',
	file: pkg.module,
	sourcemap: true,
	plugins: [
		terser(),
		nodeResolve(),
	],
}];

if (process.env.BUILD === 'production') {
	output = [ ...output, ...[
		{
			format: 'cjs',
			file: pkg.main,
			sourcemap: true,
		},

		{
			format: 'umd',
			file: pkg.unpkg,
			name: 'dialog',
			sourcemap: true,
		},
	]];
}

export default {
	input: 'src/index.ts',
	output: output,
	plugins: [
		nodeResolve(),
		typescript({
			declaration: false,
			declarationDir: null,
		}),
	],
};
