<template>
  <div class="breadcrumb-container">
    <transition-group>
      <div class="item" v-for="item in titleArr" :key="item.title">
        <p>{{ item }}</p>
      </div>
    </transition-group>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const stageinfo = computed(() => {
  return store.getters['user/getStageInfo'](router.currentRoute.value.name)
})
const titleArr = computed(() => {
  return stageinfo.value.map((item) => item.title).filter((item) => !!item)
})
</script>
<style lang="scss" scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  font-size: 14px;
  .item {
    display: flex;
    align-items: center;
    position: relative;
    padding-right: 16px;
    color: rgb(102, 102, 102);
    cursor: pointer;
    &::after {
      content: '/';
      position: absolute;
      top: 2px;
      right: 6px;
    }
  }
  .item:last-child {
    color: rgb(57, 99, 188);
    padding-right: 0;
    &::after {
      content: 0;
    }
  }
}
</style>
