import { get, post, _delete, put } from '@/utils/request'
class Menu {
  constructor(uCount = 10, uPage = 0) {
    this.uCount = uCount
    this.uPage = uPage
  }

  async getAllMenus() {
    const menus = await get('/cms/menu/')
    return menus
  }

  async createMenu(data) {
    return await post('/cms/menu/createMenu', data)
  }

  async deleteMenu(id) {
    return await _delete(`/cms/menu/${id}`)
  }

  async findMenuById(id) {
    return await get(`/cms/menu/${id}`)
  }

  async updateMenu(data) {
    return await put(`/cms/menu/${data.id}`, data)
  }

  async batchDeleteMenu(data) {
    return await post('/cms/menu/batchDeleteMenu', data)
  }
}
const menu = new Menu()
export default menu
