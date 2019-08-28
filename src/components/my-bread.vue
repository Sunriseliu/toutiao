<template>
  <div class="zj">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
          <slot>
              <!-- 此处放插槽 -->
          </slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'my-bread'
}
</script>

<style lang="less" scoped>
</style>
