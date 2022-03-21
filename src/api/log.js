import { get } from '@/utils/request'
class Log {
  constructor(uCount = 10, uPage = 0) {
    this.uCount = uCount
    this.uPage = uPage
  }

  async getAllLogs(count = this.uCount, page = this.uPage) {
    return get('cms/log', { count, page })
  }

  async searhLogs(keyword, start, end) {
    return get('cms/log/search', {
      count: this.uCount,
      page: this.uPage,
      start,
      keyword,
      end
    })
  }
}

export default new Log()
