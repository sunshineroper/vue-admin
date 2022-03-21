<template>
  <el-dialog title="分配权限" :model-value="modelValue" @close="closed">
    <el-tree
      ref="treeRef"
      :data="allPermissions"
      node-key="id"
      show-checkbox
      default-expand-all
      check-strictly
      :props="prop"
    ></el-tree>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">关闭</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { defineProps, defineEmits, ref, watch, nextTick } from 'vue'
import Admin from '@/api/admin'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: Boolean,
    required: true
  },
  allPermissions: {
    type: Array,
    required: true,
    default: () => {
      return []
    }
  },
  selectRow: {
    type: Object,
    required: true,
    default: () => {
      return {}
    }
  }
})
const treeRef = ref(null)
const loading = ref(false)
const emits = defineEmits(['update:modelValue', 'onSuccess'])
const closed = () => {
  emits('update:modelValue')
}
const onConfirm = async () => {
  loading.value = true
  try {
    const { code, message } = await Admin.dispatchPermissions(
      props.selectRow.id,
      {
        permission_ids: treeRef.value.getCheckedKeys().filter((item) => item)
      }
    )
    if (code < 100) {
      ElMessage.success(message)
      loading.value = false
      emits('onSuccess')
    }
    loading.value = false
    closed()
  } catch (err) {
    console.log(err)
    loading.value = false
  }
  console.log()
}
const prop = {
  children: 'children',
  label: 'name'
}
watch(
  () => props.selectRow.id,
  (val) => {
    if (val) {
      const value = props.selectRow.permission.map((item) => item.permission_id)
      nextTick(() => {
        treeRef.value && treeRef.value.setCheckedKeys(value)
      })
    }
  }
)
</script>
