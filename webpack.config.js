const path = require('path');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'production',
  entry: './src/client/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'www/assets'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              targets: {
                browsers: ['last 2 versions'],
              },
            }]],
          },
        },
      },
      {
        test: /\.css|\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css',
      chunkFilename: 'app.[id].css',
      ignoreOrder: false,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
};

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
