// gis库中点相关操作封装
export function Point(x, y) {
    this.x = x;
    this.y = y;
    this.equals = function (b) {
        return Math.abs(this.x - b.x) < 0.00000001 && Math.abs(this.y - b.y) < 0.00000001;
    }

    //返回两点之间的距离
    this.distance = function (b) {
        var dx = this.x - b.x;
        var dy = this.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    //离线段[a-b]距离最短的点和最短距离
    this.minDistancePoint = function (a, b) {
        var minDistPoint;
        var minDist;
        var t = ((a.y - this.y) * (b.y - a.y) - (a.x - this.x) * (a.x - b.x)) / ((a.x - b.x) * (a.x - b.x) - (a.y - b.y) * (b.y - a.y));
        var x = (a.x - b.x) * t + a.x;
        var y = (a.y - b.y) * t + a.y;
        //理论最短距离点
        minDistPoint = new Point(x, y);

        //超出线段范围，没有在a-b上的垂直点,则最短距离为a or b
        if (minDistPoint.x > Math.max(a.x, b.x)
            || minDistPoint.x < Math.min(a.x, b.x)
            || minDistPoint.y > Math.max(a.y, b.y)
            || minDistPoint.y < Math.min(a.y, b.y)) {
            if (a.distance(this) < b.distance(this)) {
                minDistPoint = a;
            } else {
                minDistPoint = b;
            }
        }
        minDist = this.distance(minDistPoint);
        return minDistPoint, minDist;
    }

    // 到线段最短距离
    this.distanceFromSegment = function (A, B) {
        if (A.x == B.x && A.y == B.y) {
            return this.distance(A);
        }
        var len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y)
        var r = ((this.x - A.x) * (B.x - A.x) + (this.y - A.y) * (B.y - A.y)) / len2;

        if (r <= 0.0) {
            return this.distance(A);
        }
        if (r >= 1.0) {
            return this.distance(B);
        }
        var s = ((A.y - this.y) * (B.x - A.x) - (A.x - this.x) * (B.y - A.y)) / len2;
        return Math.abs(s) * Math.sqrt(len2);
    }

    // 在线段A-B的投影点
    this.projectPoint = function (A, B) {
        if (this === A || this === B) {
            return this;
        }
        var r = this.projectionFactor(A, B);
        return new Point(A.x + r * (B.x - A.x), A.y + r * (B.y - A.y));
    }

    // 求点在线段上的投影影子
    this.projectionFactor = function (A, B) {
        if (this.equals(A)) {
            return 0.0;
        }
        if (this.equals(B)) {
            return 1.0;
        }
        var dx = B.x - A.x;
        var dy = B.y - A.y;
        var len = dx * dx + dy * dy;
        var r = ((this.x - A.x) * dx + (this.y - A.y) * dy) / len;
        return r;
    }

    // 点到线段最短距离的点,靠A更近
    this.closestPoint = function (A, B) {
        var factor = this.projectionFactor(A, B);
        if (factor > 0 && factor < 1) {
            return this.projectPoint(A, B);
        }
        var dist0 = this.distance(A);
        var dist1 = this.distance(B);
        if (dist0 < dist1) {
            return A;
        } else {
            return B;
        }
    }

    //点在线段A-B的右侧?
    this.isOnRight = function (A, B) {
        var res = (B.x - A.x) * (this.y - A.y) - (this.x - A.x) * (B.y - A.y);
        return res < 0;
    }
}