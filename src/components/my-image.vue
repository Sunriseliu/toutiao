<template>
  <div class="img-container">
    <div class="img_btn" @click="openDialog">
      <img :src="value||defaultImage" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <el-radio-group @change="toggleCollect" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <div class="img_list">
            <div
              class="img_item"
              :class="{selected:item.url===selectImageUrl}"
              @click="selectImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
            <el-pagination
              class="pager"
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="changePage"
              hide-on-single-page
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="update" width="300px">
          <el-upload
            style="width=200px"
            class="avatar-uploader"
            :headers="headers"
            :show-file-list="false"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" width="200px" height="200" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button >取 消</el-button>
        <el-button type="primary" @click="comfirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
import store from '@/store'
// import { scryptSync } from 'crypto'
export default {
  name: 'my-image',
  // created () {
  //   this.reqParams.page = 1
  //   this.getImages()
  // },
  // 父组件传入的图片地址
  props: ['value'],

  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      reqParams: {
        content: false,
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      imageUrl: null,
      selectImageUrl: null,
      defaultImage, // 声明一个变量去接收子传给父的值
      uploadImageUrl: null

    }
  },
  methods: {
    comfirmImage () {
      let src = null
      if (this.activeName === 'image') {
        if (!this.selectImageUrl) { return this.$message.info('请选择素材照片') }
        src = this.selectImageUrl
      } else {
        if (!this.uploadImageUrl) return this.$message.info('请上传一张图')
        src = this.uploadImageUrl
      }
      // 把图片的url传给父组件
      this.$emit('input', src)

      this.dialogVisible = false
    },
    selectImage (url) {
      this.selectImageUrl = url
    },
    openDialog () {
      this.dialogVisible = true
      this.selectImageUrl = null
      this.uploadImageUrl = null
      this.activeName = 'image'
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    changePage (newpage) {
      this.reqParams.page = newpage
      this.getImages()
    },
    handleSuccess (res) {
      this.$message.success('上传成功')
      this.uploadImageUrl = res.data.url
      // console.log(this.imageUrl)

      window.setTimeout(() => {
        this.dialogFormVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.img_btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  margin: 0 0 20px 50px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  display: block;
  width: 100%;
}
.img_list {
  margin-top: 10px;
  .img_item {
    width: 160px;
    height: 120px;

    border: 1px solid #ddd;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
    &.selected {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url("../assets/images/selected.png")
          no-repeat center / 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
  }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;
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
.img-container{
  display: inline-block;
  margin-right: 20px;
}
</style>
