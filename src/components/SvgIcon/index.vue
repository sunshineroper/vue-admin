<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-cion svg-external-icon"
    :class="className"
  ></div>
  <svg
    v-else
    class="svg-icon"
    :style="{ width, height }"
    :class="className"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { isExternal as external } from '@/utils/validate'
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '1.2em'
  },
  height: {
    type: String,
    default: '1.2em'
  },
  color: {
    type: String,
    default: ''
  }
})
const isExternal = computed(() => external(props.icon))

// 外部样式
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`
}))

// 内部图标
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: -0.15rem;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  display: inline-block;
  mask-size: cover !important;
}
</style>
