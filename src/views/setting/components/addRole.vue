<template>
  <div>
    <el-dialog
      title="新增角色"
      width="60%"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form
        ref="roleDialogForm"
        label-width="80px"
        :model="formData"
      >
        <el-form-item
          prop="name"
          label="角色"
          :rules="[{
            required:true,
            message:'角色必填',
            trigger:'blur'
          }]"
        >
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" type="textarea" row="3" />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button v-loading="loading" @click="submit">确 定</el-button>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
import { addRole } from '@/api/setting'
export default {
  name: 'AddRole',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()
    },
    async submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        await addRole(this.formData)
        this.$emit('refreshList')
        this.$message.success('新增成功')
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
