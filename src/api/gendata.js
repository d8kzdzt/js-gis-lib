// 生成测试数据
export function GenerateData() {
    var data = [];
    for (var i = 0; i < 100; i++) {
        data.push({
            x: i,
            y: 0
        })
    }
    return data;
}