<template>
  <div>
    <div class="flex">
      <el-button
        type="info"
        class="mr-8"
        v-permission="'新增'"
        @click="handleAddClick"
        >新增</el-button
      >
      <el-button type="danger" @click="handleDeleteClick">删除</el-button>
    </div>
    <div class="h-0.5 text-red-600 mb-20" style="font-size: 24px">22</div>
    <div class="text-base">3333</div>
    <!-- <div class="text-2xl h-0.5 text-red-600">33</div> -->
  </div>
</template>
<script setup>
import Article from '@/api/article'
const handleAddClick = async () => {
  await Article.addArticle()
}
const handleDeleteClick = async () => {
  await Article.deleteArticle(2)
}
</script>
<style lang="scss" scoped></style>
