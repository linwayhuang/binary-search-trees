const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path'); // need this to run npm run dev

module.exports = merge(common, {
mode: 'development',
devtool: 'eval-source-map',
devServer: {
    static: path.join(__dirname, 'dist'), // suggested by Grok
    port: 8080,
    open: true,
    hot: true,
},
});
