const path = require('path'); // подключаем path к конфигу вебпак
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {main: './src/pages/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '',
        clean: true
    },
    mode: 'development', // добавили режим разработчика
    devServer: {
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        open: true, // сайт будет открываться сам при запуске npm run dev
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        devMiddleware: {
            writeToDisk: true,
        }
    },
    module: {
        rules: [ // rules — это массив правил
            // добавим в него объект правил для бабеля
            {
              // регулярное выражение, которое ищет все js файлы
              test: /\.js$/,
              // при обработке этих файлов нужно использовать babel-loader
              use: 'babel-loader',
              // исключает папку node_modules, файлы в ней обрабатывать не нужно
              exclude: '/node_modules/'
            },
            // добавили правило для обработки файлов
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[contenthash][ext]',
                },
            },
            {
                // регулярное выражение, которое ищет все файлы с такими расширениями
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[contenthash][ext]',
                },
            },
            {
                // применять это правило только к CSS-файлам
                test: /\.css$/,
                // при обработке этих файлов нужно использовать
                // MiniCssExtractPlugin.loader и css-loader
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    // добавьте объект options
                    options: {importLoaders: 1}
                },
                    // Добавьте postcss-loader
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // Удаление содержимого папки dist
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов
    ]
}
