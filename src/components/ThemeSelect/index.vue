<template>
  <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetTheme">
    <el-tooltip content="主题修改">
      <svg-icon icon="change-theme"></svg-icon>
    </el-tooltip>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-menu>
          <el-dropdown-item>主题色更改</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetTheme">
    <div>
      <el-tooltip content="主题修改">
        <svg-icon icon="chnage-theme"></svg-icon>
      </el-tooltip>
    </div>
    <template $dropdwon>
      <el-dropdown-menu>
        <el-dropdown-item>主题色更改</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>-->
  <div></div>
</template>
<script setup>
const handleSetTheme = () => {}
</script>
