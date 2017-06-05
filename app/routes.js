module.exports = function(app) {

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.post("/customerinfo", function(req, res) {

        var http = require("https");

        var options = {
            "method": "POST",
            "hostname": "ipzjnsvxnd.execute-api.us-west-2.amazonaws.com",
            "port": null,
            "path": "/DEV/execution",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "b929e970-fe22-0f4f-e659-117890fda955"
            }
        };

        var req1 = http.request(options, function (res1) {
            var chunks = [];

            res1.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res1.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });
        //console.log("{\n  \"input\": \"{ \\\"account_key\\\": \\\"9990\\\", \\\"acc1\\\": \\\"1235813\\\", \\\"acc2\\\": \\\"13711\\\",\\\"amount\\\": \\\"1000.00\\\", \\\"city\\\": \\\"BrandonTown\\\" }\",\n  \"name\": \"RequiredUniqueValueGoesHere12344\",\n  \"stateMachineArn\": \"arn:aws:states:us-west-2:217465658899:stateMachine:FICO_StateMachine3\"\n}");
        var input = req.body["input"];
        var name = req.body["name"];
        var inputString = (JSON.stringify(JSON.stringify(input)));
        var dataString = "{\n \"input\":" + inputString + "," + "\n\"name\":" + JSON.stringify(name) + ",\n" +
            "\"" + "stateMachineArn\": \"arn:aws:states:us-west-2:217465658899:stateMachine:FICO_StateMachine3\"" + "\n}";
        console.log(dataString);
        req1.write(dataString);
        req1.end();
	});
};
