
exports.modern = {
  mode: 'production',
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
}

exports.legacy = {
  mode: 'production',
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
}