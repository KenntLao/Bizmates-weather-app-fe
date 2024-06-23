const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://weather.test',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
