const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: './',
    devServer: {
        proxy: {
          '/api': {
            target: 'http://101.32.98.40:8080', // 后端API服务器地址
            changeOrigin: true,
            pathRewrite: { '^/api': '' } // 将/api替换为空字符串
          }
        }
      }
})