module.exports = {
  entry: './src/browser.js',
  output: {
    path: '/build',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx|js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
