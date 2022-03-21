<template>
  <div>
    <el-row>
      <el-col :span="8">
        <project-card class="project-card"></project-card>
      </el-col>
      <el-col :span="16">
        <el-tabs v-model="activeName">
          <el-tab-pane label="功能">
            <featrue></featrue>
          </el-tab-pane>
          <el-tab-pane label="章节">
            <chapter></chapter>
          </el-tab-pane>
          <el-tab-pane label="作者">
            <auther></auther>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Auther from './components/Auther.vue'
import Featrue from './components/Featrue.vue'
import Chapter from './components/Chapter.vue'
import { ref } from 'vue'
const activeName = ref('功能')
</script>
<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
