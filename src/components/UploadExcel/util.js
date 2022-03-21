import * as XLSX from 'xlsx'
export const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r /* 从第一行开始 */
  /* 按列进行数据遍历 */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* 查找第一行中的单元格 */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]

    let hdr = 'UNKNOWN ' + C // <-- 进行默认值设置
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)

    headers.push(hdr)
  }
  return headers
}

export const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
