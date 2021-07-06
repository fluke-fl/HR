<template>
  <el-dialog
    :title="isAdd ? '新增部门' : '编辑部门'"
    :visible="dialogVisible"
    @close="cancel"
  >
    <el-form
      ref="ruleForm"
      label-width="120px"
      :model="ruleForm"
      :rules="rules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="ruleForm.code"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="ruleForm.manager"
          style="width:30%"
          placeholder="请选择"
          @focus="getUserSimple"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="ruleForm.introduce"
          style="width:80%"
          placeholder="请选择"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button
          type="primary"
          size="small"
          @click="submitForm('ruleForm')"
        >确 定</el-button>
        <el-button size="small" @click="cancel">取 消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  getDepartmentList,
  addDepartmentList,
  editDepartment
} from '@/api/departments'
import { getUserSimple } from '@/api/employees'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartmentList()
      let isRepeat = true
      if (this.isAdd) {
        isRepeat = depts
          .filter(item => item.pid === this.treeNode.id)
          .some(item => item.name === value)
      } else {
        isRepeat = depts
          .filter(
            item =>
              item.pid === this.treeNode.pid && item.id !== this.treeNode.id
          )
          .some(item => item.name === value)
      }
      isRepeat
        ? callback(new Error(`同级下已有与${value}相同名称的部门`))
        : callback()
    }
    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartmentList()
      let isRepeat = true
      if (this.isAdd) {
        isRepeat = depts.some(item => item.code === value && value)
      } else {
        isRepeat = depts
          .filter(item => item.id !== this.treeNode.id)
          .some(item => item.code === value && value)
      }
      isRepeat
        ? callback(new Error(`组织内已有与${value}相同编码`))
        : callback()
    }
    return {
      ruleForm: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur'
          },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur'
          },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 300,
            message: '长度在 1 到 50 个字符',
            trigger: 'blur'
          }
        ]
      },
      options: []
    }
  },
  updated() {
    if (!this.isAdd) {
      this.ruleForm = this.treeNode
    }
  },
  methods: {
    cancel() {
      this.$emit('update:dialog-visible', false)
      this.$refs['ruleForm'].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.isAdd) {
            await addDepartmentList({
              ...this.ruleForm,
              pid: this.treeNode.id
            })
            this.$message('添加成功!')
          } else {
            await editDepartment(this.ruleForm)
            this.$message('编辑成功!')
          }
          this.$emit('addDepts')
          this.$emit('update:dialog-visible', false)
        } else {
          this.$message('表单信息校验未通过!')
          console.log('error submit!!')
          return false
        }
      })
    },
    async getUserSimple() {
      this.options = await getUserSimple()
    }
  }
}
</script>

<style scoped></style>
