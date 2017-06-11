var app = angular.module('inspinia');
app.controller('analyticalMethodController',['$scope','$http','$odataresource','toaster',
    function($scope, $http, $odataresource, toaster){

        function popAlert(){
            toaster.pop('success', "Submission Sent", "Your submission has been sent");
            console.log('popping alert');
        }

        $scope.customer_name = undefined;
        $scope.account_key = undefined;
        $scope.acc1 = undefined;
        $scope.acc2 = undefined;
        $scope.amount = undefined;
        $scope.city = undefined;

        $scope.customers = [
            {"id": 1, "name": "J.L.Webb"},
            {"id": 2, "name": "P.J.Griffin"}
        ];

        $scope.selectedCustomer = {};

        $scope.$watch("selectedCustomer", function() {
            $scope.loading = false;
            $scope.hideOffer = true;
            $scope.hideSelectedOffer = true;
            $scope.hideList = true;

            if ($scope.selectedCustomer.name == "J.L.Webb") {
                $scope.customer_name = "J.L.Webb";
                $scope.account_key = 7777;
                $scope.acc1 = 77;
                $scope.acc2 = 55;
                $scope.amount = 47;
                $scope.city = "Chicago";
            }
            if ($scope.selectedCustomer.name == "P.J.Griffin") {
                $scope.customer_name = "P.J.Griffin";
                $scope.account_key = 9389;
                $scope.acc1 = 25;
                $scope.acc2 = 55;
                $scope.amount = 37;
                $scope.city = "Atlanta";
            }
        });

        //$scope.customer_name = "J.L. Webb";
        //$scope.account_key = 7777;
        //$scope.acc1 = 77;
        //$scope.acc2 = 55;
        //$scope.amount = 47;
        //$scope.city = "Chicago";

        $scope.offerID = undefined;
        $scope.loading = false;
        $scope.hideList = true;
        $scope.hideOffer = true;
        $scope.hideSelectedOffer = true;

        var name = Math.random().toString();

        $scope.submitChanges = function(){
            $scope.loading = true;
            $scope.hideList = false;
            $scope.hideOffer = false;
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
                        $scope.hideOffer = false;
                        //$scope.hideList = true;
                        $scope.hideSelectedOffer = false;
                        $scope.hideOffer = true;
                    },
                    function(response){
                        // failure callback
                    }
                );
        };
    }]);
