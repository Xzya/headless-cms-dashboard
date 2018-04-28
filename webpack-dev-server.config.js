// const webpack = require('webpack');
// const path = require('path');
// const TransferWebpackPlugin = require('transfer-webpack-plugin');

// const config = {
//   // Entry points to the project
//   entry: {
//     main: [
//       // only- means to only hot reload for successful updates
//       'webpack/hot/only-dev-server',
//       './src/app/app.js',
//     ],
//   },
//   // Server Configuration options
//   devServer: {
//     contentBase: 'src/www', // Relative directory for base of server
//     hot: true, // Live-reload
//     inline: true,
//     port: 3001, // Port Number
//     host: 'localhost', // Change to '0.0.0.0' for external facing server
//     historyApiFallback: true,
//   },
//   devtool: 'eval',
//   output: {
//     path: path.resolve(__dirname, 'build'), // Path of output file
//     filename: 'app.js',
//   },
//   plugins: [
//     // Enables Hot Modules Replacement
//     new webpack.HotModuleReplacementPlugin(),
//     // Moves files
//     new TransferWebpackPlugin([
//       { from: 'www' },
//     ], path.resolve(__dirname, 'src')),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           cacheDirectory: true,
//         },
//       },
//     ],
//   },
// };

// module.exports = config;

const path = require('path');

module.exports = {
  devtool: 'eval',
  // Entry points to the project
  entry: {
    main: [
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',
      './src/app/app.js',
    ],
  },
  // Server Configuration options
  devServer: {
    contentBase: 'src/www', // Relative directory for base of server
    hot: true, // Live-reload
    inline: true,
    port: 3001, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  output: {
    path: path.resolve(__dirname, 'build'), // Path of output file
    filename: 'app.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  },
};
