<template>
  <el-card class="user-container">
    <template #header>
      <div class="header">
        <span>介绍</span>
      </div>
    </template>
    <div class="user-profile">
      <div class="box-center">
        <pan-thumb image="https://s4.ax1x.com/2022/02/08/H17m3n.jpg" height="180px" width="180px">Sunshine</pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">Sunshine</div>
        <div class="user-role text-center text-muted">Sunshine管理系统</div>
      </div>
    </div>
    <div class="project-bio">
      <div class="project-bio-section">
        <div class="project-bio-section-header">
          <svg-icon :icon="introduce"></svg-icon>
          <span>项目介绍</span>
        </div>
        <div class="project-bio-section-body">
          <div class="text-muted">一个pc端后台</div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script setup>
import PanThumb from '@/components/PanThumb'
</script>
<style scoped lang="scss">
.user-profile {
  text-align: center;
  .text-muted {
    font-size: 10px;
    color: #777;
  }
  .box-center {
    padding-top: 10px;
    .text-center {
      text-align: center;
    }
    .user-name {
      font-weight: bold;
    }
    .user-role {
      padding-top: 10px;
      font-weight: bold;
    }
  }
}
.project-bio {
  margin-top: 8px;
  color: #606266;
  .project-bio-section {
    .project-bio-section-header {
      padding-bottom: 5px;
      font-size: 12px;
      font-weight: 700;
      border-bottom: 1px #dfe6ec solid;
    }
    .project-bio-section-body {
      margin-top: 10px;
      .text-muted {
        font-size: 14px;
        margin-bottom: 2px;
      }
    }
  }
}
</style>
