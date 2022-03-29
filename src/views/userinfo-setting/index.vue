<template>
  <el-card>
    <el-tabs tab-position="left" >
      <el-tab-pane label="基本设置">
        <div class="relative">
           <el-form
            class="w-3/5"
            :model="currentUser"
            ref="form"
            :label-width="120"
          >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="currentUser.username" disabled readonly></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="currentUser.nickname" disabled readonly></el-input>
          </el-form-item>
          <el-form-item label="email" prop="email">
            <el-input v-model="currentUser.email" disabled readonly></el-input>
          </el-form-item>
        </el-form>
        <div class="absolute right-4 top-1/2 -translate-y-1/2">
          <div class="w-24 h-24  overflow-hidden  relative rounded-full flex justify-center items-center mask">
            <img :src="currentUserAvatar"  alt="" class="min-w-full min-h-full absolute top-0 bottom-0">
            <div class="w-full h-full absolute opacity-0 plus flex justify-center items-center"  @click="onClick">
              <svg-icon  icon="plus" color="#fff" class=" text-center text-2xl "></svg-icon>
            </div>
          </div>
        </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="安全设置">安全设置</el-tab-pane>
      <el-tab-pane label="第三方账号绑定">第三方账号绑定</el-tab-pane>
  </el-tabs>
  <input-file :onSuccess="onSuccess" ref="inputFileRef" />
  <avatar-cropper v-model="avatarCropperVisible" :cropperURL="cropperURL"></avatar-cropper>

  </el-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import avatarCropper from './components/avatar'
import InputFile from './components/inputFile'
import config from '@/config'
const store = useStore()
const currentUser = computed(() => store.getters['user/getUser'])
const currentUserAvatar = computed(() => `${config.basePicURL}${currentUser.value.avatar}`)
const inputFileRef = ref(null)
const avatarCropperVisible = ref(false)
const cropperURL = ref('')
const onClick = () => {
  inputFileRef.value.click()
}

const onSuccess = (localUrl) => {
    avatarCropperVisible.value = true
    cropperURL.value = localUrl
}

watch(() => avatarCropperVisible.value, (val) => {
  if (!val) {
    cropperURL.value = ''
  }
})
</script>

<style lang='scss' scoped>
.mask:hover {

  .plus {
    background: rgba(0,0,0, .2);
    cursor: pointer;
    z-index: 0;
    opacity: 1;
  }
}
</style>
