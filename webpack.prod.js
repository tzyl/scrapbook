const webpack = require('webpack');
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader!postcss-loader!less-loader",
          fallback: "style-loader",
        })
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJSPlugin(),
    new ExtractTextPlugin({
        filename: "[name].css",
    }),
  ]
});
