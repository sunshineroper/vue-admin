<template>
  <el-table :data="data">
    <template v-if="columnOptions && columnOptions.length > 0">
      <template v-for="(item, index) of columnOptions" :key="index">
        <el-table-column :prop="item.prop" :label="item.label" :fixed="item.fixed" :width="item.width" :align="item.align" v-if="!item.type" ></el-table-column>
        <el-table-column v-else :label="item.label" :fixed="item.fixed" :width="item.width" :align="item.align">
          <template #default="scope">
            <slot name="actions" :scope="scope"/>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  data: {
    type: Array,
    default: () => { return [] },
    required: true
  },
  columnOptions: {
    type: Array,
    default: () => { return [] },
    required: true
  }
})
</script>
