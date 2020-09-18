import pkg from './package.json';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
	 input: 'src/index.js',
	 output: [
		{
			format: 'es',
			sourcemap: true,
			file: pkg.module,
		},
		{
			format: 'cjs',
			sourcemap: true,
			file: pkg.main,
		},
	],
	plugins: [nodeResolve(), terser()],
};
