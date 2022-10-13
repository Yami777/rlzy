<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="登录账户设置" name="first">
            <!-- 放置表单 -->
            <el-form
              ref="form"
              :model="accountInfo"
              :rules="rules"
              label-width="120px"
              style="margin-left: 120px; margin-top:30px"
            >
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="accountInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="accountInfo.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployees">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <user-info />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">
            <job-info />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import Cookies from 'js-cookie'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码至少6位', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserDetail()
  },
  methods: {
    async  getUserDetail() {
      const res = await getUserDetailById(this.$route.params.id)
      this.accountInfo = res
    },
    async updateEmployees() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.accountInfo)
        this.$message.success('更新成功')
      } catch (err) {
        console.log(err)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }

  }
}
</script>

<style>

</style>
