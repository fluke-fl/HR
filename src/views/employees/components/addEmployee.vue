<template>
  <el-dialog
    title="添加员工"
    :visible="dialogVisible"
    width="600px"
    @close="cancel"
  >
    <el-form
      ref="ruleForm"
      label-width="120px"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="ruleForm.username"
          style="width:400px"
          placeholder="1-15字符"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="ruleForm.mobile"
          style="width:320px"
          placeholder="输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="ruleForm.timeOfEntry"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
        />
      </el-form-item>
      <el-form-item label="聘用形式">
        <el-select
          v-model="ruleForm.formOfEmployment"
          placeholder="请选择"
          style="width:200px"
        >
          <el-option label="正式" value="1" />
          <el-option label="非正式" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="ruleForm.workNumber"
          style="width:400px"
          placeholder="1-20字符"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="ruleForm.departmentName"
          style="width:280px"
          placeholder="请选择"
          @focus="showDepts"
        />
        <el-tree
          v-if="showList"
          v-clickoutside="hiddenDepts"
          class="el-card"
          :data="depts"
          :props="defaultProps"
          default-expand-all
          @node-click="handle"
          @current-change="hiddenDepts"
        />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-button type="primary" @click="btnOk('ruleForm')">提 交</el-button>
      <el-button @click="cancel">取 消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartmentList } from '@/api/departments'
import { listToTree } from '@/utils'
import { addEmployee } from '@/api/employees'
import Clickoutside from 'element-ui/src/utils/clickoutside'
// import { getEmployeesList } from '@/api/employees'

export default {
  directives: { Clickoutside },
  props: {
    dialogVisible: {
      require: true,
      type: Boolean
    }
  },
  data() {
    const mobileCheck = (rule, value, callback) => {
      const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
      reg.test(value) ? callback() : callback(new Error(`手机号格式不正确`))
    }
    // const workNumberCheck = async(rule, value, callback) => {
    //   const { rows } = await getEmployeesList()
    //   const isRepeat = rows.some(item => item.workNumber === value)
    //   isRepeat
    //     ? callback(new Error(`已有与${value}相同工号的员工`))
    //     : callback()
    // }
    return {
      depts: [],
      defaultProps: {
        label: 'name'
      },
      showList: false,
      ruleForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        timeOfEntry: '',
        departmentName: ''
      },
      rules: {
        username: [
          { required: true, message: '请输姓名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输手机号', trigger: 'blur' },
          { validator: mobileCheck, trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '请输员工工号', trigger: 'blur' }
          // { validator: workNumberCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('update:dialog-visible', false)
      this.$refs['ruleForm'].resetFields()
    },
    btnOk(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log(this.ruleForm)
          await addEmployee(this.ruleForm)
          this.$message('添加成功!')
          this.$emit('addEmployee')
          // 关闭dialog重置表单
          this.$emit('update:dialog-visible', false)
          this.$refs['ruleForm'].resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async showDepts() {
      const res = await getDepartmentList()
      this.showList = true
      this.depts = listToTree(res.depts, '')
    },
    hiddenDepts() {
      this.showList = false
    },
    handle(data) {
      this.ruleForm.departmentName = data.name
      this.showList = false
    }
  }
}
</script>

<style scoped>
.el-card {
  width: 280px;
  position: absolute;
  z-index: 22;
}
</style>
