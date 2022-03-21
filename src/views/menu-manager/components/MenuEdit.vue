<template>
  <el-dialog
    :model-value="modelValue"
    :title="title"
    @close="closed"
    :loading="dialogloading"
  >
    <el-form :model="formModel" label-width="130px" :rules="rules" ref="form">
      <el-form-item label="菜单标题" prop="title">
        <el-input type="text" v-model="formModel.title"></el-input>
      </el-form-item>
      <el-form-item label="菜单名" prop="name">
        <el-input type="text" v-model="formModel.name"></el-input>
      </el-form-item>
      <el-form-item label="路由地址" prop="path">
        <el-input type="text" v-model="formModel.path"></el-input>
      </el-form-item>
      <el-form-item label="组件路径" prop="component">
        <el-input type="text" v-model="formModel.component"></el-input>
      </el-form-item>
      <el-form-item prop="menutype" label="菜单类型">
        <el-select v-model="formModel.menutype" clearable placeholder="Select">
          <el-option label="有子路由,折叠显示" value="1"> </el-option>
          <el-option label="子路由以MenuTab展示" value="2"> </el-option>
          <el-option label="直接展示页面" value="3"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否隐藏此路由" prop="hidden">
        <el-radio v-model="formModel.hidden" :label="1">是</el-radio>
        <el-radio v-model="formModel.hidden" :label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="是否缓存此路由" prop="keep_alive">
        <el-radio v-model="formModel.keep_alive" :label="1">是</el-radio>
        <el-radio v-model="formModel.keep_alive" :label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="是否左侧导航显示" prop="keep_alive">
        <el-radio v-model="formModel.is_nav" :label="1">是</el-radio>
        <el-radio v-model="formModel.is_nav" :label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formModel.sort" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="footer">
        <el-button @click="closed">关闭</el-button>
        <el-button @click="onConfirm" type="primary" :loading="loading"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { defineProps, computed, defineEmits, ref, watch } from 'vue'
import Admin from '@/api/admin'
import rules from './rule'
const formModel = ref({ title: '', keep_alive: 1, hidden: 0, is_nav: 1 })
const form = ref(null)
const loading = ref(false)
const dialogloading = ref(false)
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true
  },
  id: {
    type: Number
  },
  onSuccess: {
    type: Function
  },
  type: {
    type: String
  }
})

const emits = defineEmits(['update:modelValue'])
const closed = () => {
  emits('update:modelValue')
}
const resetForm = () => {
  form.value && form.value.resetFields()
}
const createMenu = async () => {
  try {
    formModel.value.parent_id = props.id
    loading.value = true
    const { code, message } = await Admin.createMenu(formModel.value)
    loading.value = false
    if (code < 100) {
      ElMessage.success(message)
      resetForm()
      closed()
      loading.value = false
      props.onSuccess && props.onSuccess(props.id)
    }
  } catch (error) {
    loading.value = false
  }
}
const updateMenu = async () => {
  try {
    loading.value = true
    const { code, message } = await Admin.updateMenu(formModel.value)
    if (code < 100) {
      ElMessage.success(message)
      resetForm()
      closed()
      loading.value = false
      props.onSuccess && props.onSuccess(props.id)
    }
  } catch (error) {
    loading.value = false
  }
}
const onConfirm = () => {
  form.value.validate(async (valid) => {
    if (valid) {
      if (props.type === 'add') {
        await createMenu()
      } else {
        await updateMenu()
      }
    }
  })
}
const title = computed(() => {
  return props.type === 'add' ? '新增菜单' : '编辑菜单'
})
// 更新

watch(
  () => props.modelValue,
  async (val) => {
    resetForm()
    if (props.type === 'edit' && val && props.id) {
      dialogloading.value = true
      formModel.value = await Admin.findMenuById(props.id)
      formModel.value.menutype = formModel.value.menutype + ''
      dialogloading.value = false
    }
  }
)
</script>
