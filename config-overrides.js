const {
  override,
  adjustStyleLoaders,
  addWebpackResolve,
  addWebpackModuleRule,
} = require('customize-cra');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = override(
  addWebpackModuleRule({
    test: /\.scss$/,
    use: [
      'style-loader', 
      'css-loader', 
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [path.resolve(__dirname, 'src/assets/styles')],
          },
        },
      },
    ],
  }),
  adjustStyleLoaders(({ use: [, css, postcss, resolve, processor] }) => {
    if (processor && processor.loader.includes('sass-loader')) {
      processor.options.sassOptions = {
        includePaths: [path.resolve(__dirname, 'src/assets/styles')],
      };
    }
  }),
  addWebpackResolve({
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  }),
);
