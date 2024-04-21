module.exports = {
    //close eslint 防止报错
    lintOnSave: false,
    publicPath: "./",
    assetsDir: "static",
    outputDir: 'dist',
    transpileDependencies: [
      'docx-preview',
    ],
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://192.168.3.154:81',
                target: 'http://localhost:3000/api/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/uti': {
                // target: 'http://192.168.3.154:81',
                target: 'D:/Cailibuhong/video2Graph/video2Graph/src/utils',
                changeOrigin: true,
                pathRewrite: {
                    '^/uti': ''
                }
            },
            '/we/*':{
              target: 'http://t.weather.sojson.com/api/weather/city/',   // 要代理的接口地址
              changeOrigin: true,                            // 允许跨域
              pathRewrite: { '^/we': '' }            // 接口名重写
            }
        },

    },
    configureWebpack: (config) => {
        config.module.rules.push({
          test: /\.glsl$/,
          use: [
            {
              loader: "webpack-glsl-loader",
            },
          ],
        });
      },
}
