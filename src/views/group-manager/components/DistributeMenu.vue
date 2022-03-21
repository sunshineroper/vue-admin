<template>
  <el-dialog :model-value="modelValue" title="分配菜单" @close="closed">
    <el-tree
      :data="menuList"
      node-key="id"
      :props="treeProps"
      show-checkbox
      ref="tree"
    ></el-tree>
    <template #footer>
      <el-button @click="closed">关闭</el-button>
      <el-button type="primary" @click="onConfirm" :loading="loading"
        >确定</el-button
      >
    </template>
  </el-dialog>
</template>
<script setup>
import { defineEmits, defineProps, ref, watch, nextTick } from 'vue'
import Admin from '@/api/admin'
import { ElMessage } from 'element-plus'
const tree = ref(null)
const loading = ref(false)
const treeProps = {
  children: 'children',
  label: 'name'
}
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true
  },
  menuList: {
    type: Boolean,
    default: () => {
      return []
    },
    required: true
  },
  selectRow: {
    type: Object,
    default: () => {
      return {}
    },
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'onSuccess'])

const closed = () => {
  emits('update:modelValue')
}

const onConfirm = async () => {
  loading.value = true
  try {
    const { code, message } = await Admin.dispatchMenuPermissions(
      props.selectRow.id,
      { menu_ids: tree.value.getCheckedKeys() }
    )
    if (code < 100) {
      ElMessage.success(message)
      emits('onSuccess')
    }
    loading.value = false
  } catch (err) {
    console.log(err)
    loading.value = false
  }
}
watch(
  () => props.selectRow.id,
  () => {
    const value = props.selectRow.menu_permission.map((item) => item.menu_id)
    nextTick(() => {
      tree.value && tree.value.setCheckedKeys(value)
    })
  }
)
</script>
