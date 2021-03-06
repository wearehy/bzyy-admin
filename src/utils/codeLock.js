var MD5 = require('crypto-js/md5');

function calcSign(data, timestamp) { // 获取sign
    var keys = [];
    for (var k in data) {
        keys.push(k);
    }
    
    keys.sort();
    var kv = [];
    for (var v of keys) {
        kv.push(data[v]);
    }
    
    var kvStr = kv.join('');

    var sign = MD5(kvStr + MD5(timestamp.substring(0, 8)).toString() + timestamp).toString();
    return sign;
}

export function codelock(method, data) {
    var timestamp = (new Date()).valueOf().toString(); //时间戳
    if (method == 'post' || method == 'put') {
        var sign = calcSign('', timestamp);
    } else {
        var sign = calcSign(data, timestamp);
    }
  

    return {
        'version':'1.0.0',
        'timestamp':timestamp,
        'sign':sign
    }
}


