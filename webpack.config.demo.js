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
    entry: {
      index: path.join(__dirname, "demo/src/index.js"),
      lc: path.join(__dirname, "demo/src/lc.js"),
    },
    output: {
      path: path.join(__dirname, "demo/dist"),
      filename: "[name]-bundle.js"
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
        filename: "[name]-bundle.css",
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "demo/src/index.html"),
        filename: "./index.html",
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "demo/src/lc.html"),
        filename: "./lc.html",
        chunks: ['lc']
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
