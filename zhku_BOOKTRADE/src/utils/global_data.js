
const globalData = {
  isSuperUser: false,
}

export const errURL = `https://${HOST}/assets/public/error.png`

export function set (key, val) {
  globalData[key] = val
}

export function get (key) {
  return globalData[key]
}