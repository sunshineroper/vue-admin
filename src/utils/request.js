import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getItem, setItem } from '@/utils/storage'
import store from '@/store'

const refreshTokenException = (code) => {
  const codes = [10000, 10100, 10012, 10042, 10050, 100052]
  return codes.includes(code)
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  validateStatus(status) {
    return status >= 200 && status <= 500
  }
})

service.interceptors.request.use((originConfig) => {
  const reqConfig = { ...originConfig }
  if (reqConfig.url === 'cms/user/refresh') {
    const refreshToken = getItem('refresh_token')
    if (refreshToken) {
      reqConfig.headers.Authorization = refreshToken
    }
  } else {
    const accessToken = getItem('access_token')
    reqConfig.headers.Authorization = accessToken
  }
  if (reqConfig.method === 'post') {
    if (!reqConfig.data) {
      reqConfig.data = reqConfig.params || {}
    }
    let hasFile = false
    if (reqConfig.data) {
      Object.keys(reqConfig.data).forEach((key) => {
        const item = reqConfig.data[key]
        if (typeof item === 'object') {
          if (
            item instanceof FileList ||
            item instanceof File ||
            item instanceof Blob
          ) {
            hasFile = true
          }
        }
      })
      if (hasFile) {
        const formData = new FormData()
        Object.keys(reqConfig.data).forEach((key) => {
          formData.append(key, reqConfig.data[key])
        })
        reqConfig.data = formData
      }
    }
  }
  return reqConfig
})
service.interceptors.response.use(
  async (res) => {
    if (res.status.toString().charAt(0) === '2') {
      return res.data
    }
    const { code, message } = res.data
    /* eslint-disable */
    return new Promise(async (resolve, reject) => {
      const { url } = res.config
      if (refreshTokenException(code)) {
        store.dispatch('user/loginOut')
        const { origin } = window.location
        window.location.href = origin
        return resolve(null)
      }
      if (code === 10041 || code === 10051) {
        const cache = {}
        if (cache.url !== url) {
          cache.url = url
          const data = await service('cms/user/refresh')
          setItem('access_token', `Bearer ${data.access_token}`)
          const result = await service(res.config)
          return resolve(result)
        }
      }
      let msg = ''
      if (typeof message === 'string') {
        msg = message
      } else if (Object.prototype.toString.call === '[Object object]') {
        ;[msg] = Object.values(message)
      } else if (Array.isArray(message)) {
        ;[msg] = message
      }
      ElMessage.error(msg)
      reject(res)
    })
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      ElMessage.warning('请求超时')
    }
    ElMessage.error(error.message)
    return Promise.reject(new Error(error.message))
  }
)

export const get = (url, params = {}) => {
  return service({
    method: 'get',
    url,
    params
  })
}
export const post = (url, data = {}, params = {}) => {
  return service({
    method: 'post',
    url,
    data,
    params
  })
}

export const _delete = (url, params = {}) => {
  return service({
    method: 'delete',
    url,
    params
  })
}
export const put = (url, data = {}, params = {}) => {
  return service({
    method: 'put',
    url,
    data,
    params
  })
}
