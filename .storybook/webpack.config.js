const path = require('path')

// In production post-css loader is used with auto prefixer so styles may differ slightly
// in story books
module.exports = (storybookBaseConfig, configType) => {
  // configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.
  storybookBaseConfig.resolve = {
    alias: {
      theme: path.resolve(__dirname, '../theme'),
    },
  }

  // Exclude all node_modules except zc-core
  delete storybookBaseConfig.module.rules[0].include
  storybookBaseConfig.module.rules[0].exclude = /node_modules\/(?!(zc-core)\/).*/
  storybookBaseConfig.module.rules.push({
    test: /\.(jpg|png|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[path][name].[ext]',
    }
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      'style-loader?sourceMap',
      'css-loader?modules=true&localIdentName=[local]_[hash:base64:6]&sourceMap',
      'sass-loader?sourceMap',
    ],
  },
  {
    test: /\.css$/,
    include: /(flexboxgrid|react-datepicker|react-dates|animate)/,
    use: [
      'style-loader?sourceMap',
      'css-loader?sourceMap',
    ],
  });

  // Return the altered config
  return storybookBaseConfig;
};
