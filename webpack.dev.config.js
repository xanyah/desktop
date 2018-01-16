const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { spawn } = require('child_process')

// Config directories
const SRC_DIR = path.resolve(__dirname, 'src')
const OUTPUT_DIR = path.resolve(__dirname, 'dist')

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR]

module.exports = {
  devServer: {
    before: () => {
      spawn(
        'electron',
        ['.'],
        {
          env: process.env,
          shell: true,
          stdio: 'inherit',
        }
      )
        .on('close', () => process.exit(0))
        .on('error', spawnError => console.error(spawnError))
    },
    contentBase: OUTPUT_DIR,
    stats: {
      children: false,
      chunks: false,
      colors: true,
    },
  },
  devtool: 'cheap-source-map',
  entry: SRC_DIR + '/index.js',
  module: {
    rules: [
      {
        include: defaultInclude,
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        include: defaultInclude,
        test: /\.scss$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
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
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  target: 'electron-renderer',
}
