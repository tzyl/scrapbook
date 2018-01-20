const webpack = require("webpack");

module.exports = {
    entry: [
        "./src/main.ts",
    ],
    output: {
        filename: "main.js",
        path: __dirname + "/dist"
    },

    target: "electron-main",

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        ]
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      })
    ],

    node: {
        __dirname: false,
        __filename: false
    },
};
