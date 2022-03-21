<template>
  <el-dialog :model-value="modelValue" @close="closed" :title="title">
    <el-form
      :model="userModel"
      ref="form"
      :rules="rules"
      :loading="loading"
      :label-width="120"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userModel.username" :readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="userModel.nickname" :readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="userModel.email" :readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" style="margin-bottom: 28px">
        <el-input v-model="userModel.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm_password">
        <el-input
          v-model="userModel.confirm_password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="选择分组" v-if="pageType === 'add'">
        <template v-if="allGroups && allGroups.length > 0">
          <el-checkbox-group v-model="userModel.groupIds">
            <el-checkbox
              v-for="item in allGroups"
              :label="item.name"
              :key="item.id"
              border
            ></el-checkbox>
          </el-checkbox-group>
        </template>
        <template v-else>
          <el-tag type="info">暂无可选分组信息,默认添加至游客分组</el-tag>
        </template>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closed">关闭</el-button>
      <el-button type="primary" @click="onConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, defineProps, defineEmits, computed, watch } from 'vue'
import User from '@/api/user'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: {
    type: Boolean,
    require: true
  },
  selectRow: {
    type: Object,
    default: () => {
      return {}
    }
  },
  allGroups: {
    type: Array,
    default: () => {
      return []
    }
  },
  onSuccess: {
    type: Function
  }
})

const emits = defineEmits('update:modelValue')
const readonly = ref(false)
const loading = ref(false)
const form = ref(null)
const userModel = ref({})
const resetFileds = () => {
  form.value.resetFields()
}
const pageType = computed(() => {
  return props.selectRow.id ? 'edit' : 'add'
})
const title = computed(() => {
  return props.selectRow.id ? '编辑用户' : '新增用户'
})
watch(
  () => props.modelValue,
  (val) => {
    if (!val) {
      userModel.value = {}
      resetFileds()
    }
  }
)
watch(
  () => props.selectRow,
  (val) => {
    userModel.value = val
  },
  { deep: true }
)
// 新增或编辑用户
const confirmAddOrEditUser = async (data) => {
  loading.value = true
  if (!data.id) {
    try {
      if (data.groupIds) {
        // 处理选中的分组
        data.groupIds = props.allGroups
          .filter((item) => {
            if (userModel.value.groupIds.includes(item.name)) {
              return item.id
            }
          })
          .map((item) => item.id)
      }
      const { code, message } = await User.register(data)
      if (code < 100) {
        ElMessage.success(message)
      }
      loading.value = false
      props.onSuccess && props.onSuccess()
    } catch (error) {
      loading.value = false
      console.log(error)
    }
  }
}
// 新增用户 表单校验相关
const validatePassword = (rule, value, callback) => {
  const reg =
    /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
  if (value === '' || value.trim() === '') {
    callback(new Error('密码不能为空'))
  }
  if (!reg.test(value)) {
    callback(
      new Error(
        '密码长度最少6位,并且必须包含一位大写字母一位小写字母一位数字和一位特殊符号'
      )
    )
  } else {
    callback()
  }
}
const validateConfirmPassword = (rule, value, callback) => {
  if (value === '' || value.trim() === '') {
    callback(new Error('确认密码不能为空'))
  } else if (value !== userModel.value.password) {
    callback(new Error('两次密码输入不一致'))
  } else callback()
}
const rules = ref({
  username: [{ trigger: ['blur'], required: true, message: '用户名不能为空' }],
  email: [{ trigger: ['blur', 'change'], message: '请输入正确的邮箱地址' }],
  confirm_password: [
    { trigger: 'blur', required: true, validator: validateConfirmPassword }
  ],
  password: [{ trigger: 'blur', required: true, validator: validatePassword }]
})
// 关闭按钮
const closed = () => {
  emits('update:modelValue', false)
}
// 确定按钮
const onConfirm = () => {
  form.value.validate(async (valid) => {
    if (!valid) return
    await confirmAddOrEditUser(userModel.value)
    closed()
  })
}
</script>
