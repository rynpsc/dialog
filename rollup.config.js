import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/dialog.js',
  plugins: [ babel() ],
  targets: [
    {
      dest: 'dist/dialog.umd.js',
      format: 'umd',
      moduleName: 'Dialog'
    }, {
      dest: 'dist/dialog.js',
      format: 'es'
    }
  ]
};
