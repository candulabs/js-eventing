/* global __dirname, require, module */
const webpack = require('webpack');
const path = require('path');
const { env } = require('yargs').argv; // use --env with webpack 2

const packageJson = require('./package.json');

const { UglifyJsPlugin } = webpack.optimize;
const libraryName = 'candu-eventing';
let outputFile;

const baseUrl =
  process.env.NODE_ENV === 'production' ? 'https://api.candu.ai' : 'http://localhost:9000';

const plugins = [
  new webpack.DefinePlugin({
    // always pass in production to avoid REDUX error message
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    __BASE_URL__: JSON.stringify(baseUrl),
    __VERSION__: JSON.stringify(packageJson.version),
  }),
];

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = `${libraryName}.min.js`;
} else {
  outputFile = `${libraryName}.js`;
}

const config = {
  entry: path.join(__dirname, '/app/index.js'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js'],
  },
  plugins,
};

module.exports = config;
