<template>
  <div class="flex items-center justify-between w-full">
    <breadcrumb></breadcrumb>
    <div class="flex items-center">
      <div class="flex items-center">
        <el-tooltip content="项目开源地址" class="mr-2">
          <svg-icon icon="github-fill" width="30px" height="30px"></svg-icon>
        </el-tooltip>
        <!-- <langSelect class="inline-block text-xl pr-4"></langSelect>
        <themeSelect class="inline-block text-xl  pr-4"></themeSelect> -->
        <el-cion class="inline-block text-xl  pr-4">
          <svg-icon icon="fullscreen"></svg-icon>
        </el-cion>

      </div>

      <el-dropdown trigger="click">
        <span class="flex center gap">
          <el-avatar
            class="mx-1"
            :src="currentUserAvatar"
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
              <div class="flex items-center" @click="toUserSettingInfo">
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
// import langSelect from '@/components/LangSelect'
// import themeSelect from '@/components/ThemeSelect'
import { Tools } from '@element-plus/icons'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import config from '@/config'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const user = computed(() => store.getters['user/getUser'])
const currentUserAvatar = computed(() => `${config.basePicURL}${user.value.avatar}`)
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
const toUserSettingInfo = () => {
  router.push('/user/userinfo-setting')
}
</script>
<style scoped lang="scss">
</style>
