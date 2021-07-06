<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools
          :tree-nodes="company"
          :is-root="true"
          @addDepts="addDepts"
        />
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <tree-tools
            slot-scope="{ data }"
            :tree-nodes="data"
            @delDepts="getList"
            @addDepts="addDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- .sync是子组件触发父组件事件的语法糖
    子组件触发的固定语法this.$emit('update:父组件传递的props名',传递的值) -->
    <add-depts
      :dialog-visible.sync="dialogVisible"
      :tree-node="node"
      :is-add="isAdd"
      @addDepts="getList"
    />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import addDepts from './components/addDepts.vue'
import { getDepartmentList } from '@/api/departments'
import { listToTree } from '@/utils'
export default {
  components: {
    TreeTools,
    addDepts
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      dialogVisible: false,
      node: null,
      isAdd: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getDepartmentList()
      this.company = { name: res.companyName, manager: '负责人', id: '' }
      this.departs = listToTree(res.depts, '')
    },
    addDepts(node, bool) {
      this.dialogVisible = true
      this.node = node
      this.isAdd = bool
      // if(!isAdd){
      // }
      this.getList()
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
