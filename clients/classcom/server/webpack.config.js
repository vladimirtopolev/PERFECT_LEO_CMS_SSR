const path = require("path");
const webpackNodeExternals= require('webpack-node-externals');

const cssRegex = /\.(scss|css)$/;
const cssModuleRegex = /\.component\.styles\.(scss|css)$/;

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
        filename: "index.js",
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: cssRegex,
                exclude: cssModuleRegex,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: cssModuleRegex,
                use: [
                    {
                        loader: 'css-loader/locals',
                        options: {
                            context: '../web',
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    }
                ]
            },
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
