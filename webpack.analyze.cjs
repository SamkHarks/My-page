const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.prod.cjs');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // 'static' generates an HTML file with the report
      openAnalyzer: true,     // Automatically open the report after build
    }),
  ],
});
