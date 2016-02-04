var schedule = require('node-schedule'),
    fs = require('fs-extra');
var rule = new schedule.RecurrenceRule();

var times = [];

for (var i = 1; i < 60; i+=5) {

    times.push(i);

}

rule.second = times;

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var c = 0;
var j = schedule.scheduleJob(rule, function () {
    c+=5;
    console.log(c);
    var filename = '/backup' + new Date().Format('yyyy-MM-dd hhmmss');
    fs.copy('./../proManage', filename, function (err) {
        if (err) throw err;
        console.log('success!');
    })
});