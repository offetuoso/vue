const { VueLoaderPlugin } = require("vue-loader"); // plugins에 추가해야됨
const path = require("path");

module.exports = {
    //웹패킹을 할때 모듈을 사용
    mode: "development",
    devtool: "eval",
    resolve: {
        extensions: [".js", ".vue", ".html"],
    },
    entry: {
        //하나로 합쳐질 파일의 이름 스크립트 및 그외 파일들 rules로 js로 변환해서 통합 저장됨

        app: path.join(__dirname, "main.js"), // [name] (합쳐질 파일의 이름) : main.js (vue의 인스턴스가 선언된 js) 의 위치
    },
    module: {
        //모듈의 핵심 어떻게 합칠것인지
        rules: [
            {
                test: /\.vue$/, // 정규식으로 .vue 파일인 경우 캐치
                loader: "vue-loader", // vue-loader로 변환하여 app.js에 적용
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
    output: {
        // 프로젝트 산출물
        filename: "[name].js", //'app.js',
        path: path.join(__dirname, "dist"),
    },
};
