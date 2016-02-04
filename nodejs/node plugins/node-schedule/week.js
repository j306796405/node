var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();

//周一到周日
//rule.dayOfWeek = [0, new schedule.Range(1, 6)];
//每周四，周五，周六，周天
//rule.dayOfWeek = [0, new schedule.Range(4, 6)];

rule.hour = 16;

rule.minute = 50;

var j = schedule.scheduleJob(rule, function () {

    console.log("执行任务");

});