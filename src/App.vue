<template>
  <div id="app">
    <el-input type="textarea" :rows="10" placeholder="点击生成数据按钮" v-model="srcData" style="font-size:16px;"/>
    <div>
      输入指定点P1(x,y)
      <el-input v-model="p1" style="width:250px" />
      输入指定点P2(x,y)
      <el-input v-model="p2" style="width:250px" />
      <el-button type="primary" @click="GenData" style="margin-left:20px;">生成数据</el-button>
      <el-button
        type="primary"
        @click="RunDemo"
        style="margin-left:20px;"
        :disabled="srcData.length == 0"
      >调用线路规划</el-button>
    </div>
    <el-input type="textarea" :rows="10" :value="tostring(desdata)" readonly style="font-size:16px;"></el-input>
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
      srcData: "",
      desdata: [],
      p1:'',
      p2:''
    };
  },
  filters: {},
  methods: {
    tostring(pts) {
      var ary = [];
      pts.forEach(p => {
        ary.push(`${p.x},${p.y}`);
      });
      return ary.join(";");
    },
    GenData() {
      this.srcData = this.tostring(GenerateData());
    },
    RunDemo() {
      // 生成参数,折线polyline,pStart,pEnd
      var 折线polyline = new Polyline(this.parse2PtArray(this.srcData));
      var p1Array = this.p1.split(',');
      var p2Array = this.p2.split(',');
      var pStart = new Point(parseFloat(p1Array[0]), parseFloat(p1Array[1]));
      var pEnd = new Point(parseFloat(p2Array[0]), parseFloat(p1Array[1]));
      // 调用并输出
      this.desdata = GetPointsInPolylineBySpecificRange(折线polyline, pStart, pEnd);
    },
    // 将字符串解析为点数组
    parse2PtArray(data) {
      var pts = [];
      data.split(";").forEach(item => {
        var tmp = item.split(",");
        pts.push(new Point(parseFloat(tmp[0]), parseFloat(tmp[1])));
      });
      return pts;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-button {
  margin: 20px 10px;
}
span {
  margin: 0px 10px;
}
</style>