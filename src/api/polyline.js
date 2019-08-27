// 折线类，构造时传入Point[]
export function Polyline(ptArray) {
    // 表示一个极大值
    this.MaxValue = 99999999999999999999999999999999999999999999999999999999999999;
    // 折线的点集
    this.Points = ptArray;
    // 点的个数
    this.Length = function(){
        return this.Points.length;
    }
    // 返回折线总长度
    this.TotalDistance = function () {
        var len = this.Points.length;
        if (len == 0) {
            return 0;
        }
        return this.Points.Distance(len - 1);
    }

    // 返回第idx个点(idx从0开始)距起点的距离之和
    this.Distance = function (idx) {
        var dist = 0.0;
        if (idx > this.Points.length + 1) {
            throw "idx超出折线的长度";
        }
        for (var i = 0; i < idx; i++) {
            dist += this.Points[i].Distance(this.Points[i + 1]);
        }
        return dist;
    }

    //获取【折线总长,投影点前面一个点下标(从0开始),指定点到折线起点距离,指定点到投影点距离，投影点,指定点在线段右侧?】
    this.QueryPointAndDistance = function (pt) {
        if (this.Points.length <= 1) {
            throw "polyLine至少包含2个点";
        }
        var minDistPoint;   // 投影点即最短距离点
        var distFromBegin;  // 投影点距起点距离
        var lastPxIdx;      // 投影点前面一个点下标(从0开始)
        var isOnRight;      // 指定点在折线的右侧？
        endPoint = this.Points[this.Points.length - 1];
        minDist = MaxValue;
        // 遍历每个线段，求最小距离所在的线段
        for (var i = 0; i < this.Points.length - 1; i++) {
            // 点到线段的距离
            dist = DistanceFromSegment(pt, this.Points[i], this.Points[i + 1]);
            if (dist < minDist) {
                // 最短距离被刷新
                minDist = dist;
                lastPxIdx = i;
                minDistPoint = pt.ClosestPoint(this.Points[i], this.Points[i + 1]);
            }
        }
        plLen = this.Points.TotalDistance();
        isOnRight = pt.IsOnRight(pl[lastPxIdx], pl[lastPxIdx + 1]);
        distFromBegin = this.Points.Distance(lastPxIdx) + minDistPoint.Distance(this.Points[lastPxIdx]);
        // 投影点时最后一个点时，上一个点下标置为最后一个点
        if (minDistPoint === endPoint) {
            lastPxIdx = this.Points.length - 1;
        }
        return plLen, lastPxIdx, distFromBegin, minDist, minDistPoint, isOnRight;
    }
}