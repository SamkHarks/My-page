const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map', // Source maps for production debugging
  output: {
    filename: '[name].[contenthash].js', // Cache-busting with contenthash
  },
  module: {
    rules: [
      // For CSS Modules
      {
        test: /\.module\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // Ensures @imported resources are processed before this loader
              modules: true,
            },
          },
        ],
      },
      // For Regular CSS (Non-Modules)
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i, // Ensure that non-module CSS is processed separately
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Cache-busting for CSS files
    }),
  ],
  optimization: {
    minimize: true,
    usedExports: true, // Tree-shaking for JavaScript
    minimizer: [
      new TerserPlugin(), // Minifies JavaScript
      new CssMinimizerPlugin(), // Minifies CSS
    ],
    splitChunks: {
      chunks: 'all', // Code-splitting optimization for better cache and loading
    },
  },
});
