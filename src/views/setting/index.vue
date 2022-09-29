<template>
  <div class="app-container">
    <el-card shadow="always">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row>
            <el-button
              type="primary"
              style="margin-left:10px"
              icon="el-icon-plus"
              size="small"
              @click="addRole"
            >新增角色</el-button>
          </el-row>

          <el-table
            v-loading="loading"
            style="width: 100%"
            :data="roleList"
          >
            <el-table-column
              label="序号"
              width="120"
              type="index"
            />
            <el-table-column
              label="角色名称"
              width="240"
              prop="name"
            />
            <el-table-column
              label="描述"
              prop="description"
            />
            <el-table-column
              label="操作"
              width="240"
            >
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRow(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

      </el-tabs>
      <!-- 分页组件 -->
      <el-row
        v-if="total>0"
        :gutter="10"
        type="flex"
        style="height:60px"
        justify="center"
        align="middle"
      >
        <el-pagination
          background
          layout="prev, pager, next,sizes"
          :total="total"
          :current-page.sync="page.page"
          :page-size.sync="page.pagesize"
          :page-sizes="[2,5,10,15]"
          @current-change="getRoleList"
          @size-change="getRoleList"
        />
      </el-row>
    </el-card>
    <add-role ref="addRole" :dialog-visible.sync="dialogVisible" @refreshList="getRoleList" />
  </div>
</template>

// background
// 添加背景
// current-page当前的页面
// page-size
// 每一页展示的条数
// page-sizes
// 每页显示个数选择器的选项设置
// total
// 总共多少条数据
// layout
// 布局
// current-change改变当前页码的触发(current.-page值改变的时候触发】
// size-change改变页面的数据条数的时候触发(page-size值改变的时候触发)

<script>
import addRole from './components/addRole.vue'
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  name: 'HrsaasIndex',
  components: {
    addRole
  },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      roleList: [],
      loading: false,
      dialogVisible: false,
      companyInfo: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },

  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { total, rows } = await getRoleList(this.page)
        this.total = total
        this.roleList = rows
        if (total > 0 && rows.length === 0) {
          --this.page.page
          this.getRoleList()
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    // 添加角色
    addRole() {
      this.dialogVisible = true
    },
    // 编辑角色
    editRole(row) {
      this.$refs.addRole.formData = { ...row }
      this.dialogVisible = true
    },
    // 删除角色
    async  delRow(id) {
      try {
        await this.$confirm('确定删除该角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 调用删除接口
        await deleteRole(id)
        this.$message.success('删除成功')
        // 刷新列表
        this.getRoleList()
      } catch (e) {
        console.log(e)
      }
    },
    // 获取公司信息
    async  getCompanyInfo() {
      this.companyInfo = await getCompanyInfo(this.companyId)
      // console.log(this.companyInfo)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
