<template>
  <div class="user-manage-container">
    <el-card>
      <div class="flex justify-between">
        <div>
          <el-button type="primary" @click="onClickUserVisible" size="small"
            >用户添加</el-button
          >
          <el-button
            type="primary"
            size="small"
            v-permission="['import1']"
            @click="onImportExcelClick"
            >excel导入</el-button
          >
          <el-button type="success" size="small" @click="onToExcel"
            >excel导出</el-button
          >
        </div>
        <div>
          <el-tooltip content="刷新页面">
            <el-button
              :icon="Refresh"
              type="primary"
              circle
              :loading="loading"
              @click="getUsers"
            />
          </el-tooltip>
        </div>
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="头像" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="用户组">
          <template #default="{ row }">
            <div v-if="row.groups && row.groups.length > 0">
              <el-tag
                class=""
                v-for="item in row.groups"
                :key="item.id"
                size="mini"
                >{{ item.name }}</el-tag
              >
            </div>
            <div v-else>
              <el-tag size="mini">暂无分组</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="时间">
          <template #default="{ row }">{{
            $filters.dataFilter(row.openTime)
          }}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="250">
          <template #default="{ row }">
            <el-button
              type="primary"
              @click="onClickUserVisible(row)"
              size="small"
              plain
              >编辑</el-button
            >
            <el-button
              type="info"
              @click="onShowRoleClick(row)"
              size="small"
              plain
              >角色</el-button
            >
            <el-button
              type="danger"
              size="small"
              plain
              :loading="loading"
              @click="onDeleteUser(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end">
        <el-pagination
          :current-page="currentPage"
          :page-size="pageCount"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[5, 10, 20, 30]"
        ></el-pagination>
      </div>
    </el-card>
  </div>
  <el-dialog v-model="dialogVisible" title="导入数据" width="50%" draggable>
    <upload-excel :onSuccess="onSuccess"></upload-excel>
  </el-dialog>
  <user-edit
    v-model="userVisible"
    :allGroups="allGroups"
    :selectRow="selectRow"
    :onSuccess="onSuccess"
  ></user-edit>
  <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
  <roles
    v-model="rolesVisible"
    :allGroups="allGroups"
    :selectRow="selectRow"
    @onSuccess="onSuccess"
  ></roles>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import userEdit from './components/userEdit.vue'
import UploadExcel from '@/components/UploadExcel'
// import { USER_RELATIONS } from './utils'
import ExportToExcel from './components/Export2Excel.vue'
import roles from './components/userGroups.vue'
import Group from '@/api/group'
import User from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Refresh } from '@element-plus/icons'

// 获取用户列表相关
const tableData = ref([])
const pageCount = ref(10)
const currentPage = ref(1)
const totalCount = ref(0)
const loading = ref(false)
const getUsers = async () => {
  let res = {}
  try {
    res = await User.getAllUsers({
      count: pageCount.value,
      page: currentPage.value - 1
    })
    tableData.value = res.users
    totalCount.value = res.total
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}
onMounted(async () => {
  await getUsers()
  await getAllGroups()
})
// 查看 编辑 删除 弹出状态相关
const userVisible = ref(false)
const selectRow = ref({ groups: [] })
const onClickUserVisible = async (row) => {
  userVisible.value = true
  row.id && (selectRow.value = row)
}
const onSuccess = async () => {
  await getUsers()
}

watch(
  () => userVisible.value,
  (val) => {
    if (!val) selectRow.value = { groups: [] }
  }
)
const onDeleteUser = async (row) => {
  if (!row.id) ElMessage.error('')
  ElMessageBox.confirm('是否确定删除该行数据,删除后不可恢复', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const { code, message } = await User.deleteUser(row.id)
      if (code < 100) {
        ElMessage.success(message)
        await getUsers()
      }
    })
    .catch(() => {})
}
// 获取所有分组数据
const allGroups = ref([])
const getAllGroups = async () => {
  allGroups.value = await Group.getAllGroups()
}
const dialogVisible = ref(false)
const exportToExcelVisible = ref(false)
const rolesVisible = ref(false)
const handleSizeChange = (currentSize) => {
  pageCount.value = currentSize
}
const handleCurrentChange = (currentPage) => {
  currentPage.value = currentPage
}

const onImportExcelClick = () => {
  dialogVisible.value = !dialogVisible.value
}
// const onSuccess = ({ header, results }) => {
//   const updateDate = generateData(results)
//   tableData.value = tableData.value.concat(updateDate)
//   dialogVisible.value = false
// }

// const generateData = (results) => {
//   const arr = []
//   results.forEach((item) => {
//     const userInfo = {}
//     Object.keys(item).forEach((key) => {
//       userInfo[USER_RELATIONS[key]] = item[key]
//     })
//     arr.push(userInfo)
//   })
//   return arr
// }
// 导出
// const onToExcel = () => {
//   exportToExcelVisible.value = true
//   loading.value = true
// }
// 为员工分配角色
const onShowRoleClick = (row) => {
  selectRow.value = row
  rolesVisible.value = true
}
</script>
<style lang="scss" scoped>
.user-manage-container {
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
</style>
