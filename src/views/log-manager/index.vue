<template>
  <el-card class="headerAactions">
    <div class="flex justify-between">
      <div class="flex">
        <el-input
          class="w-2/5 mr-4"
          v-model="keyWord"
          size="medium"
          clearable
          placeholder="请输入查询的内容"
          :suffix-icon="Search"
          @blur="throttleOnkeyWordBlur"
        />
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :shortcuts="shortcuts"
          size="medium"
          placeholder="Select date and time"
          @change="onDateChange"
        />
      </div>

      <div>
        <el-tooltip content="全屏显示">
          <el-button :icon="FullScreen" plain circle />
        </el-tooltip>
        <el-tooltip content="刷新页面">
          <el-button
            :icon="Refresh"
            type="primary"
            plain
            circle
            @click="getAllLogs"
            :loading="loading"
          />
        </el-tooltip>
      </div>
    </div>
  </el-card>
  <el-card>
    <el-table :data="logList" border v-loading="loading">
      <el-table-column label="操作信息" prop="message"></el-table-column>
      <el-table-column label="操作用户" prop="username"></el-table-column>
      <el-table-column label="请求状态" prop="status_code" align="center">
        <template #default="{ row }">
          <el-tag size="mini" :type="statusCodeType(row.status_code)">{{
            row.status_code
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="请求方式" prop="method" align="center">
        <template #default="{ row }">
          <el-tag size="mini" :type="methodCodeType(row.method)">{{
            row.method
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="请求路径" prop="path"></el-table-column>
      <el-table-column label="是否需要授权" prop="permission" width="120"
        ><template #default="{ row }">
          <div class="flex justify-center">
            <svg-icon
              width="24px"
              height="24px"
              :icon="row.permission ? 'check' : 'close'"
              :color="row.permission ? '#67c23a' : '#f56c6c'"
            ></svg-icon>
          </div> </template
      ></el-table-column>
      <el-table-column label="请求时间" prop="create_date">
        <template #default="{ row }">
          {{ $filters.dataFilter(row.create_date) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-end">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageCount"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 20, 30]"
      ></el-pagination>
    </div>
  </el-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { Refresh, FullScreen, Search } from '@element-plus/icons'
import Utils from '@/utils/utils'
import logApi from '@/api/log'
const loading = ref(false)
const logList = ref([])
const pageCount = ref(10) // 每页显示的条数
const totalCount = ref(0) // 总条数
const currentPage = ref(1) // 当前页数
const time = ref([])
const keyWord = ref('')
const throttleOnkeyWordBlur = ref(null)
const statusCodeType = (code) => {
  if (code >= 200 && code <= 300) return 'success'
  else if (code >= 400 && code <= 500) return 'warning'
  else if (code >= 500) return 'danger'
  else return 'info'
}
const methodCodeType = (method) => {
  if (method === 'DELETE') return 'danger'
  else if (method === 'GET' && method === 'PUT') return 'success'
  else return 'info'
}
const shortcuts = [
  {
    text: '最新一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '上个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]
const onDateChange = async (val) => {
  const [start, end] = val
  await getSearchLogs(keyWord.value.trim(), start, end)
}

const onkeyWordBlur = async () => {
  await getSearchLogs(keyWord.value.trim())
}

const getSearchLogs = async (keyword, start, end) => {
  const { rows, total } = await logApi.searhLogs(keyword, start, end)
  logList.value = rows
  totalCount.value = total
}
const getAllLogs = async () => {
  try {
    loading.value = true
    const { rows, total } = await logApi.getAllLogs(
      pageCount.value,
      currentPage.value - 1
    )
    logList.value = rows
    totalCount.value = total
    loading.value = false
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}
// 页数改变时触发
const handleCurrentChange = async (currentChange) => {
  currentPage.value = currentChange
  await getAllLogs()
}
// 每页条数改变时触发
const handleSizeChange = async (currentSize) => {
  pageCount.value = currentSize
  await getAllLogs()
}
onMounted(async () => {
  await getAllLogs()
  // 搜索开启节流
  throttleOnkeyWordBlur.value = Utils._throttle(onkeyWordBlur, 3000)
})
</script>
<style lang="scss" scoped></style>
