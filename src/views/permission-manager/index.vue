<template>
  <div>
    <el-card>
      <el-table
        :data="allPermission"
        style="width: 100%"
        border
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="权限名称"></el-table-column>
        <el-table-column
          prop="permissionDesc"
          label="权限标示"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Admin from '@/api/admin'
const allPermission = ref([])
const getAllPermissions = async () => {
  allPermission.value = await Admin.getAllPermissions()
}
onMounted(async () => {
  await getAllPermissions()
})
</script>
<style lang="scss" scoped></style>
