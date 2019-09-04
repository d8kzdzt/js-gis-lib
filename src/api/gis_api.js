//给定折线polyline,给定两点pStart,pEnd,返回polyline上离pStart,pEnd最近的两个点范围内的点集合,包含pStart,pEnd两点的投影点
export function GetPointsInPolylineBySpecificRange(polyline, pStart, pEnd) {
	if (polyline.length() < 2) {
		throw "折线至少要包含2个点";
	}
	var ptInRange = [];
	// 分别求pStart,pEnd在折线polyline上的投影位置数据
	var pStartQryRes = polyline.queryPointAndDistance(pStart);
	var pEndQryRes = polyline.queryPointAndDistance(pEnd);
	// 防止求出的范围是[20,5]这种从大到小的,将其转为[5,20]则可顺利给出范围内的点
	if(pStartQryRes.lastPxIdx > pEndQryRes.lastPxIdx){
		var tmp = pStartQryRes;
		pStartQryRes = pEndQryRes;
		pEndQryRes = tmp;
	}
	//将pStart加入(minDistPoint(最短距离点)即投影点)
	ptInRange.push(pStartQryRes.minDistPoint);
	//lastPxIdx即投影点所在线段的起点下标
	for (var i = pStartQryRes.lastPxIdx; i < pEndQryRes.lastPxIdx; i++) {
		var pt = polyline.getElementAt(i + 1);
		if (!pt.equals(pStartQryRes.minDistPoint)) {
			ptInRange.push(pt);
		}
	}
	//把pEnd加到集合中末尾，前提是它没有被还包含进去
	if (!ptInRange[ptInRange.length - 1].equals(pEndQryRes.minDistPoint)) {
		ptInRange.push(pEndQryRes.minDistPoint);
	}
	return ptInRange;
}