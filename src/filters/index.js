import dayjs from 'dayjs'
const dataFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}
export default (app) => {
  app.config.globalProperties.$filters = {
    dataFilter
  }
}
