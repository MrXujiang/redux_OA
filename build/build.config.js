//用于多页面
const HtmlWebpackPlugin = require('html-webpack-plugin');

const template = "./public/index.html";
const PUBLIC_URL = "./public";

const config = {
    entry: {
        index: "./src/index.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: template,
            filename: 'index.html',
            chunks: ["vendor", "index"],
            PUBLIC_URL: PUBLIC_URL,
            hash: true,
            title: "redux入门实战之开发一个todo管理平台"
        })
    ]
}

module.exports = config;
