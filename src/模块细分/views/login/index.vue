<template>
  <div class="container">
    <!-- login -->
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form :model="loginform">
        <el-form-item>
          <el-input v-model="loginform.tel" style="width:400px" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="loginform.yzm"
            placeholder="请输入验证码"
            style="width:236px;margin-right:10px"
          ></el-input>
          <el-button>验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
         <el-form-item>
           <el-button type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        tel: '',
        yzm: '',
        checked: true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  //设定容器的具体样式
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  //   background: url("../../assets/images/login_bg.jpg") no-repeat center / cover;
  .box-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 50px;
    }
  }
}
</style>
