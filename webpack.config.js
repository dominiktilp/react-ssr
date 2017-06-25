import webpack from 'webpack';
import path from 'path';

const BABEL_CONF = {
  babelrc: false,
  presets: [
      ['es2015', { modules: false }], 'react',
  ],
};

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?http://localhost:8080',
      'react-hot-loader/patch',
      './src/browser.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /.jsx|js?$/,
        exclude: /node_modules/,
        loader: [
          'react-hot-loader/webpack',          
          'babel-loader?' + JSON.stringify(BABEL_CONF),
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: 8080,

    historyApiFallback: true,

    hot: true,
  },
};
