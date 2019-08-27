<template>
  <div id="app">
    <el-input type="textarea" :rows="10" placeholder="点击生成数据按钮" v-model="srcData" />
    <div>
      输入指定点P1
      <span>X1:</span><el-input-number v-model="x1" style="width:150px" />
      <span>Y1:</span><el-input-number v-model="y1" style="width:150px;margin-right:30px;"/>
      输入指定点P2
      <span>X2:</span><el-input-number v-model="x2" style="width:150px" />
      <span>Y2:</span><el-input-number v-model="y2" style="width:150px"/>
      <el-button type="primary" @click="GenData" style="margin-left:20px;" >生成数据</el-button>
      <el-button type="primary" @click="RunDemo" style="margin-left:20px;" :disabled="srcData.length == 0">调用线路规划</el-button>
    </div>
    <el-input type="textarea" :rows="10" :value="tostring(desdata)" readonly></el-input>
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
      srcData: '',
      desdata: [],
      x1:0,
      y1:0,
      x2:0,
      y2:0
    };
  },
  filters:{
  },
  methods: {
    tostring(pts){
      var ary = [];
      pts.forEach(p => {
        ary.push(`(${p.x},${p.y})`);
      });
      return ary.join(';');
    },
    GenData() {
      this.srcData = this.tostring(GenerateData());
    },
    RunDemo() {
      // 生成参数,折线pl，p1,p2
      var pl = new Polyline(this.parse2PtArray(this.srcData));
      var p1 = new Point(this.x1,this.y1);
      var p2 = new Point(this.x2,this.y2);
      // 调用并输出
      this.desdata = GetPointsInPolylineBySpecificRange(pl,p1,p2);
    },
    // 将字符串解析为点数组
    parse2PtArray(data){
      var pts=[];
      data.split(';').forEach(item=>{
        var tmp = item.slice(1,item.length-1).split(',');
        pts.push(new Point(parseFloat(tmp[0]),parseFloat(tmp[1])));
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
span{
  margin: 0px 10px;
}
</style>