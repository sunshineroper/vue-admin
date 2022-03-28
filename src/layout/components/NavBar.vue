<template>
  <div class="flex items-center justify-between w-full">
    <breadcrumb></breadcrumb>
    <div class="flex items-center">
      <div class="flex items-center">
        <langSelect class="inline-block text-xl pr-4"></langSelect>
        <themeSelect class="inline-block text-xl  pr-4"></themeSelect>
        <el-cion class="inline-block text-xl  pr-4">
          <svg-icon icon="fullscreen"></svg-icon>
        </el-cion>
      </div>

      <el-dropdown trigger="click">
        <span class="flex center gap">
          <el-avatar
            class="mx-1"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <template v-if="user">
            <div class="flex items-center cursor-pointer">
              <span class="text-base mx-2">{{ user.username }}</span>
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
</style>
