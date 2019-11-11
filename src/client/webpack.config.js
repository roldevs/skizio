const path = require('path');
const R = require('ramda');
// const MinifyPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

// var webpack = require('webpack');
// var WebpackNotifierPlugin = require('webpack-notifier');
// var UnusedFilesWebpackPlugin = require('unused-files-webpack-plugin')['default'];

module.exports = (() => {
  const config = {
    context: __dirname,
    mode: 'development',
    entry: {
      home: './home',
    },
    output: {
      path: path.join(__dirname, '../../public'),
      filename: "[name].js",
      libraryTarget: 'var',
      library: 'Hall'
    },
    // Turn on sourcemaps
    devtool: (process.env.ENVIRONMENT === 'development') ? 'source-map-inline' : false,
    resolve: {
      extensions: ['.ts', '.js', '.json'],

      // Make sure root is src
      // root: __dirname,

      // remove other default values
      modules: ['../../node_modules']
    },
    module: {
      // preLoaders: [{
      //   test: /\.js$/,
      //   loader: 'source-map-loader'
      // }],
      rules: [{
        test: /\.ts$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        }, {
          loader: 'ts-loader'
        }]
      }]
    },
    plugins: [],
  };

  if (process.env.ENVIRONMENT === 'development') {
    return config;
  }

  // Add plugin for production environment
  return R.set(
    R.lensProp('plugins'),
    [new MinifyPlugin({}, { sourceMap: false, comments: false })],
    config
  );
})();
