var env = process.env.NODE_ENV;
var path = require('path');

module.exports = {
    devtool: 'source-map',
    context: path.resolve('components'),
    entry: {
        common: './common/index.js'
        ,app: './app/index.js'
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        publicPath: '/dist'
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
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    }
};
