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
              <el-button size="small" type="success">分配权限</el-button>
              <el-button size="small" type="primary">编辑</el-button>
              <el-button size="small" type="danger">删除</el-button>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>

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
    <add-role :dialog-visible.sync="dialogVisible" @refreshList="getRoleList" />
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
import { getRoleList } from '@/api/setting'
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
      dialogVisible: false
    }
  },

  mounted() {
    this.getRoleList()
  },

  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { total, rows } = await getRoleList(this.page)
        this.total = total
        this.roleList = rows
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    addRole() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
