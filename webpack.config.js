const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const isProd = process.env.NODE_ENV === 'production'

const config = {
  entry: ['regenerator-runtime/runtime', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      theme: path.resolve(__dirname, 'src/style/theme'),
      widgets: path.resolve(__dirname, 'widgets'),
      containers: path.resolve(__dirname, 'containers'),
      components: path.resolve(__dirname, 'components')
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'ZConnect App',
      template: 'src/index.ejs'
    })
  ],
  devServer: {
    contentBase: isProd ? './dist' : './src',
    historyApiFallback: true,
    port: 3000,
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
  },
  devtool: isProd ? false : 'source-map',
  target: 'web',
}

if (isProd) {
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    new ExtractTextPlugin('style-[hash].css')
  );

  config.module.rules.push(
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'style-loader?sourceMap',
          'css-loader?modules=true&localIdentName=[hash:base64:6]&sourceMap',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      }),
    }

  )
}
else {
  config.module.rules.push(
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        'style-loader?sourceMap',
        'css-loader?modules=true&localIdentName=[local]_[hash:base64:6]&sourceMap',
        'postcss-loader?sourceMap',
        'sass-loader?sourceMap',
      ],
    }
  )
}

module.exports = config
