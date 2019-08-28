//给定折线pl,给定两点p1,p2,返回pl上离p1,p2最近的两个点范围内的点集合,包含p1,p2两点的投影点
export function GetPointsInPolylineBySpecificRange(pl, p1, p2) {
	if (pl.length() < 2) {
		throw "折线至少要包含2个点";
	}
	var ptInRange = [];
	// 分别求p1,p2在折线pl上的投影位置数据
	var p1QryRes = pl.queryPointAndDistance(p1);
	var p2QryRes = pl.queryPointAndDistance(p2);
	//将p1加入(minDistPoint(最短距离点)即投影点)
	ptInRange.push(p1QryRes.minDistPoint);
	//lastPxIdx即投影点所在线段的起点下标
	for (var i = p1QryRes.lastPxIdx; i < p2QryRes.lastPxIdx; i++) {
		var pt = pl.getElementAt(i + 1);
		if (!pt.equals(p1QryRes.minDistPoint)) {
			ptInRange.push(pt);
		}
	}
	//把p2加到集合中末尾，前提是它没有被还包含进去
	if (!ptInRange[ptInRange.length - 1].equals(p2QryRes.minDistPoint)) {
		ptInRange.push(p2QryRes.minDistPoint);
	}
	return ptInRange;
}