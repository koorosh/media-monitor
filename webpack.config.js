const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const MainHtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
  chunks: ['main']
});

const OptionsHtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/options.html',
  filename: 'options.html',
  inject: 'body',
  chunks: ['options']
});

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
    options: path.resolve(__dirname, 'src/options.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    publicPath: '/',
    inline: true,
    port: process.env.PORT || 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      }, {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx','.css'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      { from: 'secret/manifest.json', to: 'manifest.json' },
      { from: 'src/assets/favicon.ico', to: 'favicon.ico' },
      { from: 'src/assets/icon.png', to: 'icon.png' }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    MainHtmlWebpackPluginConfig,
    OptionsHtmlWebpackPluginConfig
  ]
};