const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add Node.js polyfills
      webpackConfig.resolve.fallback = {
        ...(webpackConfig.resolve.fallback || {}),
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        util: require.resolve('util/'),
      };

      // Add buffer plugin
      webpackConfig.plugins = [
        ...(webpackConfig.plugins || []),
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ];

      // Add an alias to replace the problematic module
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        'decap-cms-lib-util/src/stega': path.resolve(__dirname, 'src/patches/stega.js')
      };

      return webpackConfig;
    },
  },
};