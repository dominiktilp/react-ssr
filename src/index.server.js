import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { AppContainer } from 'react-hot-loader';

import App from './components/App/App';

const webpackConfig = require('../webpack.config.js');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static(webpackConfig.output.path, { index: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

GLOBAL.env = 'node';

app.route('/')
    .get((req, res) => {      
      return App.fetchData().then((initState) => {
        console.log('[fetchData result]', initState);
        const html = renderToString(
          <AppContainer>
            <App initState={initState} />
          </AppContainer>
        );

        // Send the rendered page back to the client      
        res.render('index.ejs', {
          html,
        });
      })      
    });


app.listen(8080, () => {
  console.log('Listening on http://localhost:8080');
});
