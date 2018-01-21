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
            { test: /\.css$/, use: "style-loader!css-loader" },
            // {
            //     test: /\.(woff|woff2)$/,
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             name: 'fonts/[hash].[ext]',
            //             limit: 5000,
            //             mimetype: 'application/font-woff'
            //         }
            //     }
            // }, {
            //     test: /\.(ttf|eot|svg)$/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: 'fonts/[hash].[ext]'
            //         }
            //     }
            // },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html"
        }),
    ],
};
