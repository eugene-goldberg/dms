var app = angular.module('inspinia');
app.controller('analyticalMethodController',['$scope','$http','$odataresource','toaster',
    function($scope, $http, $odataresource, toaster){

        function popAlert(){
            toaster.pop('success', "Submission Sent", "Your submission has been sent");
            console.log('popping alert');
        }

        $scope.offerID = "";

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

            $http.post("/customerinfo", JSON.stringify(data), config)
                .then(
                    function(response){
                        console.log(response);
                    },
                    function(response){
                        // failure callback
                    }
                );
        };
    }]);
