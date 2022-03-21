<template>
  <el-sub-menu
    v-if="item.children && item.children.length > 0"
    :index="item.path"
  >
    <template #title>
      <el-icon>
        <svg-icon :icon="item.icon ? item.icon : 'unorderedlist'"></svg-icon>
      </el-icon>
      <span>{{ item.title }}</span>
    </template>
    <menu-tree
      v-for="child in item.children"
      :key="child.path"
      :item="child"
    ></menu-tree>
  </el-sub-menu>
  <el-menu-item v-else :index="item.path" @click="navigateTo(item.path)">
    <template #title>
      <el-icon>
        <svg-icon :icon="item.icon ? item.icon : 'unorderedlist'"></svg-icon>
      </el-icon>
      <span>{{ item.title }}</span>
    </template>
  </el-menu-item>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push({ path })
    }
  }
}
</script>
