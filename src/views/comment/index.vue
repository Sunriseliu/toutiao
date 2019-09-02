
<template>
  <div class="comment">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="title" label="标题" width="380px"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?"正常":"关闭"}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="toggleStatus(scope.row)" type="danger" size="small" v-if="scope.row.comment_status">关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" type="success" size="small" v-else>打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePage"
        hide-on-single-page
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// import { log } from 'util'
export default {
  created () {
    this.getArticles()
  },
  data () {
    return {
      articles: [], // 定义一个空的数组,用来接收获取到的评论内容
      reqParams: {
        //   返回数据的字段,传入comment 获取评论管理
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  methods: {
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('/articles', { params: this.reqParams })
      this.articles = data.results
      console.log(this.articles)

      this.total = data.total_count
    },
    changePage (newpage) {
      this.reqParams.page = newpage
      console.log(1)
      this.getArticles()
    },
    async toggleStatus (row) {
      const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, { allow_comment: !row.comment_status })
      this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
      row.comment_status = data.allow_comment
    }
  }
}
</script>

<style lang="less" scoped>
</style>
