<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="1"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :class="{ disabled: fileComputed }"
      :on-change="changeFile"
      :before-upload="checkFile"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="showPercent"
      style="width: 180px"
      :percentage="percent"
    />
    <el-dialog :visible.sync="dialogVisible" title="图片">
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDKTN1PbWBbkeJislNjocBVYKp30g5E6i3',
  SecretKey: '5xZuylIabMr53kBLErFLBk7E5fy1nIVS'
})
export default {
  data() {
    return {
      fileList: [],
      imageUrl: '',
      dialogVisible: false,
      currentFileUid: '',
      showPercent: false,
      percent: 0
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePictureCardPreview(file) {
      this.imageUrl = file.url
      this.dialogVisible = true
    },
    changeFile(file, fileList) {
      // console.log(file)
      this.fileList = fileList.map(item => item)
    },
    checkFile(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    upload(params) {
      if (params.file) {
        cos.putObject(
          {
            Bucket: 'fluke-1306457360' /* 必须 */,
            Region: 'ap-chongqing' /* 存储桶所在地域，必须字段 */,
            Key: params.file.name /* 必须 */,
            StorageClass: 'STANDARD',
            Body: params.file, // 上传文件对象
            onProgress: params => {
              this.percent = params.percent * 100
            }
          },
          (err, data) => {
            console.log(err || data)
            if (!err && data.statusCode === 200) {
              console.log(this.fileList)
              this.fileList = this.fileList.map(item => {
                if (item.uid === this.currentFileUid) {
                  return { url: 'http://' + data.Location, upload: true }
                }
                return item
              })
              setTimeout(() => {
                this.showPercent = false // 隐藏进度条
                this.percent = 0 // 进度归0
              }, 2000)
            }
          }
        )
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
