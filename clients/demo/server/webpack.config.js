const path = require("path");
const webpackNodeExternals= require('webpack-node-externals');

module.exports = {
    target: 'node',
    node: {
        __dirname: false
    },
    entry: {
        index: './src/index.ts'
    },
    output: {
        path: path.join(__dirname, "../../../build/server"),
        filename: "index.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader?name=img/[name].[ext]'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            }
        ]
    },
    devtool: "cheap-eval-source-map",
    externals: [webpackNodeExternals()]
};
