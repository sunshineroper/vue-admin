<template>
  <div>
    <h2 class="title">分组列表</h2>
    <el-card>
      <el-table
        style="width: 100%"
        border
        :data="groupList"
        v-loading="loading"
      >
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="描述信息" prop="info"></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              plain
              @click="onDistributePermissionClick(row)"
              >分配权限</el-button
            >
            <el-button
              type="info"
              size="small"
              plain
              @click="onDistributeMenuClick(row)"
              >分配菜单</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="distributeVisible"
      :allPermissions="allPermissions"
      :selectRow="selectRow"
      @onSuccess="onSuccess"
    ></distribute-permission>
    <distribute-menu
      v-model="menuDistributeVisible"
      :selectRow="selectRow"
      :menuList="menuList"
      @onSuccess="onSuccess"
    ></distribute-menu>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import DistributePermission from './components/DistributePermission.vue'
import DistributeMenu from './components/DistributeMenu.vue'
import Group from '@/api/group'
import Admin from '@/api/admin'
import Menu from '@/api/menu'

const onSuccess = async () => {
  await getAllGroups()
}
// 列表数据
const distributeVisible = ref(false)
const groupList = ref([])
const loading = ref(false)
const getAllGroups = async () => {
  try {
    loading.value = true
    groupList.value = await Group.getAllGroups()
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}
// 获取所有可分配的权限
const allPermissions = ref([])
const getAllPermissions = async () => {
  allPermissions.value = await Admin.getAllPermissions()
}
onMounted(async () => {
  await getMenuList()
  await getAllGroups()
  await getAllPermissions()
})
const onDistributePermissionClick = (row) => {
  selectRow.value = row
  distributeVisible.value = true
}
// 菜单相关
const menuDistributeVisible = ref(false)
const selectRow = ref({})
const menuList = ref([])
const treeList = (data, tree, parentId) => {
  data.forEach((item) => {
    if (item.parent_id === parentId) {
      const child = {
        ...item,
        children: []
      }
      treeList(data, child.children, item.id)
      if (child.children.length <= 0) {
        delete child.children
      }
      tree.push(child)
    }
  })
}
const getMenuList = async () => {
  const data = await Menu.getAllMenus()
  treeList(data, menuList.value, 0)
}
const onDistributeMenuClick = (row) => {
  menuDistributeVisible.value = true
  selectRow.value = row
}
watch(
  () => menuDistributeVisible.value,
  (val) => {
    if (!val) selectRow.value = { menu_permission: [], permission: [] }
  }
)
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  color: #3963bc;
  line-height: 59px;
}
</style>
