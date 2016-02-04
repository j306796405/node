var request = require('request'),
    fs = require('fs'),
    iconv = require('iconv-lite'),
    xml2js = require('xml2js');
//º”‘ÿ“≥√Ê
/*
request('http://sports.qq.com/nba/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var content = iconv.encode(body, 'gbk');
        fs.writeFile('requestFile.html', content, function(err){
            if(err) throw err;
            console.log("success");
        });
    }
})*/
//Ω‚Œˆxml
var parser = new xml2js.Parser({explicitArray : false});
var builder = new xml2js.Builder();
request('http://www.w3school.com.cn/example/xmle/note.xml', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(parser.parseString(body));

        parser.parseString(body, function (err, result) {
            console.dir(result);
            console.log('Done');
        });
    }
})