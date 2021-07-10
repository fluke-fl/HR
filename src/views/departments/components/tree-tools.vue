<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <!-- 左侧内容 -->
      <svg-icon v-if="isRoot" icon-class="table" />
      <span> {{ treeNodes.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNodes.manager }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="delDepartment">
            <!-- 内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="edit"
                :disabled="!checkPermission('point-dept')"
              >编辑部门</el-dropdown-item>
              <el-dropdown-item
                v-if="!isRoot"
                command="delete"
              >删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartment } from '@/api/departments'
export default {
  props: {
    treeNodes: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    delDepartment(command) {
      if (command === 'add') {
        // 添加
        this.$emit('addDepts', this.treeNodes, true)
      } else if (command === 'edit') {
        // 修改
        this.$emit('addDepts', this.treeNodes)
      } else {
        this.$confirm('确认要删除该项目吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delDepartment(this.treeNodes.id)
          this.$emit('delDepts')
          this.$message('删除成功!')
        })
      }
    }
  }
}
</script>

<style scoped></style>
