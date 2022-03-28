import { post, put, _delete, get } from '@/utils/request'
import { setItem } from '@/utils/storage'
/* eslint-disable */
export default class User {
  constructor(uCount = 10, uPage = 0) {
    this.uCount = uCount
    this.uPage = uPage
  }
  static async login(username, password) {
    const { access_token, refresh_token } = await post(
      'cms/user/login',
      username,
      password
    )
    setItem('access_token', `Bearer ${access_token}`)
    setItem('refresh_token', `Bearer ${refresh_token}`)
  }
  static async getAllUsers({ count = this.uCount, page = this.uPage }) {
    const users = await get('/cms/user/all', {
      count,
      page
    })
    return users
  }
  static async updateUser(id, data) {
    return put(`cms/user/${id}`, data)
  }
  static async deleteUser(id) {
    return _delete(`cms/user/${id}`)
  }
  static async getPermissions() {
    return await get('cms/user/permissions')
  }

  static async updateUserGroup(id, data) {
    return await put(`cms/user/updateUserGroup/${id}`, data)
  }

  static async register(data) {
    return post('cms/user/register', data)
  }
}
