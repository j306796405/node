var connect = require('connect'),
    users = require('./users');

var server = connect(
    connect.logger('dev'),
    connect.bodyParser(),
    connect.cookieParser(),
    connect.session({secret: 'my app secret'}),
    function(req, res, next){
        if(req.url == '/' && req.session.logged_in){
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end('Welcome back,<h3>' + req.session.name + '</h3>'
            + '<a href="/logout">Logout</a>') ;
        }else{
            next();
        }
    },
    function(req, res, next){
        if(req.url == '/' && req.method == 'GET'){
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end([
                '<form action="/login" method="POST">',
                '<filedset>',
                '<lengend>Please log in</legend>',
                '<p>User: <input type="text" name="user"></p>',
                '<p>Password: <input type="password" name="password"></p>',
                '<button>Submit</button>',
                '</filedset>',
                '</form>'
            ].join(''));
        }else{
            next();
        }
    },
    function(req, res, next){
        console.log('login page');
        if(req.url == '/login' && req.method == 'POST'){
            res.writeHead(200,{'Content-Type': 'text/html'});
            var req_name = req.body.user;
            var req_password = req.body.password;
            if(req_password == users[req_name].password && users[req_name]){
                req.session.logged_in = true;
                req.session.name = users[req_name].name;
                res.end('Authenticated');
            }else{
                console.log(users);
                res.end('wrong username/password');
            }
        }else{
            next();
        }
    },
    function(req, res, next){
        if(req.url == '/login' && req.method == 'GET'){
            res.writeHead(200,{'Content-Type': 'text/html'});
            console.log(req.session.logged_in);
            if(req.session.logged_in == true){
                res.end('Authenticated');
            }else{
                res.end('Please login');
            }
        }else{
            next();
        }
    },
    function(req, res, next){
        if(req.url == '/logout'){
            req.session.logged_in = false;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('Logged Out');
        }else{
            next();
        }
    }
);

server.listen(3000);