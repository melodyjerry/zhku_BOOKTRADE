
const globalData = {
  isSuperUser: false,
}

export const errURL = `https://www.shuaixiaoxiao.com/assets/public/error.png`

export function set (key, val) {
  globalData[key] = val
}

export function get (key) {
  return globalData[key]
}