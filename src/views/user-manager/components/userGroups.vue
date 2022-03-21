<template>
  <el-dialog title="选择权限组" :model-value="modelValue" @close="closed">
    <el-checkbox-group v-model="userGroupList">
      <el-checkbox
        v-for="item in allGroups"
        :label="item.name"
        :key="item.id"
      ></el-checkbox>
    </el-checkbox-group>
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
import { defineProps, defineEmits, watch, ref } from 'vue'
import User from '@/api/user'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  selectRow: {
    type: Object,
    required: true,
    default: () => {
      return {}
    }
  },
  allGroups: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const userGroupList = ref([])
const loading = ref(false)
const emits = defineEmits(['update:modelValue', 'onSuccess'])
const closed = () => {
  emits('update:modelValue', false)
}
const onConfirm = async () => {
  const groupIds = userGroupList.value.map((item) => {
    const group = props.allGroups.find((group) => group.name === item)
    if (group) return group.id
  })

  try {
    loading.value = true
    const { code, message } = await User.updateUserGroup(props.selectRow.id, {
      user_id: props.selectRow.id,
      group_ids: groupIds || []
    })
    if (code < 100) {
      ElMessage.success(message)
      emits('onSuccess')
    }
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }

  emits('updateRole')

  closed()
}
watch(
  () => props.selectRow.id,
  () => {
    userGroupList.value = props.selectRow.groups.map((item) => item.name)
  }
)
</script>
