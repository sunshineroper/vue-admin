<template>
  <el-dropdown trigger="click" @command="handleSetLanguage">
    <el-tooltip content="国际化" :effect="effect">
      <svg-icon icon="language"></svg-icon>
    </el-tooltip>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, defineProps } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { ELMessage } from 'element-plus'
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
const store = useStore()
const language = computed(() => store.getters.language)
// const i18n = useI18n()
const handleSetLanguage = (lang) => {
  // i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
  // ELMessage.success('更新成功')
}
</script>
