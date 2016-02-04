var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connect = require('mongodb').Connection,
    Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});
