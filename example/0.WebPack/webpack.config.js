const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = { //웹패킹을 할때 모듈을 사용
    mode : 'development', 
    devtool : 'eval',
    resolve : {
        extensions : ['.js','.vue','.html'],
    },
    entry : {
        app : path.join(__dirname,'main.js') //하나로 합쳐질 파일의 이름 스크립트 및 그외 파일들 rules로 js로 변환해서 통합 저장됨

    },
    module : { //모듈의 핵심 어떻게 합칠것인지 
        rules : [{
            test : /\.vue$/,
            loader :  'vue-loader', 
        }],
    },
    plugins : [
        new VueLoaderPlugin(),
    ],
    output : {
        filename : '[name].js',//'app.js',
        path : path.join(__dirname, 'dist'),
    }
};
