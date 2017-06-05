var app = angular.module('inspinia');
app.controller('analyticalMethodController',['$scope','$http','$odataresource','toaster',
    function($scope, $http, $odataresource, toaster){

        function popAlert(){
            toaster.pop('success', "Submission Sent", "Your submission has been sent");
            console.log('popping alert');
        }

        $scope.submitChanges = function(){

            var data = {
                input: {
                    account_key: $scope.account_key,
                    acc1: $scope.acc1,
                    acc2: $scope.acc2,
                    amount: $scope.amount,
                    city: $scope.city
                },
                name: (Math.random()).toString(),
                stateMachineArn: "arn:aws:states:us-west-2:217465658899:stateMachine:FICO_StateMachine3"
            };

            var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            };

            //console.log(JSON.stringify(data));

            $http.post("/customerinfo", JSON.stringify(data), config)
                .then(
                    function(response){
                        // success callback
                    },
                    function(response){
                        // failure callback
                    }
                );

            //var settings = {
            //    "async": true,
            //    "crossDomain": true,
            //    "url": "https://ipzjnsvxnd.execute-api.us-west-2.amazonaws.com/DEV/execution",
            //    "method": "POST",
            //    "headers": {
            //        "cache-control": "no-cache",
            //        "postman-token": "616ac7f2-64e7-dfe0-8ff2-fc2489696d3a",
            //        "Access-Control-Allow-Origin":  "*",
            //        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS"
            //    },
            //    "data": "{\n  \"input\": \"{ \\\"account_key\\\": \\\"9990\\\", \\\"acc1\\\": \\\"1235813\\\", \\\"acc2\\\": \\\"13711\\\",\\\"amount\\\": \\\"1000.00\\\", \\\"city\\\": \\\"BrandonTown\\\" }\",\n  \"name\": \"RequiredUniqueValueGoesHere8086\",\n  \"stateMachineArn\": \"arn:aws:states:us-west-2:217465658899:stateMachine:FICO_StateMachine3\"\n}"
            //};

            //$.ajax(settings).done(function (response) {
            //    console.log(response);
            //});
        };
    }]);
