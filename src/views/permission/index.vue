<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <page-tools :show="true">
          <template v-slot:before>
            <span> 共{{ permissionList.length }}条数据 </span>
          </template>
          <template v-slot:after>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="showDialog"
            >
              添加菜单
            </el-button>
          </template>
        </page-tools>
        <el-table :data="permissionList" row-key="id">
          <el-table-column label="菜单名称" prop="name" width="180">
            <template slot-scope="scope">
              <i class="el-icon-folder-opened" style="font-size:16px" />
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="权限标识" prop="code" width="220" />
          <el-table-column label="描述" prop="description" width="220" />
          <el-table-column label="操作" width="400">
            <template slot-scope="{ row }">
              <el-button
                v-if="row.type === 1"
                type="text"
                size="small"
                @click="showDialog1(row)"
              >添加权限点</el-button>
              <el-button type="text" size="small">查看api权限</el-button>
              <el-button
                type="text"
                size="small"
                @click="editPermission(row)"
              >查看</el-button>
              <el-button
                type="text"
                size="small"
                @click="delPermission(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <addPermission
          :dialog-visible.sync="dialogVisible"
          :node="node"
          :is-see.sync="isSee"
          :is-add.sync="isAdd"
          @addPermission="getPermission"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPermission, delPermission } from '@/api/permission'
import addPermission from './components/addPermission.vue'
import { listToTree } from '@/utils'
export default {
  components: {
    addPermission
  },
  data() {
    return {
      permissionList: [],
      dialogVisible: false,
      node: null,
      isSee: true,
      isAdd: true
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    async getPermission() {
      this.permissionList = listToTree(await getPermission(), '0')
      // console.log(this.permissionList)
    },
    showDialog() {
      this.dialogVisible = true
      this.isAdd = true
    },
    showDialog1(node) {
      this.isSee = false
      this.node = node
      this.isAdd = true
      this.dialogVisible = true
    },
    editPermission(node) {
      this.dialogVisible = true
      this.isAdd = false
      this.isSee = true
      this.node = node
    },
    async delPermission(id) {
      await delPermission(id)
      this.$message('删除成功')
      this.getPermission()
    }
  }
}
</script>

<style></style>
