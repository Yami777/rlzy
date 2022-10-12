<template>
  <div>
    <upload-excel :on-success="handleSuccess" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    // beforeUpload(file) {
    //   console.log(file)
    //   if (file.size > 1024) {
    //     this.$message.error('过大')
    //     return false
    //   }
    //   return true
    // },
    async  handleSuccess({ header, results }) {
      // console.log(header, results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        // console.log(item)
        const uesrinfo = {}
        Object.keys(item).forEach(key => {
          // console.log(key)
          uesrinfo[userRelations[key]] = item[key]
        })
        arr.push(uesrinfo)
      })
      // console.log(arr)
      // 调用批量新增的接口
      await importEmployee(arr)

      this.$message.success('批量新增成功')
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
