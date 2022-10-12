<template>
  <div>
    <page-tools>
      <!--  具名插槽新语法 -->
      <template #before>
        <span>共166条记录</span>
      </template>

      <!-- <template v-slot:before>
        <span>共25条记录</span>
      </template> -->
      <!--作用域插槽  -->
      <!-- <template v-slot="scope">
        <span>共25条记录{{ scope }}</span>
      </template> -->
      <!-- <template v-slot="{}">
        <span>共25条记录{{ }}</span>
      </template> -->
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
      </template>
    </page-tools>

    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{row}">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{ row }">
            <!-- 根据当前状态来确定 是否打开开关 -->
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="goDetail(row)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next, sizes, total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2,5,10]"
          :total="total"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <!-- 新增员工 -->
    <add-employee :dialog-visible.sync="dialogVisible" />
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools'
import { getEmployeeList, delEmployee } from '@/api/employees'
import EnumHireType from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'
// console.log(EnumHireType)
export default {
  name: 'HrsaasIndex',
  components: {
    // PageTools
    AddEmployee
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EnumHireType.hireType,
      dialogVisible: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  mounted() {

  },

  methods: {
    async getEmployeeList() {
      this.loading = true
      try {
        const { rows, total } = await getEmployeeList(this.page)
        // console.log(rows, total)
        this.list = rows
        this.total = total
        if (total > 0 && rows.length === 0) {
          --this.page.page
          this.getEmployeeList()
        }
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellValue, index) {
      // console.log(row, column, cellValue, index)
      const res = this.hireType.find(ele => ele.id === cellValue)
      // console.log(res)
      return res && res.value || '非正式'
    },
    handleEmploy() {
      this.dialogVisible = true
    },
    async  del(val) {
      try {
        await this.$confirm('确定删除该人员吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delEmployee(val.id)
        this.getEmployeeList()
        this.$message.success('删除成功')
      } catch (e) {
        console.log(e)
      }
    },
    async exportExcel() {
      // 文件懒加载，当点击导出的时候再加载依赖，按需导入当做函数使用的时候返回值是一个promise
      const { export_json_to_excel } = await import ('@/vendor/Export2Excel.js')
      const { rows } = await getEmployeeList({ page: 1, size: this.total })
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(headers)
      const data = rows.map(item => {
        return header.map(h => {
          if (h === '聘用形式') {
            const find = this.hireType.find(hire => hire.id === item[headers[h]])
            return find ? find.value : '未知'
          }
          return item[headers[h]]
        })
      })
      export_json_to_excel({
        header, // 表头 必填
        multiHeader: [['姓名', '主要信息', '', '', '', '其他信息', '']],
        merges: ['A1:A2', 'B1:E1', 'F1:G1'],
        data, // 具体数据 必填
        filename: 'excel-list', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    },
    goDetail(row) {
      this.$router.push('/employees/detail/' + row.id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
