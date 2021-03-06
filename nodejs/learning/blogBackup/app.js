var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var multer = require('multer');

var app = express();

// view engine setup
app.set('port',process.env.PORT || 8888);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db, //cookie name
    cookie: {maxAge: 1000*60*60*24*30}, //30 days
    store: new MongoStore({ //这是什么
        db: settings.db,
        host: settings.host,
        port: settings.port
    })
}))
app.use(multer({
    dest: './public/images',
    rename: function(fieldname, filename){
        return filename
    }
}))

routes(app);

app.listen(app.get('port'), function(){
    console.log('server is started!');
})


