const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"https://www.shuaixiaoxiao.com"'
const HOST_M = '"https://www.shuaixiaoxiao.com"'


module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {   //定义常量
    HOST: HOST,
    HOST_M: HOST_M,
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
