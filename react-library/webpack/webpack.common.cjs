const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // If you want to generate a test HTML
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Your main entry point
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'], // Allow importing without specifying extension
  },
  plugins: [
    // Optional: If you want webpack to generate an HTML file for testing the library
    // new HtmlWebpackPlugin({
    //   template: './src/index.html', // Path to your source HTML template
    //   filename: 'index.html'
    // }),
    new ESLintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: 'node_modules',
    }),
  ],
};
