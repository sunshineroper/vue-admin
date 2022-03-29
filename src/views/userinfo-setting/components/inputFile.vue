<template>
  <input type="file" @change="onChange" class="hidden" ref="fileInPut"/>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, defineProps } from 'vue'
const fileInPut = ref(null)
const props = defineProps({
  onSuccess: {
    type: Function
  }
})
/* eslint-disable */
const click = () => {
  fileInPut.value.click()
}
const onChange = (e) => {
  const type = ['jpg', 'jpeg', 'png', 'bmp']
  const files = e.target.files
  if (files && files.length <= 0) {
    return
  }
  const file = files[0]
  // 判断文件大小
  if (file.size > 1024 * 1024 * 5) {
    ElMessage.error(`上传的图片不能超过${1024 * 1024 * 5}字节`)
  }
  // 判断文件类型
  const ext = file.name.substring(file.name.indexOf('.') + 1, file.name.length)
  if (!type.includes(ext)) {
    ElMessage.error(`上传的图片类型只能是下列的一种${type.toString()}`)
  }
  const localURL = URL.createObjectURL(file)
  const img = new Image()
  img.src = localURL
  img.onload = () => {
    if (img.width < 80) {
      ElMessage.error('图片的宽度不能小于80')
      clearFileInputVal()
      return
    }
    if (img.height < 80) {
      ElMessage.error('图片的高度不能小于80')
      clearFileInputVal()
    }
    props.onSuccess && props.onSuccess(localURL)
  }
  img.onerror = () => {
    ElMessage.error('图片加载失败')
  }
}
const clearFileInputVal = () => {
  fileInPut.value && (fileInPut.value.value = '')
}
expose({
  click
})
</script>

<style lang='scss' scoped></style>
