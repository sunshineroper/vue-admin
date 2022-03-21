<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload"
        >导入Excel</el-button
      >
    </div>
    <input
      type="file"
      class="excel-upload-input"
      ref="excelUploadInput"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @dragenter.stop.prevent="handleDragenter"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload"></i>
      <div>将文件拖到此处</div>
    </div>
  </div>
</template>
<script setup>
import * as XLSX from 'xlsx'
import { ref, defineProps } from 'vue'
import { getHeaderRow, isExcel } from './util.js'
const loading = ref(false)
const excelUploadInput = ref(null)
const props = defineProps({
  beforeUpload: Function,
  onSuccess: Function
})
const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleDragenter = () => {}
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}
const handleDrop = (e) => {
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) return
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    alert('文件格式不对')
    return
  }
  upload(rawFile)
}
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}
const upload = (rawFile) => {
  excelUploadInput.value.value = null
  if (!props.beforeUpload) {
    return readerData(rawFile)
  }
  const before = props.beforeUpload(rawFile)
  if (before) {
    return readerData(rawFile)
  }
}
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      // 读取sheet1
      const workSheet = workbook.Sheets[firstSheetName]
      // 解析数据表头
      const header = getHeaderRow(workSheet)
      // 解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      generateData({ header, results })
      loading.value = false
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}

const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>
<style scoped lang="scss">
.upload-excel {
  display: flex;
  width: 100%;
  height: 100%;
  .excel-upload-input {
    display: none;
  }
  .btn-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #bbb;
    width: 360px;
    height: 180px;
    box-sizing: border-box;
  }
  .drop {
    border: 1px dashed #bbb;
    width: 360px;
    height: 180px;
    text-align: center;
    box-sizing: border-box;
    position: relative;
    font-weight: 700;
    .el-icon-upload {
      display: block;
      line-height: 60px;
      margin: 40px 0 10px;
    }
  }
}
</style>
