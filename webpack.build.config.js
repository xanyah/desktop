const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src')
const OUTPUT_DIR = path.resolve(__dirname, 'dist')

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR]

module.exports = {
  entry: SRC_DIR + '/index.js',
  module: {
    rules: [
      {
        include: defaultInclude,
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        include: defaultInclude,
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        include: defaultInclude,
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-0', 'react'],
          },
        }],
      },
      {
        include: defaultInclude,
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
      },
      {
        include: defaultInclude,
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: OUTPUT_DIR,
    publicPath: './',
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin('bundle.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new BabiliPlugin(),
  ],
  stats: {
    children: false,
    chunks: false,
    colors: true,
    modules: false,
  },
  target: 'electron-renderer',
}
