<template>
  <el-dialog :model-value="modelValue" title="导出数据" width="30%" draggable>
    <el-input placeholder="excel文件名称" v-model="excelName" />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">关闭</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
const excelName = ref('导出数据')
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue'])
const closed = () => {
  emits('update:modelValue', false)
}
const onConfirm = () => {
  closed()
}
</script>
