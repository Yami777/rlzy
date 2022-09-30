<template>
  <div class="departments-container">
    <el-card>
      <tree-tools :tree-node="company" :is-root="false" @addDept="handleAddDept" />
    </el-card>
    <!-- 内容展示区域 -->
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <tree-tools slot-scope="{ data }" :tree-node="data" @addDept="handleAddDept" />
    </el-tree>
    <add-dept :dialog-visible.sync="dialogVisible" :tree-node="currentNode" />
  </div>

</template>

<script>
import { getDepartments } from '@/api/departments.js'
import TreeTools from './components/tree-tools.vue'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    TreeTools,
    AddDept
  },

  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [],
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      dialogVisible: false,
      currentNode: {}
    }
  },

  created() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const { depts, companyName, companyManage } = await getDepartments()
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage, id: ''
      }
    },
    handleAddDept(node) {
      this.dialogVisible = true
      this.currentNode = node
      // console.log(node)
    }

  }
}
</script>
<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {
      // padding-right: 20px;

    }
  }
}
</style>
