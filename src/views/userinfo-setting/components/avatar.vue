<template>
  <el-dialog  width="60%" :model-value="modelValue" title="修改用户头像" @close="close">
    <template #default>
      <div class="flex items-center ">
        <div class="w-80 h-80 flex flex-col flex-1">
           <img :src="cropperURL" class="flex-1"  ref="img">

        </div>
        <div class=" shadow-md w-44 h-44 rounded-full overflow-hidden ml-8 flex items-center justify-center">
          <img :src="previewURL ? previewURL : cropperURL" class="min-w-full min-h-full" alt="">
        </div>
      </div>
       <div class="mt-4">
             <el-tooltip content="选择图片">
              <el-button type="primary" @click="onChangeFile" :icon="UploadFilled">选择图片</el-button>
             </el-tooltip>
             <el-tooltip content="正向旋转">
              <el-button type="primary" @click="onDegRight" :icon="RefreshRight"  />
             </el-tooltip>
             <el-tooltip content="反向旋转">
              <el-button type="primary" @click="onDegLeft" :icon="RefreshLeft"  />
             </el-tooltip>
             <el-tooltip content="还原">
               <el-button type="primary" @click="reset" :icon="Refresh"></el-button>
             </el-tooltip>
           </div>
    </template>
    <template #footer>
      <el-button @click="close">关闭</el-button>
      <el-button type="primary" @click="onConfirm" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
  <input-file  ref="fileInput" :onSuccess="onSuccess"/>
</template>

<script setup>
import Cropper from 'cropperjs'
import { nextTick } from 'process'
import { defineProps, defineEmits, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { post } from '@/utils/request'
import InputFile from './inputFile'
import User from '@/api/user'
import { ElMessage } from 'element-plus'
import { UploadFilled, RefreshLeft, RefreshRight, Refresh } from '@element-plus/icons'
const store = useStore()
const loading = ref(false)
const currentUser = computed(() => store.getters['user/getUser'])
const img = ref(null)
const previewURL = ref('')
const fileInput = ref('')
let cropper
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  cropperURL: {
    type: String,
    default: ''
  }
})
const initCropper = (ref) => {
  cropper = new Cropper(ref, {
  })
}

const close = () => {
  emits('update:modelValue')
}

const getDataURL = () => {
  previewURL.value = cropper.getCroppedCanvas().toDataURL(() => {})
}
const onConfirm = (options = {}) => {
  cropper.getCroppedCanvas().toBlob(async (blob) => {
  try {
    loading.value = true
    const file = new File([blob], 'avatar.jpeg', { type: 'image/jpeg' })
    const [resFile] = await post('cms/file', { file_0: file })
    const { code, message } = await User.updateUser(currentUser.value.id, { avatar: resFile.path })
    const user = await User.getPermissions()
    store.dispatch('user/setUserAndUpdate', user)
    if (code < 100) {
      ElMessage.success(message)
    }
    loading.value = false
    close()
  } catch (error) {
    loading.value = false
    console.log(error)
  }
  })
}
const onSuccess = (localSrc) => {
   if (img.value && cropper) {
    console.log(localSrc)
    cropper.replace(localSrc)
  }
}
const onDegRight = () => {
  let deg = 0
  if (deg >= 270) deg = 0
  deg += 90
  cropper.rotate(deg)
  getDataURL()
}
const onDegLeft = () => {
  let deg = 0
  if (deg <= 270) deg = 0
  deg -= 90
  cropper.rotate(deg)
  getDataURL()
}
const reset = () => {
  cropper.reset()
}
const onChangeFile = () => {
  fileInput.value.click()
}
watch(() => props.modelValue, (val) => {
  if (val) {
    nextTick(() => {
    if (img.value) {
        initCropper(img.value)
        // cropper.replace(props.cropperURL.value)
       img.value.addEventListener('cropend', () => {
        getDataURL()
      })
    }
  })
  } else {
    img.value && cropper && cropper.destroy()
  }
})
</script>

<style lang='scss' scoped></style>
