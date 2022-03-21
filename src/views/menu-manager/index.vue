<template>
  <div>
    <el-card>
      <div class="flex justify-between">
        <div>
          <el-button type="primary" size="small" @click="handleCreateFirstMenu"
            >新增一级菜单</el-button
          >
          <el-button type="danger" size="small" @click="handleDeleteMenu"
            >批量删除</el-button
          >
        </div>
        <div>
          <el-tooltip content="刷新页面">
            <el-button
              :icon="Refresh"
              :loading="loading"
              type="primary"
              circle
              @click="getList"
            />
          </el-tooltip>
        </div>
      </div>
    </el-card>
    <el-card>
      <el-table
        style="width: 100%"
        :data="menuList"
        row-key="id"
        :tree-props="treeProps"
        :loading="loading"
        @selection-change="setSelectRows"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          label="路由title"
          prop="title"
          width="200"
        ></el-table-column>
        <el-table-column label="路由名" prop="name"></el-table-column>
        <el-table-column label="图标" prop="icon" width="120"></el-table-column>
        <el-table-column label="是否隐藏" align="center" width="120">
          <template #default="{ row }">
            <el-icon v-if="row.hidden" class="check"><Check /></el-icon>
            <el-icon v-else class="close"><Close /></el-icon>
          </template>
        </el-table-column>
        <el-table-column label="是否缓存" align="center" width="120">
          <template #default="{ row }">
            <el-icon v-if="row.kepp_alive" class="check"><Check /></el-icon>
            <el-icon v-else class="close"><Close /></el-icon>
          </template>
        </el-table-column>
        <el-table-column label="是否左侧菜单显示" align="center" width="120">
          <template #default="{ row }">
            <el-icon v-if="row.is_nav" class="text-3xl"><Check /></el-icon>
            <el-icon v-else class="text-3xl"><Close /></el-icon>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <el-button
              size="small"
              type="primary"
              :disabled="row.menutype === 3"
              @click="handleCreateMenu(row.id, 'add')"
              >添加下级下单{{ menutype }}</el-button
            >
            <el-button
              size="small"
              type="info"
              plain
              @click="handleCreateMenu(row.id, 'edit')"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              plain
              @click="handleDeleteMenu(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <menu-edit
      v-model="dialogVisible"
      :id="menuId"
      :type="type"
      :onSuccess="onSuccess"
    ></menu-edit>
  </div>
</template>
<script setup>
import MenuEdit from './components/MenuEdit.vue'
import { ref, onMounted } from 'vue'
import Menu from '@/api/menu'
import { Close, Check, Refresh } from '@element-plus/icons'
import { ElMessageBox, ElMessage } from 'element-plus'
// 获取menu菜单
const rowKeys = ref([])
const treeProps = { children: 'children', hasChildren: 'hasChildren' }
const loading = ref(false)
const menuList = ref([])
const type = ref('add')
// 生成tree的方法
const listTree = (list, tree, parentId) => {
  list.forEach((item) => {
    if (item.parent_id === parentId) {
      const child = {
        ...item,
        children: []
      }
      listTree(list, child.children, item.id)
      if (child.children.length <= 0) {
        delete child.children
      }
      tree.push(child)
    }
  })
}

const getList = async () => {
  try {
    loading.value = true
    menuList.value = []
    const data = await Menu.getAllMenus()
    listTree(data, menuList.value, 0)
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}
onMounted(async () => {
  await getList()
})
const onSuccess = async (id) => {
  rowKeys.value = []
  rowKeys.value.push(id)
  menuList.value = []
  await getList()
}
// 新增或修改方法
const dialogVisible = ref(false)
const menuId = ref()
const handleCreateMenu = (id, op) => {
  menuId.value = id
  type.value = op
  dialogVisible.value = true
}
const handleCreateFirstMenu = () => {
  dialogVisible.value = true
  type.value = 'add'
  menuId.value = 0
}
let selectRows = []
const setSelectRows = (val) => {
  selectRows = val
}
// 删除方法
const handleDeleteMenu = (row) => {
  if (row.id) {
    ElMessageBox.confirm('是否确定删除该菜单及子菜单,删除后不可恢复', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      Menu.deleteMenu(row.id).then(async (res) => {
        const { code, message } = res
        if (code < 200) {
          ElMessage.success(message)
          await getList()
        }
      })
    })
  } else {
    if (selectRows.length > 0) {
      const ids = selectRows.map((item) => item.id)
      ElMessageBox.confirm(
        '是否确定删除选中的菜单以及子菜单,删除后不可恢复',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(async () => {
        Menu.batchDeleteMenu({ ids: ids }).then(async (res) => {
          const { code, message } = res
          if (code < 200) {
            ElMessage.success(message)
            await getList()
          }
        })
      })
    } else {
      ElMessage.error('请选择一行数据')
    }
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
}
.check {
  font-size: 24px;
  color: rgb(245, 108, 108);
}
.close {
  font-size: 24px;
  color: rgb(103, 194, 58);
}
</style>
