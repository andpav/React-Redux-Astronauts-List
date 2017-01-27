const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');

// hot mode middlewares
if (process.env.NODE_ENV === 'hot') {
  const compiler = webpack(webpackConfig);

  // HMR
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

// dev server provide static files
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'hot') {
  app.use('/public', express.static(path.join(__dirname, '../public')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
