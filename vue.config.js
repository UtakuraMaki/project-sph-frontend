module.exports = {
  lintOnSave: false,
  devServer: {
    // proxy: 'http://gmall-h5-api.atguigu.cn'
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  },
  productionSourceMap: false
}