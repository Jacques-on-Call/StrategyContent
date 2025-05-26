const { merge } = require('webpack-merge'); 
const common = require('./webpack.common.cjs'); // <-- Note .cjs here 
const path = require('path'); 

module.exports = merge(common, { 
  mode: 'production', 
  output: { 
    filename: 'react-library.iife.js', 
    path: path.resolve(__dirname, '../dist'), 
    globalObject: 'this', 
  }, 
  module: { 
    rules: [] 
  }, 
  plugins: [], 
  optimization: { 
    minimize: false, 
  }, 
}); 