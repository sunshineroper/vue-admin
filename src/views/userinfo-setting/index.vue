<template>
  <el-card>
    <el-tabs tab-position="left">
      <el-tab-pane label="基本设置">
        <div class="w-20 h-20  rounded-full relative flex justify-center items-center mask ">
          <img :src="currentUserAvatar"  alt="" class="w-20 h-20 rounded-full absolute top-0 bottom-0">
          <svg-icon  @click="onClick" icon="plus" color="#fff" class="plus text-center bg-white-800 text-2xl absolute opacity-0"></svg-icon>
          <input type="file" class="hidden" @change="onChangeFile" ref="fileInput"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="安全设置">账号设置</el-tab-pane>
      <el-tab-pane label="第三方账号绑定">第三方账号绑定</el-tab-pane>
  </el-tabs>
  <avatar-cropper v-model="avatarCropperVisible" :cropperURL="cropperURL"></avatar-cropper>

  </el-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import avatarCropper from './components/avatar'
const store = useStore()
const currentUser = computed(() => store.getters['user/getUser'])
const currentUserAvatar = computed(() => `http://localhost:4000/upload/${currentUser.value.avatar}`)
const fileInput = ref(null)
const avatarCropperVisible = ref(false)
let image
const cropperURL = ref('')

const onClick = () => {
  fileInput.value.click()
}
const clearFileInputVal = () => {
  fileInput.value && (fileInput.value.value = '')
  image = null
}

const onChangeFile = (e) => {
  const file = e.target.files[0]
  const localUrl = window.URL.createObjectURL(file)
  image = new Image()
  image.src = localUrl
  image.onload = () => {
    if (image.height < 80) {
      ElMessage.error('图片宽度不能少于80')
      clearFileInputVal()
      return
    }
    if (image.width < 80) {
      ElMessage.error('图片宽度不能少于80')
      clearFileInputVal()
    }
    avatarCropperVisible.value = true
    cropperURL.value = localUrl
  }
  image.onerror = () => {
    ElMessage.error('图片加载失败')
  }
}
</script>

<style lang='scss' scoped>
.mask:hover {
  //  background: rgba(0,0,0, .1);
  .plus {
    cursor: pointer;
    z-index: 0;
    opacity: 1;
  }
}
</style>
