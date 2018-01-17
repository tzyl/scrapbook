const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  module: {
    rules: [
        {test: /\.less$/, loader: "style-loader!css-loader!postcss-loader!less-loader"},
    ]
  },
});
