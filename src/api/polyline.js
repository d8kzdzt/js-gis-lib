// gis库中折线相关操作封装
export function Polyline(ptArray) {
    // 表示一个极大值
    this.MaxValue = 1e38;
    // 折线的点集
    this.Points = ptArray;
    // 点的个数
    this.length = function () {
        return this.Points.length;
    }
    this.getElementAt = function (idx) {
        if (idx < 0 || idx >= this.Points.length) {
            throw '下标超出折线点集范围';
        }
        return this.Points[idx];
    }
    // 返回折线总长度
    this.totalDistance = function () {
        var len = this.Points.length;
        if (len == 0) {
            return 0;
        }
        return this.distance(len - 1);
    }

    // 返回第idx个点(idx从0开始)距起点的距离之和
    this.distance = function (idx) {
        var dist = 0.0;
        if (idx > this.Points.length + 1) {
            throw "idx超出折线的长度";
        }
        for (var i = 0; i < idx; i++) {
            dist += this.Points[i].distance(this.Points[i + 1]);
        }
        return dist;
    }

    //获取【折线总长,投影点前面一个点下标(从0开始),指定点到折线起点距离,指定点到投影点距离，投影点,指定点在线段右侧?】
    this.queryPointAndDistance = function (pt) {
        if (this.Points.length <= 1) {
            throw "polyLine至少包含2个点";
        }
        var minDistPoint;   // 投影点即最短距离点
        var lastPxIdx;      // 投影点前面一个点下标(从0开始)
        var endPoint = this.Points[this.Points.length - 1];
        var minDist = this.MaxValue;
        // 遍历每个线段，求最小距离所在的线段
        for (var i = 0; i < this.Points.length - 1; i++) {
            // 点到线段的距离
            var dist = pt.distanceFromSegment(this.Points[i], this.Points[i + 1]);
            if (dist < minDist) {
                // 最短距离被刷新
                minDist = dist;
                lastPxIdx = i;
                minDistPoint = pt.closestPoint(this.Points[i], this.Points[i + 1]);
            }
        }
        var plLen = this.totalDistance();
        // 指定点在折线的右侧？
        var isOnRight = pt.isOnRight(this.Points[lastPxIdx], this.Points[lastPxIdx + 1]);
        // 投影点距起点距离
        var distFromBegin = this.distance(lastPxIdx) + minDistPoint.distance(this.Points[lastPxIdx]);
        // 投影点时最后一个点时，上一个点下标置为最后一个点
        if (minDistPoint.equals(endPoint)) {
            lastPxIdx = this.Points.length - 1;
        }
        return {
            plLen: plLen,
            lastPxIdx: lastPxIdx,
            distFromBegin: distFromBegin,
            minDist: minDist,
            minDistPoint: minDistPoint,
            isOnRight: isOnRight
        }
    }
}