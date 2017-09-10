import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

export default {
  entry: 'src/index.js',
  plugins: [
		babel(),
		minify({ comments: false })
	],
  targets: [
    {
      dest: 'dist/dialog.umd.js',
      format: 'umd',
      moduleName: 'dialog'
    }, {
      dest: 'dist/dialog.js',
      format: 'es'
    }
  ]
};
