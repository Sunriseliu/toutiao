<template>
  <div class="setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{user.id}}</el-form-item>
            <el-form-item label="手机：">{{user.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="user.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- http-request是可以覆盖默认上传方式的属性,是一个function(会自动把长传图片的信息作为参数) -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="upload"
          >
            <img v-if="user.photo" :src="user.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/eventBus'

export default {
  created () {
    this.getUserInfo()
  },
  methods: {
    async upload (res) {
      // console.log(res) //得到了上传图的所有信息
      const file = res.file
      const formData = new FormData()
      formData.append('photo', file)
      // console.log(formData.get('photo'))
      // formData 就是photo:file
      const { data: { data } } = await this.$http.patch('/user/photo', formData)
      this.$message.success('修改头像成功')
      this.user.photo = data.photo
      const localuser = store.getUser()
      localuser.photo = data.photo // 赋值给本地存储的photo
      store.setUser(localuser)
      eventBus.$emit('updatephoto', data.photo)
    },
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('/user/profile')
      this.user = data
    },
    async save () {
      const { name, intro, email } = this.user
      await this.$http.patch('user/profile', { name, intro, email })

      this.$message.success('保存设置成功')

      const localUser = store.getUser()
      localUser.name = name
      store.setUser(localUser)

      eventBus.$emit('updateName', name)
    }
  },
  data () {
    return {
      user: {
        name: '',
        intro: '',
        email: '',
        photo: ''
        // id: '',
        // mobile: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
