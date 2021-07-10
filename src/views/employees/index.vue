<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show="true">
        <template v-slot:before>
          <span> 有{{ page.total }}记录 </span>
        </template>
        <template v-slot:after>
          <el-button
            type="success"
            size="small"
            icon="el-icon-folder-opened"
            @click="exportExcel"
          >
            excel导出
          </el-button>
          <el-button
            icon="el-icon-folder-add"
            type="warning"
            size="small"
            @click="$router.push('/import')"
          >excel导入</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="addEmployee"
          >新增员工</el-button>
        </template>
      </page-tools>
      <el-table border :data="list" style="width: 100%">
        <!-- 序号 -->
        <el-table-column
          label="序号"
          sortable
          type="index"
          width="100"
          align="center"
        />
        <!-- 姓名 -->
        <el-table-column
          label="姓名"
          sortable
          prop="username"
          width="140"
          align="center"
        />
        <el-table-column label="头像" align="center" width="140">
          <template slot-scope="{ row }">
            <img
              v-imageerror="defaultImg"
              :src="row.staffPhoto"
              style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
              @click="showQrCode(row.staffPhoto)"
            >
          </template>
        </el-table-column>
        <!-- 手机号 -->
        <el-table-column
          label="手机号"
          sortable
          prop="mobile"
          width="200"
          align="center"
        />
        <!-- 工号 -->
        <el-table-column
          label="工号"
          sortable
          prop="workNumber"
          width="100"
          align="center"
        />
        <!-- 聘用形式 -->
        <el-table-column
          label="聘用形式"
          sortable
          prop="formOfEmployment"
          width="120"
          align="center"
          :formatter="formatEmployment"
        />
        <!-- 部门 -->
        <el-table-column
          label="部门"
          sortable
          prop="departmentName"
          width="120"
          align="center"
        />
        <el-table-column label="入职时间" sortable width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="账户状态"
          sortable
          width="120"
          align="center"
          prop="enableState"
        >\
          <template slot-scope="scope">
            {{ scope.row.enableState === 1 ? '可用' : '不可用' }}
          </template>
        </el-table-column>
        <el-table-column label="是否在职" sortable width="120" align="center">
          <template slot-scope="{ row }">
            {{ row.inServiceStatus ? '在职' : '离职' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          sortable
          fixed="right"
          width="280"
          align="center"
        >
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/employees/details/${row.id}`)"
            >查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button
              type="text"
              size="small"
              @click="assignRole(row.id)"
            >角色</el-button>
            <el-button
              type="text"
              size="small"
              @click="delEmployee(row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end" style="height:60px" align="middle">
        <el-pagination
          layout="prev, pager, next"
          :page-size="page.size"
          :current-page="page.page"
          :total="page.total"
          @current-change="changePage"
        />
      </el-row>
      <add-employee
        :dialog-visible.sync="dialogVisible"
        @addEmployee="getEmployeesList"
      />
      <assign-role
        :id.sync="id"
        ref="assignRole"
        :dialog-visible.sync="roleVisible"
      />
      <el-dialog
        title="二维码"
        :visible.sync="showCodeDialog"
        @close="imgUrl = ''"
      >
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getEmployeesList, delEmployee } from '@/api/employees'
// import EmployeeEnum from '@/api/constant/employees'
import addEmployee from './components/addEmployee.vue'
import assignRole from './components/assignRole.vue'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'

export default {
  components: {
    addEmployee,
    assignRole
  },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      dialogVisible: false,
      roleVisible: false,
      id: '',
      showCodeDialog: false,
      defaultImg: require('@/assets/common/bigUserHeader.png')
    }
  },
  async created() {
    this.getEmployeesList()
  },
  methods: {
    async getEmployeesList() {
      const res = await getEmployeesList(this.page)
      this.page.total = res.total
      this.list = res.rows
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeesList()
    },
    // 处理聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = { 1: '正式', 2: '非正式' }
      return obj[cellValue] || '未知'
    },
    async delEmployee(id) {
      await delEmployee(id)
      this.$message('删除成功')
      this.getEmployeesList()
    },
    addEmployee() {
      this.dialogVisible = true
    },
    async assignRole(id) {
      this.id = id
      await this.$refs.assignRole.getEmployee(id)
      this.roleVisible = true
    },
    exportExcel() {
      import('@/vendor/Export2Excel').then(async excel => {
        const headers = {
          手机号: 'mobile',
          姓名: 'username',
          入职日期: 'timeOfEntry',
          聘用形式: 'formOfEmployment',
          转正日期: 'correctionTime',
          工号: 'workNumber',
          部门: 'departmentName'
        }
        const { rows } = await getEmployeesList({
          page: 1,
          size: this.page.total
        })
        const data = this.formatJosn(headers, rows)
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data
        })
      })
    },
    formatJosn(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (
            headers[key] === 'timeOfEntry' ||
            headers[key] === 'correctionTime'
          ) {
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = { 1: '正式', 2: '非正式' }
            return obj[item[headers[key]]] || '未知'
          }
          return item[headers[key]]
        })
      })
    },
    showQrCode(url) {
      if (url) {
        this.showCodeDialog = true // 数据更新了 但是页面的渲染是异步
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url) // 将地址转化成二维码
        })
      } else {
        this.$message.warning('该用户还未上传头像')
      }
    }
  }
}
</script>

<style></style>
