<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <!-- 给单项选择按钮绑定change事件  回调参数就是选中的 label 值-->
        <el-radio-group v-model="reqParams.collect" size="small" @change="toggle">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="small" style="float:right" @click="openCard()">添加素材</el-button>
      </div>

      <!-- 存放图片列表区//
      循环遍历images数组(每个item就是一个图片对象,里边有id和ur)-->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer">
            <!-- 动态绑定收藏按钮的颜色属性 ,当is_collected为true是收藏 -->
            <span
              class="el-icon-star-off"
              :class="{red:item.is_collected}"
              @click="toggleStatus(item)"
            ></span>
            <span class="el-icon-delete" @click="delImg(item.id)"></span>
          </div>
        </div>
      </div>
      <!-- 总页数 total -->
      <!-- page-count 总页数 -->
      <!-- pager-count 页码按钮的数量 -->
      <!-- current-page 当前页数 -->
      <!-- page: 1, // 当前页
      per_page: 20 // 每页数据-->
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
    </el-card>
    <el-dialog
    title="添加素材"
    :visible.sync="dialogFormVisible"
    width="300px">
      <el-upload
        class="avatar-uploader"
        :headers="headers"
        :show-file-list="false"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :on-success="handleSuccess"
        name="image"

      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  created () {
    this.getImages()
  },
  data () {
    return {
      reqParams: {
        collect: false,
        page: 1, // 当前页
        per_page: 20 // 每页数据
      },
      images: [],
      total: 0, // 图片总数
      dialogFormVisible: false,
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      imageUrl: null
    }
  },
  methods: {
    handleSuccess (res) {
      this.$message.success('上传成功')
      this.imageUrl = res.data.url
      console.log(this.imageUrl)

      window.setTimeout(() => {
        this.dialogFormVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    },
    openCard () {
      this.dialogFormVisible = true
      this.imageUrl = null
    },
    async toggleStatus (item) {
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '收藏成功' : '取消收藏')
      item.is_collected = data.collect
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results // {results是一个对象,里边包含了图片的url和id}
      this.total = data.total_count
    },
    changePage (newpage) {
      this.reqParams.page = newpage
      this.getImages()
    },
    toggle () {
      this.reqParams.page = 1
      this.getImages()
    },
    delImg (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`user/images/${id}`)
          this.$message.success('删除素材成功')
          this.getImages()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 160px;
    height: 160px;
    border: 1px solid #ddd;
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      line-height: 30px;
      height: 30px;
      color: #fff;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
.pager {
  margin-top: 20px;
  text-align: center;
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
</style>
