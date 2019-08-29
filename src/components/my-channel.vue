<template>
<!-- 在ele组件中 v-model和属性value都可以绑定值,但是父传子的数据时只读的,不能双向绑定,所以使用:value -->
  <!-- :value="value" 的value接受的是v-model="reqParams.channel_id"的值 -->
  <el-select :value="value" clearable placeholder="请选择" @change="changePd">
    <el-option v-for="item in channelOptions"
    :key="item.id"
    :label="item.name"
    :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'], // 父组件v-model="reqParams.channel_id"v-model="reqParams.channel_id"
  data () {
    return {
      // value: null,
      channelOptions: [
        // { id: 100, name: 'ironman' },
        // { id: 101, name: 'blackwindow' }
      ]

    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    changePd (newChannel) {
      if (newChannel === '') newChannel = null
      this.$emit('input', newChannel)
    },
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('/channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style lang="less" scoped>
</style>
