<template>
  <div id="app">
    <el-input type="textarea" :rows="10" placeholder="点击生成数据按钮" :value="ptArray | tostring" />
    <div>
      输入指定点
      <span>X:</span><el-input v-model.number="x" style="width:100px" />
      <span>Y:</span><el-input v-model.number="y" style="width:100px"/>
      <el-button type="primary" @click="GenData" style="margin-left:20px;">生成数据</el-button>
      <el-button type="primary" @click="RunDemo" style="margin-left:20px;">调用线路规划</el-button>
    </div>
    <el-input type="textarea" :rows="10" :value="desdata" readonly></el-input>
  </div>
</template>

<script>
import { GenerateData } from "@/api/gendata";
import { GetPointsInPolylineBySpecificRange } from "@/api/gis_api";
import { Polyline } from "@/api/polyline";
import { Point } from "@/api/point";
export default {
  name: "app",
  data() {
    return {
      // 输入参数之组成Polyline的点集合
      ptArray: [],
      desdata: "",
      x:0,
      y:0
    };
  },
  filters:{
    tostring(pts){
      let res = '';
      pts.forEach(p => {
        res += `(${p.x},${p.y})\t`;
      });
      return res;
    }
  },
  methods: {
    GenData() {
      this.ptArray = GenerateData();
    },
    RunDemo() {
      pl = Polyline(this.ptArray);
      p1 = Point(3,7);
      p2 = Point(16.5,2);
      var ptInRange = GetPointsInPolylineBySpecificRange(pl,p1,p2);
      this.desdata = tostring(ptInRange);
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