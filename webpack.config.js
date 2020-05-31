/// <binding ProjectOpened='Watch - Development' />

const path = require('path');

module.exports = {
    entry: {
        main: "./src/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./libs")
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    }
};