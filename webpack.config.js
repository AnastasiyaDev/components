var path = require('path');

module.exports = {
    devtool: 'source-map',
    context: path.resolve('components'),
    entry: {
        app: './app/index.js'
        ,menu: './menu/index.js'
    },
    output: {
        path: path.join(__dirname),
        filename: '[name].js',
        publicPath: '/public'
    },
    module: {
        loaders: [
            {
                test: /\.es6$/,
                exclude: /node_modules|js\/lib/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-es2015-duplicate-keys']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    }
};
