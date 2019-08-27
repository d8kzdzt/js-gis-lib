<template>
  <div id="app">
    <el-input type="textarea" :rows="10" v-model="srcdata" placeholder="点击生成数据按钮" readonly></el-input>
    <div>
      输入指定点
      <span>X:</span><el-input v-model.number="x" style="width:100px" />
      <span>Y:</span><el-input v-model.number="y" style="width:100px"/>
      <el-button type="primary" @click="GenData" style="margin-left:20px;">生成数据</el-button>
      <el-button type="primary" @click="RunDemo" style="margin-left:20px;">调用线路规划</el-button>
    </div>
    <el-input type="textarea" :rows="10" v-model="desdata" readonly></el-input>
  </div>
</template>

<script>
import { GenerateData } from "@/api/gendata";
import { GetPointsInPolylineBySpecificRange } from "@/api/gis_api";
export default {
  name: "app",
  data() {
    return {
      srcdata: "",
      desdata: "",
      x:0,
      y:0
    };
  },
  methods: {
    GenData() {
      var data = GenerateData();
      this.srcdata = "";
      data.forEach(p => {
        this.srcdata += `(${p.x},${p.y})\t`;
      });
    },
    RunDemo() {
      new Polyline();
      GetPointsInPolylineBySpecificRange(pl);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button {
  margin: 20px 10px;
}
span{
  margin: 0px 10px;
}
</style>