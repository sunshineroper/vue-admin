<template>
  <s-table :options="options" :columnOptions="columnOptions" :data="data" style="width: 100%">
    <template v-slot:actions>
       <el-button size="small"
          >新增</el-button
        >
        <el-button
          size="small"
          type="danger"
          >Delete</el-button
        >
    </template>
  </s-table>
</template>
<script setup>
const options = {
  isEdit: true, // 表格是否可编辑
}
const data = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
const columnOptions = [
  {
    prop: 'date',
    label: 'date'
  },
  {
    prop: 'name',
    label: 'name'
  },
  {
    prop: 'address',
    label: 'address'
  },
  {
    type: 'actions',
    fixed: 'right',
    label: '操作'
  }
]
</script>
