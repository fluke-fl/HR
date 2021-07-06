<template>
  <el-card class="card">
    <el-tabs v-model="activeName">
      <el-tab-pane label="登陆账户设置" name="first">
        <el-form
          ref="ruleForm"
          label-width="120px"
          style="margin-left: 120px; margin-top:30px"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item label="姓名:" prop="username">
            <el-input v-model="ruleForm.username" style="width:300px" />
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              v-model="ruleForm.password"
              style="width:300px"
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updataEmployee">更新</el-button>
            <el-button @click="$router.back()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="个人详情" name="second">
        <personDetails />
      </el-tab-pane>
      <el-tab-pane label="岗位信息" name="third">
        <person-job />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import personDetails from './personDetails.vue'
import personJob from './personJob.vue'
import { getEmployee, updataEmployee } from '@/api/employees'
export default {
  components: {
    personDetails,
    personJob
  },
  data() {
    return {
      activeName: 'first',
      id: this.$route.params.id,
      data: {},
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getEmployee()
  },
  methods: {
    async getEmployee() {
      const res = await getEmployee(this.id)
      this.data = res
      this.ruleForm.username = res.username
      this.ruleForm.password = res.password
    },
    async updataEmployee() {
      await updataEmployee({ ...this.data, ...this.ruleForm })
      this.$message('更新成功')
      // this.getEmployee()
    }
  }
}
</script>

<style scoped>
.card {
  padding: 30px;
}
</style>
