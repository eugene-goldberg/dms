var app = angular.module('inspinia');
app.controller('analyticalMethodController',['$scope','$http','$odataresource','toaster',
    function($scope, $http, $odataresource, toaster){

        function popAlert(){
            toaster.pop('success', "Submission Sent", "Your submission has been sent");
            console.log('popping alert');
        }

        $scope.submitChanges = function(){

            var data = {
                account_key: $scope.account_key,
                acc1: $scope.acc1,
                acc2: $scope.acc2,
                amount: $scope.amount,
                city: $scope.city
            };

            var config = {
                headers : {
                    'Content-Type': 'application/json;'
                }
            };

            $http.post("/customerinfo", JSON.stringify(data), config)
                .then(
                    function(response){
                        // success callback
                    },
                    function(response){
                        // failure callback
                    }
                );
        };
    }]);
