<template>
  <div>
    <!-- <div class="flex">
      <el-button
        type="info"
        class="mr-8"
        v-permission="'新增'"
        @click="handleAddClick"
        :multiple="true"
        >新增</el-button
      >
      <el-button type="danger" @click="handleDeleteClick">删除</el-button>
    </div>
    <div class="h-0.5 text-red-600 mb-20" style="font-size: 24px">22</div>
    <div class="text-base">3333</div> -->
    <el-upload action="http://localhost:4000/cms/file">
      <el-button>文件上传</el-button>
    </el-upload>
    <input
      class="upload-imgs__input"
      type="file"
      ref="input"
      multiple
      @change="handleChange"
    />
    <!-- <el-image-viewer v-if="showViewer" @close="closeViewer" :initial-index="imageInitialIndex" :url-list="srcList" /> -->
  </div>
</template>
<script setup>
import { post } from '@/utils/request.js'
// import Article from '@/api/article'
// const handleChange = async () => {
//   await Article.addArticle()
// }
// const handleDeleteClick = async () => {
//   await Article.deleteArticle(2)
// }
const handleChange = async (e) => {
  const { files } = e.target
  if (!files) return
  const info = await getImgInfo(files[0])

  const data = info.file
  await post('cms/file', { file_0: data })
}

// 获取图片信息
const getImgInfo = (file) => {
  const localURL = window.URL.createObjectURL(file)
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.src = localURL
    image.onload = () => {
      const localFileInfo = {
        localURL,
        file,
        width: image.width,
        height: image.height,
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      }
      resolve(localFileInfo)
      image = null
    }
    image.onerror = () => {
      reject(new Error('图片加载失败'))
      image = null
    }
  })
}
</script>
<style lang="scss" scoped></style>
