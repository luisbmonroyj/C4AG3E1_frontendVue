const { defineConfig } = require('@vue/cli-service')
//module.exports = {devServer: {
//  port: 3454
// }}
// defineConfig({
//   transpileDependencies: true
// })
module.exports = {
  devServer: {
      port: 3454,
      proxy: {
          '/V1': {
              target: 'http://localhost:7777',
              changeOrigin: true,
              pathRewrite: {
                  '^/V1': ''
              }
          }
          
      }
  }
}