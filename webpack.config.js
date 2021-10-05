

const path = require('path');

const newLocal = 'app-public';
const newLocal_1 = /(node_modules|bower_components)/;
const newLocal_2 = "@babel/preset-env";
module.exports = {
    entry:'./public/scripts/index.js',
    output:{
        filename:'bundle.js',
        path: path.resolve(__dirname, newLocal)
        
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: newLocal_1,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },

    devServer:{
        port:3000
    }

    
}