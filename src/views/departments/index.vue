<template>
  <div class="departments-container">
    <el-card>
      <tree-tools :tree-node="company" :is-root="false" />
    </el-card>
    <!-- 内容展示区域 -->
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <tree-tools slot-scope="{ data }" :tree-node="data" />
    </el-tree>
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments.js'
import TreeTools from './components/tree-tools.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    TreeTools
  },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }
    }
  },

  created() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const res = await getDepartments()
      console.log(res)
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
