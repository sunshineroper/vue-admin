import { ref } from 'vue'
const rules = ref({
  name: [{ required: true, trigger: 'blur', message: '菜单名称不能为空' }],
  title: [{ required: true, trigger: 'blur', message: '菜单标题不能为空' }],
  path: [{ required: true, trigger: 'blur', message: '菜单路由不能为空' }],
  component: [{ required: true, trigger: 'blur', message: '菜单路由不能为空' }],
  menutype: [{ required: true, trigger: blur, message: '请选择菜单类型' }]
})

export default rules
