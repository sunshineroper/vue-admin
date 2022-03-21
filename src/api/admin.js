import { get, put } from '@/utils/request'
export default class Admin {
  constructor(uCount = 10, uPage = 0) {
    this.uCount = uCount
    this.uPage = uPage
  }

  static async dispatchMenuPermissions(id, data) {
    return await put(`/cms/admin/dispatchMenuPermissions/${id}`, data)
  }

  static async dispatchPermissions(id, data) {
    return await put(`/cms/admin/permission/${id}`, data)
  }

  static async getAllPermissions() {
    return await get('cms/admin/permission')
  }
}
