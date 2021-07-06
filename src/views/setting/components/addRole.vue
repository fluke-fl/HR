<template>
  <el-dialog
    :title="isAdd ? '新增角色' : '编辑角色'"
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
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="ruleForm.name" width="400px" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="ruleForm.description" width="400px" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="btnOk('ruleForm')">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRole, editRole } from '@/api/roles'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      require: true
    },
    node: {
      type: Object,
      default: null
    },
    isAdd: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      title: '',
      ruleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输角色名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  updated() {
    if (this.node) {
      this.ruleForm = this.node
    }
  },
  methods: {
    cancel() {
      this.$emit('addRole')
      this.$emit('update:dialog-visible', false)
      this.$emit('update:node', null)
      this.$refs['ruleForm'].resetFields()
    },
    btnOk(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log(this.roleForm)
          if (this.roleForm.id) {
            await addRole(this.ruleForm)
          } else {
            await editRole(this.ruleForm)
          }
          this.$emit('addRole')
          this.$message('修改成功!')
          // 关闭dialog重置表单
          this.$emit('update:dialog-visible', false)
          this.$refs['ruleForm'].resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped></style>
