<template>
  <div id="app">
    <el-input type="textarea" :rows="10" v-model="srcdata" placeholder="点击生成数据按钮"></el-input>
    <el-button type="primary" id="genData">生成数据</el-button>
    <el-input type="textarea" :rows="10" v-model="desdata"></el-input>
  </div>
</template>

<script>
export default {
  name: "#app",
  data() {
    return {
      srcdata: "",
      desdata:""
    };
  }
};
</script>

<style lang="scss" scoped>
#genData {
  margin: 20px 10px;
}
</style>