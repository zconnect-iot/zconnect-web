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
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: 'last 2 versions'
              },
              modules: false,
              useBuiltIns: true,
            }],
            'react'
          ],
          plugins: [
            ["transform-object-rest-spread", { useBuiltIns: true }],
          ],
        }
      }
    ]
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
        use: 'css-loader?modules=true&localIdentName=[hash:base64:6]!postcss-loader!sass-loader',
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
        'style-loader',
        'css-loader?modules=true&localIdentName=[local]_[hash:base64:6]',
        'postcss-loader',
        'sass-loader?sourceMap',
      ],
    }
  )
}

module.exports = config
