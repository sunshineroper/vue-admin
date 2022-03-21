import { _delete, post } from '@/utils/request'

class Article {
  static async deleteArticle(id) {
    return await _delete(`v1/artcile/${id}`)
  }

  static async addArticle(data) {
    return await post('v1/artcile/add', data)
  }
}
export default Article
