const path = require('path')

const defaultSetting = require('./src/config')

const resolve = dir => path.join(__dirname, dir)

const name = defaultSetting.title || '后台管理'

const port = 9527

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-amdin' : '/',
  outputDir: 'dist',
  assetsDir: 'static',

  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },

  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // url-loader 不加载 icons 下面的 svg
    // 由 svg-sprite-loader 加载
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module.rule('icons').test(/\.svg$/).include.add(resolve('src/icons')).end().use('svg-sprite-loader').loader('svg-sprite-loader').options({
      symbolId: 'icon-[name]'
    }).end()
  },
  productionSourceMap: false,
  lintOnSave: false
}
