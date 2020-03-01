const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"https://www.shuaixiaoxiao.com"'
const HOST_M = '"https://www.shuaixiaoxiao.com"'


module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {   //定义常量
    HOST: HOST,
    HOST_M: HOST_M,
  },
  mini: {},
  h5: {}
}
