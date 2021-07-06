<template>
  <el-card class="el-card">
    <h2>Excel导入</h2>
    <el-alert
      title="每次导入仅可添加1000名员工，姓名、手机、入职时间、聘用形式为必填项"
      type="warning"
      show-icon
      :closable="false"
    />
    <UploadExcel :on-success="success" />
  </el-card>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  data() {
    return {
      type: this.$route.query.type
    }
  },
  methods: {
    async success({ header, results }) {
      const userRelations = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber'
      }
      const arr = results.map(item => {
        const obj = {}
        Object.keys(item).forEach(key => {
          if (
            userRelations[key] === 'timeOfEntry' ||
            userRelations[key] === 'correctionTime'
          ) {
            obj[userRelations[key]] = new Date(this.formatDate(item[key], '/')) // 只有这样, 才能入库
            return
          }
          obj[userRelations[key]] = item[key]
        })
        return obj
      })
      await importEmployee(arr)
      this.$message('导入成功')
      this.$router.back()
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return (
        year +
        (month < 10 ? '0' + month : month) +
        (date < 10 ? '0' + date : date)
      )
    }
  }
}
</script>

<style scoped>
.el-card {
  margin: 15px;
}
h2 {
  text-align: center;
}
</style>
