const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'app.css',
  disable: process.env.NODE_ENV === 'development',
});

const config = {
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
            presets: [['env', {
              targets: {
                browsers: ['last 2 versions'],
              },
            }]],
          },
        },
      },
      {
        test: /\.css|\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              minimize: true,
            },
          }, {
            loader: 'sass-loader', // compiles Sass to CSS
          }],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    extractSass,
  ],
};

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(new UglifyJSPlugin());
}

module.exports = config;
