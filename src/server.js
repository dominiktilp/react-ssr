import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';

const app = express();

const webpackConfig = require('../webpack.config.js');

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public'));
app.use(express.static('build'));

app.route('/')
    .get((req, res) => {
      res.sendFile(path.resolve('./public/index.html'));
    });

app.listen(8080, () => {
  console.log('Listening on http://localhost:8080');
});
