<template>
  <el-dialog
    title="分配角色"
    :visible="dialogVisible"
    width="600px"
    @close="cancel"
  >
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-button type="primary" @click="btnOk(roleIds)">提 交</el-button>
      <el-button @click="cancel">取 消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRolesList, assignRole } from '@/api/roles'
import { getEmployee } from '@/api/employees'
export default {
  props: {
    dialogVisible: {
      require: true,
      type: Boolean
    },
    id: {
      require: true,
      type: String,
      default: null
    }
  },
  data() {
    return {
      roleList: [],
      roleIds: []
    }
  },
  async created() {
    this.getRolesList()
  },
  methods: {
    cancel() {
      this.$emit('update:dialog-visible', false)
      this.$emit('update:id', null)
    },
    async btnOk(roleIds) {
      // console.log(roleIds)
      await assignRole({ id: this.id, roleIds })
      this.$message.success('修改成功')
      this.$emit('update:dialog-visible', false)
    },
    async getRolesList() {
      const res = await getRolesList({ pagesize: 100 })
      this.roleList = res.rows
    },
    async getEmployee(id) {
      const { roleIds } = await getEmployee(id)
      this.roleIds = roleIds
    }
  }
}
</script>

<style scoped></style>
