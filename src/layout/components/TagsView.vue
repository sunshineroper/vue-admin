<template>
  <el-scrollbar class="menu-tab" v-if="historiesList.length > 1">
    <div class="menu-tab-container">
      <router-link
        class="menu-item"
        :to="item.path"
        v-for="(item, index) in historiesList"
        :key="item.name"
        :class="item.path === currentPath ? 'active' : ''"
      >
        <svg-icon :icon="tagsIcon(item)" style="margin-right: 2px"></svg-icon>
        <span>{{ tagsTitle(item) }}</span>
        <div class="icon-close" @click.prevent.stop="close(index)">
          <el-icon class="icon"><close-bold /></el-icon>
        </div>
      </router-link>
    </div>
  </el-scrollbar>
</template>
<script setup>
import { computed, watch } from 'vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import emitter from '@/utils/emit'
import { CloseBold } from '@element-plus/icons'
import SvgIcon from '../../components/SvgIcon/index.vue'
const store = useStore()
const route = useRouter()
const stageList = computed(() => store.getters['user/stageList'])
const historiesList = computed(() =>
  store.getters['app/getHistories'](stageList.value)
)
onBeforeRouteUpdate((to, from) => {
  let historysVal = historiesList.value
  const flag = historysVal.find((item) => item.path === to.path)
  if (flag) {
    return
  }
  const ele = {}
  ele.stageId = typeof to.name === 'symbol' ? to.name.description : to.name
  ele.path = to.path
  ele.route = to.matched[to.matched.length - 1].path
  ele.meta = to.meta
  historysVal = [...historysVal, ele]
  store.commit('app/SET_HISTORIES', historysVal)
})
const currentPath = computed(() => {
  return route.currentRoute.value.path
})
const close = (index) => {
  const historysVal = historiesList.value
  if (route.currentRoute.value.path === historysVal[index].path) {
    if (index > 0) {
      route.push(historysVal[index - 1].path)
    } else if (historysVal.length > 1) {
      route.push(historysVal[1].path)
    }
  }
  historysVal.splice(index, 1)
  store.commit('app/SET_HISTORIES', historysVal)
}
const tagsTitle = (item) => {
  if (item.meta && item.meta.title) return item.meta.title
  else return '新的选项卡'
}
const tagsIcon = (item) => {
  if (item.meta && item.meta.icon) return item.meta.icon
  else return 'unorderedlist'
}
watch(
  () => historiesList.value,
  (val) => {
    if (val.length >= 2) {
      emitter.emit('hasTags')
    } else {
      emitter.emit('noTags')
    }
  }
)
</script>
<style lang="scss" scoped>
.menu-tab {
  height: 40px;
  width: 100%;
  .menu-tab-container {
    display: flex;
    flex-direction: row;
    .menu-item {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      width: auto;
      box-sizing: border-box;
      min-width: 126px;
      height: 40px;
      background-color: #fff;
      color: #666;
      font-size: 14px;
      margin-right: 1px;
      .icon-close {
        position: absolute;
        opacity: 0;
      }
      &:hover {
        background: #3963bc;
        color: #fff;
        .icon {
          color: #fff;
        }
        .icon-close {
          width: 18px;
          height: 18px;
          top: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          border-radius: 0 0 0 14px;
          display: inline-block;
          text-align: center;
          .icon {
            transform: scale(0.8);
          }
        }
      }
    }
    .active {
      color: #fff;
      background: #3963bc;
      .icon-close {
        width: 18px;
        height: 18px;
        top: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.3);
        opacity: 1;
        border-radius: 0 0 0 14px;
        display: inline-block;
        text-align: center;
        .icon {
          color: #fff;
          transform: scale(0.8);
        }
      }
    }
  }
}
</style>
