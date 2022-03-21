import { throttle } from 'lodash'
const Utils = {}
Utils.getRandomStr = (n = 6) => {
  let str = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  for (let i = 0; i < n; i += 1) {
    str += chars.charAt(Math.floor(Math.random() * 62))
  }
  return str
}

Utils._throttle = (func, wait = 50) => throttle(func, wait)

export default Utils
