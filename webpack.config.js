const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const BABEL_CONF = {
  babelrc: false,
  presets: [
      ['es2015', { modules: false }], 'react',
  ],
};

const entryTools = !isProd ? [
  'webpack/hot/dev-server',
  'webpack-hot-middleware/client?http://localhost:8080',
  'react-hot-loader/patch',
] : [];

const plugins = !isProd ? [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
] : [];

const outputPath = !isProd ? path.resolve(__dirname, 'dev') : path.resolve(__dirname, 'public');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: entryTools.concat([
      './src/index.browser.js',
    ]),
  },
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /.jsx|js?$/,
        exclude: /node_modules/,
        loader: [
          'react-hot-loader/webpack',
          `babel-loader?${JSON.stringify(BABEL_CONF)}`,
        ],
      },
    ],
  },
  plugins: plugins.concat([]),
  devServer: {
    host: 'localhost',
    port: 8080,

    historyApiFallback: true,

    hot: true,
  },
};
