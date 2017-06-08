module.exports = function(app) {

    var http = require("https");

    var mysql = require('mysql');

    var resultCode;


    var con = mysql.createConnection({

        host: "ficodemo2.cegeld064h3q.us-west-2.rds.amazonaws.com",
        user: "root",
        password: "xt9L4U2032379"
    });

    con.connect(function(err) {

    //var sql = "select ollFrcRsnCde from fico_decisions.processed_records where account_key = " + ;
    //
    //var sql = "select ollFrcRsnCde from fico_decisions.processed_records";
    //
    //con.connect(function(err) {
    //    if (err) throw err;
    //    console.log("Connected!");
    //    con.query(sql, function (err, result) {
    //        if (err) throw err;
    //        console.log("Result: " + result[0].ollFrcRsnCde);
    //    });
    //});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

	app.post("/customerinfo", function(req, res) {


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

        var account_key = req.body.input.account_key;

        var req1 = http.request(options, function (res1) {
            var chunks = [];

            res1.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res1.on("end", function () {


                    if (err) throw err;
                    console.log("Connected!");
                    con.query("select ollFrcRsnCde from fico_decisions.processed_records where account_key = " + account_key,
                        function (err, result) {
                        if (err) throw err;
                        console.log("Result: " + result[0].ollFrcRsnCde);
                        resultCode = result[0].ollFrcRsnCde;

                        var body = Buffer.concat(chunks);
                        console.log(body.toString());
                        //res.write(body.toString());
                        res.write(resultCode.toString());
                        res.end();
                    });


                //var body = Buffer.concat(chunks);
                //console.log(body.toString());
                ////res.write(body.toString());
                //res.write(resultCode.toString());
                //res.end();
            });
        });
        //console.log("{\n  \"input\": \"{ \\\"account_key\\\": \\\"9990\\\", \\\"acc1\\\": \\\"1235813\\\", \\\"acc2\\\": \\\"13711\\\",\\\"amount\\\": \\\"1000.00\\\", \\\"city\\\": \\\"BrandonTown\\\" }\",\n  \"name\": \"RequiredUniqueValueGoesHere12344\",\n  \"stateMachineArn\": \"arn:aws:states:us-west-2:217465658899:stateMachine:FICO_StateMachine3\"\n}");
        var input = req.body["input"];
        var name = req.body["name"];
        var inputString = (JSON.stringify(JSON.stringify(input)));
        var dataString = "{\n \"input\":" + inputString + "," + "\n\"name\":" + JSON.stringify(name) + ",\n" +
            "\"" + "stateMachineArn\": \"arn:aws:states:us-west-2:217465658899:stateMachine:FICO_StateMachine3\"" + "\n}";
        //console.log(dataString);
        req1.write(dataString);
        req1.end();

        //res.write("got it");
        //res.end();

        console.log("got it");
	});

    });
};
