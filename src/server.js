import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { AppContainer } from 'react-hot-loader';

import App from './components/App/App';


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

function renderFullPage(html) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>React SSR 2</title>
      </head>
      <body>
        <div id="app">${html}</div>             
        <script src="./app.js"></script>
      </body>
    </html>
    `;
}

app.route('/')
    .get((req, res) => {
      // Render the component to a string
      const html = renderToString(
        <AppContainer>
          <App />
        </AppContainer>
      );      

      // Send the rendered page back to the client
      res.send(renderFullPage(html));
    });


app.listen(8080, () => {
  console.log('Listening on http://localhost:8080');
});
