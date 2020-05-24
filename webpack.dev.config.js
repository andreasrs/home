const config = require('./webpack.config');

module.exports = {
    ...config,
    mode: 'development',
    optimization: undefined
};