<template>
  <div class="container">
    <div class="container-body">
      <h2>404</h2>
      <p class="desc">抱歉,您访问的页面不存在</p>
      <el-button type="primary" @click="goHome"
        >{{ i }}后自动返回首页</el-button
      >
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
let timer = null
const i = ref(5)
const router = useRouter()
onMounted(() => {
  timer = setInterval(() => {
    if (i.value > 0) i.value--
    else goHome()
  }, 1000)
})
const goHome = () => {
  router.push('/')
}
onUnmounted(() => {
  timer && clearInterval(timer)
})

// const msg = computed(() => {
//   console.log(i)
//   return ''
// })
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .container-body {
    width: 100%;
    text-align: center;
    .desc {
      font-size: 14px;
      line-height: 40px;
    }
  }
}
</style>
