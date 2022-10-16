<template>
  <div>
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="800px"
      @close="handleClose"
      @open="OnOpen"
    >
      <el-tree
        ref="tree"
        :data="permissionsData"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        :default-checked-keys="defCheckKey"
        node-key="id"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="saveRolePermission">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissions } from '@/api/permissions'
import { tranListToTreeData } from '@/utils'
import { getRolesInfo, setRolePermission } from '@/api/roles'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    roleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      permissionsData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defCheckKey: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    async OnOpen() {
      // 获取所有的权限列表
      const res = await getPermissions()
      // console.log(res)
      this.permissionsData = tranListToTreeData(res, '0')
      this.getRolePermissions()
    },
    async   getRolePermissions() {
      // console.log(this.roleId)
      // 根据角色id获取拥有的权限
      const res = await getRolesInfo(this.roleId)
      // console.log(res)
      this.defCheckKey = res.permIds
    },
    async  saveRolePermission() {
      const id = this.roleId
      const permIds = this.$refs.tree.getCheckedKeys()
      try {
        await setRolePermission({ id, permIds })
        this.$message.success('分配成功')
        this.handleClose()
      } catch {
        this.$message.error('分配失败')
      }
    }
  }
}
</script>

<style>

</style>
