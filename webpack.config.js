const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point for remote app
  output: {
    filename: 'remoteEntry.js', // Output filename for remote bundle
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: 'remoteApp', // Name of the remote app
      exposes: {
        './Button': './src/Button.js', // Expose the Button component
      },
      shared: ['react', 'react-dom'], // Shared dependencies
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), // Serve the remote bundle
    port: 3001, // Development server port for remote app
  },
};