const path = require('path')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const cssPlugin = new MiniCssExtractPlugin({
    filename: 'blip-components.css',
})

module.exports = function() {
    return {
        entry: [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            __dirname + '/src/index'
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'blip-components.js',
            libraryTarget: 'commonjs2'
        },
        optimization: {
            minimizer: [new OptimizeCSSAssetsPlugin({})]
        },
        module: {
            noParse: /\.min\.js/,
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    }],
                },
                {
                    test: /\.(jpe?g|gif|png|cur|svg)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                name: 'img/[name].[ext]?[hash]'
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /^((?!\.module).)*scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.module.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName:
                                    '[name]__[local]__[hash:base64:5]'
                            }
                        },
                        'sass-loader'
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: false,
                                exportAsEs6Default: true
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.webpack.js', '.web.js', '.js', '.html', '.ts'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules']
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            watchContentBase: true,
            inline: true,
            compress: true,
        },
        externals: {
            blipToolkit: 'blip-toolkit',
            angular: 'angular',
            moment: 'moment',
            'angular-translate': 'angular-translate',
            fecha: 'fecha'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.LoaderOptionsPlugin({
                debug: true
            }),
            new ForkTsCheckerWebpackPlugin({
                tslint: './tslint.json',
                tsconfig: './tsconfig.json',
                watch: './src/**/*.ts',
                async: false
            }),
            cssPlugin
        ]
    }
}
