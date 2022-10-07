<template>
  <div>
    <page-tools type="info">
      <!--  具名插槽新语法 -->
      <template #before>
        <span>共25条记录</span>
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
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>
    </page-tools>
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools'
export default {
  name: 'HrsaasIndex',
  components: {
    // PageTools
  },
  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
