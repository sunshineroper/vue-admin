<template>
  <div class="login-container h-screen bg-cover bg-center">
    <div class="w-full h-full flex justify-center items-center">
      <div
        class="bg-white rounded-xl shadow-2xl"
        style="width: 430px; height: 300px"
      >
        <div class="login-header text-center text-xl py-3">
          <h2>CMS管理系统</h2>
        </div>
        <el-form
          class="login-form w-4/5 m-auto"
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
        >
          <div class="flex items-center mb-1">
            <svg-icon icon="user" width="20px" height="20px"></svg-icon>
            <span class="text-sm ml-1">用户名</span>
          </div>
          <el-form-item prop="username">
            <el-input
              placeholder="username"
              name="usernmae"
              type="text"
              v-model="loginForm.username"
            />
          </el-form-item>
          <div class="flex items-center mb-1">
            <svg-icon icon="password" width="20px" height="20px"></svg-icon>
            <span class="text-sm ml-1">密码</span>
          </div>
          <el-form-item prop="password">
            <el-input
              placeholder="password"
              name="password"
              :type="passwordType"
              v-model="loginForm.password"
              class="relative"
            />
            <span class="absolute right-3" @click="onChangePwdType">
              <svg-icon
                width="20px"
                height="20px"
                :icon="passwordType === 'password' ? 'eye-close' : 'eye'"
              ></svg-icon>
            </span>
          </el-form-item>
          <div class="login-button">
            <el-button
              type="primary"
              style="height: 45px; width: 100%"
              :loading="loading"
              @click="throttleLogin"
              >登录</el-button
            >
            <!-- <el-button type="info" style="height: 45px; width: 100%" disabled
              >github登录</el-button
            > -->
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { validatePssword } from './rules'
import Utils from '@/utils/utils'
import User from '@/api/user'
import { useStore } from 'vuex'

const loading = ref(false)
const loginFormRef = ref(null)
const route = useRouter()
const store = useStore()
const loginForm = ref({
  username: 'admin',
  password: 'Ss123@'
})
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePssword()
    }
  ]
})

const passwordType = ref('password')
const throttleLogin = ref(null)

const handleLogin = () => {
  loginFormRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      loading.value = true
      const { username, password } = loginForm.value
      await User.login({ username, password })
      store.commit('user/SET_LOGININ', true)
      route.push('/')
    } catch (error) {
      loading.value = false
    }
  })
}
onMounted(() => {
  window.localStorage.clear()
  throttleLogin.value = Utils._throttle(handleLogin, 2000)
})
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  background-image: url('../../assets/login-bg.jpeg');
}
</style>
