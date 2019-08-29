<template>
  <div class="container">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单部分 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">已审核</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item  label="频道：">
          <!-- 此时v-model的值为当前选中值所组成的数组 -->
          <!-- <el-select clearable v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
          <my-channel v-model="reqParams.channel_id" ></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="datearr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format = "yyyy-MM-dd"
            @change = "changeDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" >筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="nr">
      <div slot="header">根据筛选条件共查询到{{total}}条结果：</div>
      <el-table :data="articles">
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <!-- 使用作用域插槽 scoped.row指的就是获取到的数据 就是articles中一个一个的对象 -->
            <el-image
              style="width: 160px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="contain"
            >
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="160px" height="100px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
             <!-- {{scope.row.id}} -->
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1" type>待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="warning">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="$router.push('/publish?id='+scope.row.id)" type="primary" icon="el-icon-edit" plain circle></el-button>
              <el-button
              type="danger"
              icon="el-icon-delete"
              @click="delArticle(scope.row.id)"
              plain
              circle>
              </el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- :current-page ="reqParams.page" //当前页数 -->
          <!-- :page-size="reqParams.per_page" 每页真是数量-->
      <!-- currentPage 当前页码改变时会触发 -->
      <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      :current-page ="reqParams.page"
      @current-change="changePage"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// import { async } from 'q'
// import { get } from 'http'
export default {
  created () {
    this.getChannelOptions()
    this.getArticles()
    // this.get
  },
  methods: {
    async getChannelOptions () {
      // 发送频道请求
      const {
        data: { data }
      } = await this.$http.get('/channels')
      // 赋值给channelOptions
      this.channelOptions = data.channels
    },
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count // 发送请求的时候把获取到的文章总数赋值给定义的变量
    },
    delArticle (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`articles/${id}`) // 发送请求携带参数
        this.$message.success('删除成功') // 组件封装
        this.getArticles() // 删除成功后调用
      }).catch(() => {

      })
    },
    changePage (newpage) {
      this.reqParams.page = newpage // 把改变的页码赋值给新页码
      this.getArticles()
    },
    // 点击时间刷选触发事件
    changeDate (dataArr) {
      // 回调参数:组件绑定值。格式与绑定值一致，可受 value-format 控制
      // 传入dataArr作为时间的取值范围(两个数值,是数组)
      if (dataArr) {
        // 保证时间范围改变才触发事件
        this.reqParams.begin_pubdate = dataArr[0]
        this.reqParams.end_pubdate = dataArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    search () {
      this.reqParams.page = 1
      // 如果顾客不想要筛选,想要全部显示
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }
      this.getArticles()
    }
  },
  data () {
    return {
      reqParams: {
        status: null, // 文章状态
        channel_id: null, // 频道id
        begin_pubdate: null, // 开始时间
        end_pubdate: null, // 结束时间
        page: 1, // 当前页数
        per_page: 20 // 每页展示文章数
      },
      // channelOptions: [
      //   // 获取数据覆盖
      //   // { id: 100, name: 'ironman' },
      //   // { id: 101, name: 'blackwindow' }
      // ],
      datearr: [],
      // 文章列表数据
      // articles: [],
      articles: [
        // {
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // },
      ],
      total: 0 // 定义文章总数
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  margin-top: 10px;
  text-align: center;
}
</style>
