<template>
  <div>
    <logo :elMenuCollapse="isCollapse"></logo>
    <search class="search"></search>
    <el-menu
      class="sider-menu"
      :collapse="isCollapse"
      :default-active="activeMenu"
      :background-color="$store.getters.cssVar.menuBg"
      :text-color="$store.getters.cssVar.menuText"
      :active-text-color="$store.getters.cssVar.menuActiveText"
    >
      <menu-tree
        v-for="item in sideBarList"
        :key="item.path"
        :item="item"
      ></menu-tree>
    </el-menu>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import menuTree from './menuTree.vue'
import search from './search.vue'
import logo from './logo'
const route = useRoute()
const store = useStore()
const isCollapse = computed(() => store.getters['user/getCollapse'])
const sideBarList = store.getters['user/slidebarList']
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  margin: 15px auto;
}
.sider-menu:not(.el-menu--collapse) {
  // width: 210px;
  min-height: 400px;
  // .el-menu-item:hover {
  //   background: #409eff !important;
  // }
}
</style>
