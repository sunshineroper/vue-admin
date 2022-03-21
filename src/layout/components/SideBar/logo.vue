<template>
  <div v-if="!isCollapse" class="logo">
    <h1>Logo占位</h1>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const isCollapse = computed(() => store.getters['user/getCollapse'])
</script>
<style scoped lang="scss">
.logo {
  width: 210px;
  height: 86px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #122150;
  color: #fff;
  img {
    width: 86px;
  }
}
</style>
