const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = { 
    mode : 'development',
    devtool : 'eval',
    resolve : {
        extensions : ['.js','.vue']
    },
    entry : {
        app : path.join(__dirname,'main.js')
    },
    module : { //모듈의 핵심 어떻게 합칠것인지 
        rules : [{
            test : /\.vue$/,
            loader :  'vue-loader', 
        },{
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        }
    ],
    },
    plugins : [
        new VueLoaderPlugin(),
    ],
    output : {
        filename : '[name].js',
        path : path.join(__dirname, 'dist'),
    }
};
