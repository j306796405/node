var express = require('express');
var router = express.Router();

module.exports = function(app){
    /* GET home page. */
    app.get('/', function (req, res, next) {
        res.render('index', {title: '<span>Express</span>',msg: req.flash('msg')});
    });

    app.route('/login')
        .get(function (req, res, next) {
            if (req.session.user) {
                return res.redirect('/home');
            }else{
                res.render('login', {title: '用户登录'})
            }
        })
        .post(function (req, res, next) {
            var user = {
                username: 'Jeffery',
                password: '737421'
            }
            if(req.body.username == user.username && req.body.password == user.password){
                req.session.user = user;
                req.flash('msg','感谢你登录成功！');
                return res.redirect('/home');
            }else{
                req.flash('msg','密码有误！');
                return res.redirect('/login');
            }
        })

    app.get('/logout', function (req, res, next) {
        req.session.user = null;
        req.flash('msg','您已退出登录！');
        return res.redirect('/');
    });

    app.get('/home', function(req, res, next) {
        checkNotLogin(req, res);
        res.render('home', { title: '主页'});
    });

    function checkNotLogin(req, res){
        if(!req.session.user){
            req.flash('msg','您还未登录！');
            return res.redirect('/login');
        }
    }
};
