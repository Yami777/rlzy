<template>
  <div>
    <!-- action:上传图片的地址 -->
    <el-upload
      v-loading="loading"
      class="uploadImg"
      action="#"
      :file-list="fileList"
      list-type="picture-card"
      :on-preview="OnPreview"
      :on-remove="OnRemove"
      :on-change="OnChange"
      :http-request="httpRequest"
      :limit="1"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="提示"
      :visible.sync="previewDialog"
      width="50%"
    >
      <img :src="previewImgUrl" alt="" style="width:100%">

    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID65vb6OTNAj6FAtusdKrDPPCoCORFrMot',
  SecretKey: 'GNL6ukaOBmMn16CF7oOsBKRfn3EPVVTT'
})
// console.log(COS)
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      previewImgUrl: '',
      previewDialog: false,
      fileList: [
        // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ]
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({ name: 'default', url: this.defaultUrl })
    }
  },
  methods: {
    OnPreview(file) {
      this.previewImgUrl = file.url
      this.previewDialog = true
    },
    OnRemove(file, fileList) {
      this.fileList = fileList
    },
    OnChange(file, fileList) {
      this.fileList = fileList
    },
    httpRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'dami-777-1314348476', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 上传文件对象 */
        onProgress: function(progressData) {

        }
      }, (err, data) => {
        if (err) return this.$message.error('上传图片失败')
        this.loading = false
        this.$emit('on-success', { imgUrl: 'http://' + data.Location }) /* 上传成功的逻辑不能写死 */
      })
    },
    beforeUpload(file) {
      const allowType = ['image/jpeg', 'image/png']
      const ishas = allowType.includes(file.type)
      if (!ishas) {
        this.$message.error('只能上传' + allowType.join(',') + '类型的文件')
        return false
      }
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片不能超过1Mb')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.uploadImg {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
