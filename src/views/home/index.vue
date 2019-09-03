<template>
  <el-container class="my-container">
    <el-aside :width='iszd?"66px":"200px"'>
      <div class="logo" :class="{minilogo:iszd}"></div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"

        :collapse = "iszd"
        :collapse-transition = "false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-tickets"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/images">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>

      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="el-icon-s-fold icon" @click="toggleaside()"></span>
        <span class="titile">江苏传智播客科技教育有限公司</span>
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <img class="user" :src="photo" alt />
            <span class="username">  {{name}}</span>

            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native = "setting()">个人设置</el-dropdown-item>
            <!-- 绑定点击删除事件@click.native 是在组件中绑定原生事件的办法 -->
            <el-dropdown-item icon="el-icon-unlock" @click.native= "logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      // 用来控制是否折叠
      iszd: false,
      name: '',
      photo: ''

    }
  },
  methods: {
    toggleaside () {
      this.iszd = !this.iszd
    },
    logout () {
      store.delUser()
      this.$router.push('/login')
    },
    setting () {
      this.$router.push('/setting')
    }

  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
    eventBus.$on('updateName', (name) => {
      this.name = name
    })
    eventBus.$on('updatephoto', (photo) => {
      this.photo = photo
    })
  }

}
</script>

<style lang="less" scoped>
// <el-container>插件渲染到浏览器中之后,本身标签名会渲染成类名
.my-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  // background-color: pink;
  .el-header {
    line-height: 60px;
    border-bottom: 1px solid #ddd;
    .icon {
      vertical-align: middle;
      font-size: 24px;
      margin-right: 5px;
    }
    .titile {
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      .user {
        height: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .username {
        font-weight: 700;
        color: #333;
        vertical-align: middle;
      }
    }
  }
  .el-aside {
    background: #002033;

    .logo{
      width: 100%;
      height: 60px;
      background: #002244 url("../../assets/images/logo_admin.png") no-repeat center / 140px auto;
    }
     .minilogo {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
    .el-menu{
      border-right: none;
    }
  }
}
</style>
