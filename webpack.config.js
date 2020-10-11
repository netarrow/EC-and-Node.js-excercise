// Webpack uses this to work with directories
const path = require('path');

// This is the main configuration object.
// Here you write different options and tell Webpack what to do
const modernConfig = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/js/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist/modern'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-env", {
                  "modules": "amd",
                  "useBuiltIns": "usage",
                  "corejs": "3",
                  "targets": {
                      "browsers": [
                          "chrome >= 75",
                          "edge >= 80",
                          "firefox >= 72",
                          "safari >= 14"
                      ]
                  }
              }]
          ]
          }
        }
      }]
  }
};

const legacyConfig = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/js/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist/legacy'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["@babel/preset-env", {
                  "useBuiltIns": "usage",
                  "corejs": "3",
                  "modules": false,
                  "targets": {
                      "browsers": [
                          "ie 11",
                          "> 1%",
                          "last 2 versions",
                          "Firefox ESR"]
                  }
              }]
          ]
          }
        }
      }]
  }
};

module.exports = [modernConfig, legacyConfig]
