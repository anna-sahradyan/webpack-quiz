const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        port:8080,
        static:{
            directory:path.resolve(__dirname,"./dist")
        },
        devMiddleware:{
            index:"index.html",
            watchContentBase: true,
        }
    }
};

module.exports = ({develop}) => ({
    mode: develop ? 'development' : 'production',
    entry:  ['./src/index.js', './src/style.css'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
                type: 'asset/inline',
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024//3 kilobytes

                    }
                }
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },

        ]
    },
    ...devServer(develop),
});