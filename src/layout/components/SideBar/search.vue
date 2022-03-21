<template>
  <div class="showSiderbarSearch" v-if="!showSidebarSearch">
    <div class="search-container" @click="toSearch" v-if="!showSearchList">
      <svg-icon icon="search" class="search-icon"></svg-icon>
    </div>
    <div class="search" v-else>
      <el-select
        v-model="sideName"
        filterable
        remote
        clearable
        reserve-keyword
        placeholder="请输入搜索关键字"
        :remote-method="querySearchAsync"
        :loading="loading"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- <el-autocomplete v-model="sideName" :fetch-suggestions="querySearchAsync" placeholder="请输入关键字" /> -->
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const showSearchList = ref(false)
const sideName = ref('')
const loading = ref(false)
const options = ref([])
const list = ref([])
const store = useStore()
const route = useRouter()
const sideBarList = store.getters.slidebarList
const showSidebarSearch = computed(() => store.getters['user/getCollapse'])
onMounted(() => {
  initOptions(sideBarList)
})
watch(sideName, (value) => {
  const item = list.value.find((item) => item.value === value)
  if (item) {
    route.push({ path: item.path })
    options.value = []
  }
})
const initOptions = (sideBarList) => {
  const groups = []
  deepTrevel(sideBarList, (item) => {
    groups.push(item)
  })
  list.value = groups.map((item) => ({
    label: item.title,
    value: item.title,
    path: item.path
  }))
}
const querySearchAsync = (queryString) => {
  if (queryString) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      deepTrevel(sideBarList, (item) => {
        options.value = list.value.filter((item) => {
          return item.value.includes(queryString)
        })
      })
    }, 200)
  } else {
    options.value = []
  }
}
const deepTrevel = (config, func) => {
  if (Array.isArray(config)) {
    config.forEach((item) => {
      deepTrevel(item, func)
    })
  } else if (config.children && config.children.length > 0) {
    config.children.forEach((item) => {
      deepTrevel(item, func)
    })
  } else {
    func(config)
  }
}
const toSearch = () => {
  showSearchList.value = true
}
</script>
<style lang="scss" scoped>
.search-container {
  position: relative;
  width: 80%;
  height: 35px;
  margin: 10px auto;
  background: transparent;
  border-bottom: 1px solid #ccc;
  margin-top: 10px 0;
  .search-icon {
    position: absolute;
    left: 0;
    bottom: 8px;
    color: rgb(15, 15, 15);
  }
}
.search {
  width: 80%;
  margin: 0 auto;
}
</style>
