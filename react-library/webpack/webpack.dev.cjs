const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // Good for development speed and debugging
  output: {
    filename: 'react-library.dev.js', // Different filename for dev server
    path: path.resolve(__dirname, '../dist'), // Still output to dist for consistency if needed
    publicPath: '/', // Important for dev server routing
    library: {
    type: 'iife',
  },
  globalObject: 'this',
},
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'), // Serve files from dist
    },
    historyApiFallback: true, // For single-page applications
    port: 3000, // You can change the port
    open: true, // Open browser automatically
    hot: true, // Enable Hot Module Replacement
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader', // Injects styles directly into the DOM for HMR
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss')('./tailwind.config.js'),
                  require('autoprefixer'),
                ],
              },
            },
          },
        ],
      },
      { // Ensure babel-loader has react-refresh/babel plugin for HMR
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // Make sure babelrc: false is not set here if you have a .babelrc,
              // or that presets/plugins are defined directly here if you don't.
              // Assuming presets are in babel.config.js or .babelrc as per standard setup.
              // Adding react-refresh/babel plugin for HMR:
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // For Hot Module Replacement with React components
  ].filter(Boolean),
});
