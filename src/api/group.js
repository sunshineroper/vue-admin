import { get } from '@/utils/request'

class Group {
  constructor(uCount = 10, uPage = 0) {
    this.uCount = uCount
    this.uPage = uPage
  }

  async getAllGroups() {
    const groups = await get('/cms/group')
    return groups
  }
}

const group = new Group()
export default group
