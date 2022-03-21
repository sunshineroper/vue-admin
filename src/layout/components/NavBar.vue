<template>
  <div class="navbar-contaier">
    <breadcrumb></breadcrumb>
    <div class="right-info">
      <div class="right-menu">
        <langSelect class="right-menu-item"></langSelect>
        <themeSelect class="right-menu-item"></themeSelect>
        <el-cion class="right-menu-item">
          <svg-icon icon="fullscreen"></svg-icon>
        </el-cion>
      </div>

      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar
            class="mx-1"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <template v-if="user">
            <div class="flex items-center cursor-pointer">
              <span class="text-base">{{ user.username }}</span>
              <svg-icon icon="setting-fill" class="text-base mx-1"></svg-icon>
            </div>
          </template>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <div class="flex items-center">
                <el-icon><tools /></el-icon>
                个人设置
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="flex items-center" @click="loginOut">
                <svg-icon
                  icon="warning-circle"
                  color="#f12929"
                  class="mr-1"
                ></svg-icon>
                <span>退出登录</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import breadcrumb from './breadcrumb.vue'
import langSelect from '@/components/LangSelect'
import themeSelect from '@/components/ThemeSelect'
import { Tools } from '@element-plus/icons'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
const store = useStore()
const user = computed(() => store.getters['user/getUser'])
// 退出登录
const loginOut = () => {
  ElMessageBox.confirm('是否确定退出登录?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      store.dispatch('user/loginOut')
      location.reload()
    })
    .catch(() => {})
}
</script>
<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  .login-out-icon {
    color: #f12929;
  }
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  .name {
    margin: 0 8px;
  }
}
.navbar-contaier {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .right-info {
    display: flex;
    align-items: center;
    .right-menu {
      display: flex;
      align-items: center;
      ::v-deep .right-menu-item {
        display: inline-block;
        padding: 0 18px 0 0;
        font-size: 20px;
      }
    }
  }
}
</style>
