
function Point(x, y) {
    this.X = x;
    this.Y = y;
    this.Equals = function (b) {
        return Math.abs(this.X - b.X) < 0.000001 && Math.abs(this.Y - b.Y) < 0.000001;
    }

    //返回两点之间的距离
    this.Distance = function (b) {
        dx = this.X - b.X;
        dy = this.Y - b.Y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    //离线段[a-b]距离最短的点和最短距离
    this.MinDistancePoint = function (a, b) {
        var minDistPoint;
        var minDist;
        t = ((a.Y - this.Y) * (b.Y - a.Y) - (a.X - this.X) * (a.X - b.X)) / ((a.X - b.X) * (a.X - b.X) - (a.Y - b.Y) * (b.Y - a.Y));
        x = (a.X - b.X) * t + a.X;
        y = (a.Y - b.Y) * t + a.Y;
        //理论最短距离点
        minDistPoint = new Point(x, y);

        //超出线段范围，没有在a-b上的垂直点,则最短距离为a or b
        if (minDistPoint.X > Math.max(a.X, b.X)
            || minDistPoint.X < Math.min(a.X, b.X)
            || minDistPoint.Y > Math.max(a.Y, b.Y)
            || minDistPoint.Y < Math.min(a.Y, b.Y)) {
            if (a.Distance(this) < b.Distance(this)) {
                minDistPoint = a;
            } else {
                minDistPoint = b;
            }
        }
        minDist = this.Distance(minDistPoint);
        return minDistPoint, minDist;
    }

    // 到线段最短距离
    this.DistanceFromSegment = function (A, B) {
        if (A.X == B.X && A.Y == B.Y) {
            return this.Distance(A);
        }
        len2 = (B.X - A.X) * (B.X - A.X) + (B.Y - A.Y) * (B.Y - A.Y)
        r = ((this.X - A.X) * (B.X - A.X) + (this.Y - A.Y) * (B.Y - A.Y)) / len2;

        if (r <= 0.0) {
            return this.Distance(A);
        }
        if (r >= 1.0) {
            return this.Distance(B);
        }
        s = ((A.Y - this.Y) * (B.X - A.X) - (A.X - this.X) * (B.Y - A.Y)) / len2;
        return Math.abs(s) * Math.sqrt(len2);
    }

    // 在线段A-B的投影点
    this.ProjectPoint = function (A, B) {
        if (this === A || this === B) {
            return this;
        }
        r = this.ProjectionFactor(A, B);
        return new Point(A.X + r * (B.X - A.X), A.Y + r * (B.Y - A.Y));
    }

    // 求点在线段上的投影影子
    this.ProjectionFactor = function (A, B) {
        if (this === A) {
            return 0.0;
        }
        if (this === B) {
            return 1.0;
        }
        dx = B.X - A.X;
        dy = B.Y - A.Y;
        len = dx * dx + dy * dy;
        r = ((this.X - A.X) * dx + (this.Y - A.Y) * dy) / len;
        return r;
    }

    // 点到线段最短距离的点,靠A更近
    this.ClosestPoint = function (A, B) {
        factor = this.ProjectionFactor(A, B)
        if (factor > 0 && factor < 1) {
            return this.ProjectPoint(A, B);
        }
        dist0 = this.Distance(A);
        dist1 = this.Distance(B);
        if (dist0 < dist1) {
            return A;
        } else {
            return B;
        }
    }

    //点在线段A-B的右侧?
    this.IsOnRight = function (A, B) {
        res = (B.X - A.X) * (this.Y - A.Y) - (this.X - A.X) * (B.Y - A.Y);
        return res < 0;
    }
}