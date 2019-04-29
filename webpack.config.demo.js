const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({locale}={}) => {
  let ttag = {
    resolve: { 
      translations: `i18n/${locale}.po`,
      unresolved: 'skip'
    },
  }

  let config = {
    entry: path.join(__dirname, "demo/src/index.js"),
    output: {
      path: path.join(__dirname, "demo/dist"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: null
            },
          },

          exclude: /node_modules/
        },
        {
          test: /\.(css|sass|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "bundle.css",
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "demo/src/index.html"),
        filename: "./index.html"
      })
    ],
    resolve: {
      extensions: [".js", ".jsx", ".scss"]
    },
    devServer: {
      port: 3001
    }
  };

  if (locale != null){
    config.module.rules[0].use.options.plugins = [['ttag', ttag]];
  }

  return config;

};
