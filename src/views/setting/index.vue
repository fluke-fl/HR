<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card style="padding:30px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              style="margin-top:30px;margin-bottom:8px;"
              @click="addRole"
            >添加角色</el-button>
            <el-table style="width: 100%" border :data="rolesList">
              <el-table-column
                type="index"
                label="序号"
                width="80"
                align="center"
              />
              <el-table-column
                prop="name"
                label="角色名"
                width="180"
                sortable
                align="center"
              />
              <el-table-column label="描述" prop="description" sortable />
              <el-table-column label="操作" width="240" align="center">
                <template slot-scope="{ row }">
                  <el-button
                    type="success"
                    size="mini"
                    @click="assignPerm(row.id)"
                  >分配权限</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="editRole(row)"
                  >修改</el-button>
                  <el-button
                    type="warning"
                    size="mini"
                    @click="delRole(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row
              type="flex"
              justify="end"
              style="height:60px"
              align="middle"
            >
              <el-pagination
                layout="total,prev, pager, next"
                :page-size="page.pagesize"
                :current-page="page.page"
                :total="page.total"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <!-- 公司信息 -->
          <el-tab-pane label="公司信息" name="second">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input
                  style="width:400px"
                  disabled
                  :value="companyInfo.name"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  style="width:400px"
                  disabled
                  :value="companyInfo.companyAddress"
                />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input
                  style="width:400px"
                  disabled
                  :value="companyInfo.companyPhone"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  style="width:400px"
                  disabled
                  :value="companyInfo.mailbox"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  style="width:400px"
                  disabled
                  :value="companyInfo.remarks"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 弹出层 -->
        <!-- 添加角色弹出层 -->
        <add-role
          :dialog-visible.sync="dialogVisible"
          :node.sync="node"
          :is-add="isAdd"
          @addRole="getRolesList"
        />
        <!-- 分配权限弹出层 -->
        <el-dialog title="分配权限" :visible="showDialog" @close="cancel">
          <el-tree
            ref="tree"
            :data="permList"
            :props="{ label: 'name' }"
            show-checkbox
            default-expand-all
            :check-strictly="true"
            node-key="id"
            :default-checked-keys="permIds"
          />
          <el-row slot="footer" type="flex" justify="center">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="btnOk">确 定</el-button>
          </el-row>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRolesList, delRole, getRoleDetail, assignPerm } from '@/api/roles'
import { getCompanyInfo } from '@/api/company'
import addRole from './components/addRole.vue'
import { listToTree } from '@/utils'
import { getPermission } from '@/api/permission'
export default {
  components: {
    addRole
  },
  data() {
    return {
      activeName: 'first',
      rolesList: [],
      companyInfo: {},
      dialogVisible: false,
      showDialog: false,
      permId: null,
      permIds: [],
      roleDetail: {},
      node: null,
      isAdd: true,
      permList: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRolesList()
    this.getCompanyInfo()
  },
  methods: {
    addRole() {
      this.dialogVisible = true
      this.isAdd = true
      this.getRolesList()
    },
    delRole(id) {
      this.$confirm('是否继续删除该条数据?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delRole(id)
        this.getRolesList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    editRole(obj) {
      this.dialogVisible = true
      this.node = obj
      this.isAdd = false
    },
    async getRolesList() {
      const res = await getRolesList(this.page)
      this.rolesList = res.rows
      this.page.total = res.total
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRolesList()
    },
    async getCompanyInfo() {
      this.companyInfo = await getCompanyInfo(this.companyId)
      // console.log(this.companyInfo)
    },
    async assignPerm(id) {
      this.permId = id
      this.permList = listToTree(await getPermission(), '0')
      this.roleDetail = await getRoleDetail(id)
      this.permIds = this.roleDetail.permIds
      this.showDialog = true
    },
    cancel() {
      this.permIds = []
      this.showDialog = false
    },
    async btnOk() {
      await assignPerm({
        ...this.roleDetail,
        permIds: this.$refs.tree.getCheckedKeys()
      })
      this.showDialog = false
      this.$message('分配权限成功')
      console.log({
        ...this.roleDetail,
        permIds: this.$refs.tree.getCheckedKeys()
      })
    }
  }
}
</script>

<style></style>
