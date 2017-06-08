var app = angular.module('inspinia');
app.controller('analyticalMethodController',['$scope','$http','$odataresource','toaster',
    function($scope, $http, $odataresource, toaster){

        function popAlert(){
            toaster.pop('success', "Submission Sent", "Your submission has been sent");
            console.log('popping alert');
        }

        $scope.offerID = undefined;
        $scope.loading = false;

        var name = Math.random().toString();

        $scope.submitChanges = function(){
            $scope.loading = true;
            console.log("name:  " + name);
            var data = {
                input: {
                    account_key: $scope.account_key,
                    acc1: $scope.acc1,
                    acc2: $scope.acc2,
                    amount: $scope.amount,
                    city: $scope.city
                },
                name: name,
                stateMachineArn: "arn:aws:states:us-west-2:390458232574:stateMachine:FICO_StateMachine3"
            };

            var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            };

            $http.post("/customerinfo", JSON.stringify(data), config)
                .then(
                    function(response){
                        console.log(response.data);
                        //$scope.offerID = (response.data.startDate).toString().substring(7,12).replace("\.","");
                        $scope.offerID = response.data;
                        $scope.loading = false;
                    },
                    function(response){
                        // failure callback
                    }
                );
        };
    }]);
