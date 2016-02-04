var xml2js = require('xml2js'),
    request = require('request');
module.exports = function(app){
    app.get('/login', function (req, res) {
        var ticket = req.query.ticket,
            service = req.query.service,
            LOGIN_URL = 'https://cas.ctripcorp.com/caso/login?service=',
            USER_INFO_URL = 'https://cas.ctripcorp.com/caso/serviceValidate?service=' + service + '&ticket=' + ticket,
            user = {};

        //先判断请求的session中是否存在该user
        if (req.session.user) {
            res.status(200).send(req.session.user);
        } else {
            //不存在的话判断是否有传ticket参数
            if (ticket) {
                request(USER_INFO_URL, {strictSSL: false}, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        //explicitArray value不需要以数组形式展现
                        var parser = new xml2js.Parser({explicitArray : false});
                        parser.parseString(body, function (err, result) {
                            user = result;
                            var isSuccess = user['cas:serviceResponse']['cas:authenticationSuccess'];
                            if(isSuccess){
                                var name = isSuccess['cas:user'],
                                    department = isSuccess['cas:attributes']['cas:department'];
                                if(name && department){
                                    req.session.user = {
                                        name: name,
                                        department: department
                                    }
                                }else{
                                    res.status(500).send({error: 'not logged in', redirect: LOGIN_URL});
                                }
                            }
                            console.log(req.session.user);
                            res.status(200).send(user);
                        });
                    }else{
                        res.status(500).send(error);
                    }
                })
            }else{
                //也没有ticket的话 返回500 告诉前台需要重新登录
                res.status(500).send({error: 'not logged in', redirect: LOGIN_URL});
            }
        }
    })
}