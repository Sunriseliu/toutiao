<template>
  <div class="container" ref="box">
    <!-- 卡片 element-ui 组件 -->
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginform">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:236px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store' // 验证是否有token
export default {
  data () {
    const checkmobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号码不正确'))
      }
      callback()
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '',
        code: ''
      },
      //   表单校验规则对象
      loginRules: {
        mobile: [
          // 每个校验对象都有可能有多条校验规则,所以是数组
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkmobile, trigger: 'change' } // 变输入的时候边变化

        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // 验证码是6位
          { len: 6, message: '验证要6位', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    login () {
      // this.$refs.loginform是当前组件的实例对象
      this.$refs.loginform.validate(async (valid) => {
        if (valid) {
          try {
            //  res = {data:{data:'用户信息',message:'提示'}}
            // const data = await this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            const { data: { data } } = await this.$http.post('/authorizations', this.loginForm)

            store.setUser(data)
            this.$router.push('/')
          } catch (err) {
            this.$message.error('手机号或者验证码不正确')
          }

          // .then(res => {
          //   // 成功 跳转
          //   // 注意 登录 不够完善
          //   // res是响应对象--->res.data响应主体---->res.data.data响应主体包含（message,data）
          //   // 用户信息  res.data.data
          //   // 操作用户信息 就是操作 store 存储  写一个模块进行用户信息的操作。
          //   store.setUser(res.data.data)
          //   // 如果请求成功就跳转到首页
          //   this.$router.push('/')
          // })
          // .catch(() => {
          //   this.$message.error('手机号或者验证码不正确')
          // })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
