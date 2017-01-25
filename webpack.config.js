var path = require('path');
var webpack = require('webpack');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),
];

if (process.env.NODE_ENV === 'hot') {
  plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: process.env.NODE_ENV === 'hot' ?
    [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './index'
    ] :
    './index',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      exclude: /(node_modules)/
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.s?css$/,
      loader: 'style!css!resolve-url'
    }]
  }
};