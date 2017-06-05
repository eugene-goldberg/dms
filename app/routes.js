module.exports = function(app) {

    var querystring = require('querystring');
    var http = require('http');
    http.post = require('http-post');

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.post("/customerinfo", function(req, res) {
        console.log("name: " + req.body["customer_name"]);

        var post_data = querystring.stringify({
            "account_key": "3635",
            "acc1": "4561231",
            "acc2": "789098",
            "amount": "123.89",
            "city": "Gotham"
        });

        // An object of options to indicate where to post to
        var post_options = {
            host: 'o15zkkb02c.execute-api.us-west-2.amazonaws.com',
            port: '443',
            path: '/staging/api',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(post_data),
                "postman-token": "0540962c-c8eb-ae11-4053-f6340c14355e"
            }
        };

        http.post(post_options, post_data, function(res){
            console.log("account_key: " + req.body["account_key"]);
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                console.log(chunk);
            });
        });
	});

};
