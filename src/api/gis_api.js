//给定折线pl,给定两点p1,p2,返回pl上离p1,p2最近的两个点范围内的点集合,包含p1,p2两点的投影点
export function GetPointsInPolylineBySpecificRange(pl, p1, p2){
	if(pl.Length() < 2 ){
		throw "折线至少要包含2个点";
	}
    var ptInRange = [];
    // 分别求p1,p2在折线pl上的投影位置(线段idxP?),投影点(p?Proj)
	_, idxP1, _, _, p1Proj, _ = pl.QueryPointAndDistance(p1)
	_, idxP2, _, _, p2Proj, _ = pl.QueryPointAndDistance(p2)
	//将p1加入
	ptInRange.push(p1Proj);
	for( i = idxP1; i < idxP2; i++ ){
		pt = pl.GetElementAt(i+1);
		if(!pt.Equals(p1Proj)) {
			ptInRange.push(pt);
		}
	}
	//把p2加到集合中末尾，前提是它没有被还包含进去
	if(!ptInRange[ptInRange.length-1].Equals(p2Proj)){
		ptInRange.push(p2Proj);
	}
	return ptInRange;
}