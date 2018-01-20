const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: [
        "./src/index.tsx",
        "./src/styles.less"
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    target: "electron-renderer",

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=8192" },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html"
        }),
    ],
};