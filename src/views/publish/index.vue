<template>
  <div class="publish-container">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?"修改":"发布"}}文章</my-bread>
      </div>
      <!-- 表单部分 -->
      <el-form laber-width="100px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容: ">
          <br />
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articleForm.cover.type ===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type ===3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>

        <el-form-item label="频道:">
          <!-- 父传子组件的值 -->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>

        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
// import router from '@/router'
// import { log } from 'util'

export default {
  components: {
    quillEditor
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId) {
      this.getArticle()
    }
  },
  // 监听路由变化
  watch: {
    '$route.query.id': function (n, old) {
      // 只能从编辑调到发布 所以不会用到新旧数据,只是监听变化即可
      // 不能使用this.articleForm = {} 这样会其他的数据取值,会是undefind 会报错

      // 重置表单数据
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
      this.articleId = null
    }
  },
  methods: {
    changeType () {
      console.log(1)
      this.articleForm.cover.images = []
    },
    // 点击发布还有存入草稿发起请求
    async submit (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)

      this.$message.success(draft ? '存入草稿成功' : '发布成功')
      this.$router.push('/article')
    },
    async getArticle () {
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    async update (draft) {
      // 地址多了ID  请求方式put  其他不变
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      // 成功
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  },
  data () {
    return {
      articleForm: {
        title: '',
        content: null,
        cover: {
          type: 1,
          images: []
        },
        channel_id: null

      },
      articleId: null, // 点击到编辑页面才有的,
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  }
}

</script>

<style lang="less" scoped>
</style>
