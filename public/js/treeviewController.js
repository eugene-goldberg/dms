var app = angular.module('inspinia');
app.controller('treeviewController',['$scope', 'datacontext','$odataresource',
    function($scope, datacontext, $odataresource){

        function getData(){
            $odataresource("http://windows-10:8080/SubjectArea")
                .odata()
                .expand('BusinessEntities')
                .query(function(data) {
                    $scope.gridOptions = {
                        dataSource:
                        {
                            store: {
                                type: "array",
                                data: data
                                //$scope.results
                            }
                        }
                        ,
                        columns: [{
                            dataField: "Name",
                            caption: "Subject Area"
                        }
                        ],
                        masterDetail: {
                            enabled: true,
                            template: "detail"
                        }
                    };
                }, function(err) {
                    console.log('There was an error: ', err);
                });
        }

        getData();
}]);