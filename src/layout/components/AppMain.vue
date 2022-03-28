<template>
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
}
</style>
