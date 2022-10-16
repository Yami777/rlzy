<template>
  <div>
    <el-dialog
      title="角色分配"
      :visible="dialogVisibleSetRole"
      width="900px"
      :before-close="handlerClose"
      @open="OnOpen"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handlerClose">取 消</el-button>
        <el-button type="primary" @click="saveEmployeesRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles } from '@/api/roles'
import { getUserDetailById, setEmployeesRoles } from '@/api/user'
export default {
  name: 'RoleDetail',
  props: {
    dialogVisibleSetRole: {
      type: Boolean,
      required: true
    },
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  methods: {
    handlerClose() {
      this.$emit('update:dialogVisibleSetRole', false)
    },
    async  OnOpen() {
      const { rows } = await getRoles()
      this.roles = rows
      this.getEmployeesRoles()
    },
    async getEmployeesRoles() {
      const { roleIds } = await getUserDetailById(this.userId)
      // console.log(roleIds)
      this.checkList = roleIds || []
    },
    async   saveEmployeesRoles() {
      if (!this.checkList.length) return this.$message.error('请勾选角色')
      try {
        await setEmployeesRoles({ id: this.userId, roleIds: this.checkList })
        this.$message.success('分配成功')
        this.handlerClose()
      } catch (e) {
        this.$message.error('分配失败')
      }
    }
  }
}
</script>

<style>

</style>
