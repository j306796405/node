var express = require('express');
var router = express.Router();
var settings = require('./../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
var User = function(name, age){
    this.name = name;
    this.age = age;
}
var mongodb = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});

    mongodb.open(function (err, db) {
        if (err) {
            console.log('db open error');
            return;
        }
        db.collection('players', function (err, collection) {
            if (err) {
                mongodb.close();
                console.log('find collections error');
                return;
            }

            /* get method */
            //var query = {'name': 'wade'};
            //查找整表
           /* collection.find().toArray(function (error, players) {
                console.log(players);
            });*/
            //增加搜索条件
            /*collection.find({name: 'kyrie'}).toArray(function (error, players) {
                console.log(players);
            });*/
            //只查找第一个满足搜索条件的值
            /*collection.findOne({name: 'kyrie'}, function (error, players) {
                console.log(players)
            });*/

            /* insert method */ /* safe: true必须加上 不然err为null 不知道操作是否成功 */
            /*var player = new User('kyrie',26);
            collection.insert(player,{safe: true}, function(err, players){
                mongodb.close();
                if(err){
                    console.log('insert failure');
                    return; //错误， 返回err 信息
                }
                console.log(players[0]);
            })*/

            /* update method */
            /*var query = {'name' : 'wade'};
            collection.update(query,{'$set': {'name': 'love'}}, function(err, updateNum){
                mongodb.close();
                if(err){
                    console.log('insert failure');
                    return; //错误， 返回err 信息
                }
                console.log(updateNum);
            })*/

            /* delete method */
            /*var query = {'name' : 'kyrie'};
             collection.remove(query,{'safe': true}, function(err, deleteNum){
             mongodb.close();
             if(err){
                 console.log('delete failure');
                 return; //错误， 返回err 信息
             }
                console.log(deleteNum);
             })*/
        })
    })
});

module.exports = router;
