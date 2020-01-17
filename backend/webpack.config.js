const path = require('path');

module.exports = {
    entry: {
        overview: './app/views/overview.ts',
        add: './app/views/add.ts'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        path: path.resolve(__dirname, 'build', 'views', 'assets'),
    },
};
