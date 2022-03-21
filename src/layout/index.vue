<template>
  <el-container style="height: 100%">
    <el-aside
      :width="sideWidth"
      style="transition: all 0.3s linear"
      class="aside"
    >
      <side-bar class="sidebar-container"></side-bar>
    </el-aside>
    <el-container>
      <el-header
        class="header flex justify-between flex-col shadow-lg p-0 bottom-px border-solid border-gray-200"
        style="padding: 0"
        :style="headerStyle"
      >
        <div class="w-full h-full">
          <div class="flex items-center pl-5 h-10">
            <el-cion class="mr-2 cursor-pointer" @click="changeSlidebarState">
              <svg-icon
                :icon="sidebarStateIcon"
                width="20px"
                height="20px"
              ></svg-icon>
            </el-cion>
            <nav-bar></nav-bar>
          </div>
          <tags-view></tags-view>
        </div>
      </el-header>
      <el-main class="main">
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import SideBar from './components/SideBar'
import AppMain from './components/AppMain.vue'
import NavBar from './components/NavBar.vue'
import TagsView from './components/TagsView.vue'
import emitter from '@/utils/emit'
import { ref, watch, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const stageList = computed(() => store.getters['user/stageList'])
const historiesList = computed(() =>
  store.getters['app/getHistories'](stageList.value)
)
const headerStyle = ref({
  height: '52px'
})
const defaultSideWitdh = computed(() => store.getters.cssVar.sideBarWidth)
const isCollapse = computed(() => store.getters['user/getCollapse'])
const sideWidth = computed(() => {
  if (isCollapse.value) return '64px'
  return defaultSideWitdh.value
})
const changeSlidebarState = () => {
  store.commit('user/SET_ISCOLLAPSE')
}
onMounted(() => {
  if (historiesList.value.length >= 2) {
    headerStyle.value.height = '80px'
  }
  emitter.on('hasTags', () => {
    headerStyle.value.height = '80px'
  })
  emitter.on('noTags', () => {
    headerStyle.value.height = '52px'
  })
})
const sidebarStateIcon = computed(() => {
  return isCollapse.value ? 'indent' : 'outdent'
})
// watch
watch(isCollapse, (value) => {
  sideWidth.value = value === false ? store.getters.cssVar.sideBarWidth : '64px'
})
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.aside {
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.12);
}
.sidebar-container {
  height: 100%;
  background: $menuBg;
}
</style>
