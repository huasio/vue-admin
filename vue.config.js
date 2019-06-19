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
  productionSourceMap: false,
  lintOnSave: false
}