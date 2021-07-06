<template>
  <el-dialog
    :title="showText + '权限'"
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
      <el-form-item label="权限名称:" style="width:500px" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="权限标识:" style="width:500px" prop="code">
        <el-input v-model="ruleForm.code" />
      </el-form-item>
      <el-form-item label="权限描述:" style="width:500px" prop="description">
        <el-input v-model="ruleForm.description" />
      </el-form-item>
      <el-form-item label="企业可见:" style="width:500px" prop="enVisible">
        <el-switch
          v-model="ruleForm.enVisible"
          active-text="可见"
          inactive-text="不可见"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
      <!-- <el-form-item label="菜单顺序:" style="width:500px">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="菜单icon:" style="width:500px">
        <el-input v-model="ruleForm.name" />
      </el-form-item> -->
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-button @click="cancel">取 消</el-button>
      <el-button
        type="primary"
        @click="addPermission('ruleForm')"
      >确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addPermission, updataPermission } from '@/api/permission'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    node: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        code: '',
        description: '',
        type: null, // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型
        pid: '', // 因为做的是树 需要知道添加到哪个节点下
        enVisible: '0'
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText() {
      if (!this.node) {
        return this.ruleForm.id ? '编辑' : '新增'
      } else {
        return this.node.id ? '编辑' : '新增'
      }
    }
  },
  updated() {
    this.ruleForm = this.node
  },
  methods: {
    cancel() {
      this.$refs['ruleForm'].resetFields()
      this.$emit('update:dialog-visible', false)
      this.$emit('addPermission')
    },
    addPermission(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.ruleForm.id) {
            await updataPermission(this.ruleForm)
            this.$message('更新成功')
            this.$refs[formName].resetFields()
          } else {
            if (!this.node) {
              await addPermission({ ...this.ruleForm, pid: '0', type: 1 })
            } else {
              // console.log(this.ruleForm)
              await addPermission({
                ...this.ruleForm,
                pid: this.node.id,
                type: 2
              })
            }
            this.$message('添加成功')
            this.$refs[formName].resetFields()
          }
          this.$emit('addPermission')
          this.$emit('update:dialog-visible', false)
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
