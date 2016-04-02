var app = angular.module('inspinia');
app.controller('businessEntityController',['$scope', 'datacontext','$odataresource',
    function($scope, datacontext, $odataresource){

        function getData(){
            $odataresource("http://windows-10:8080/BusinessEntity")
                .odata()
                .expand('SubjectAreas')
                .query(function(data) {
                    $scope.gridOptions = {
                        dataSource:
                        {
                            store: {
                                type: "array",
                                data: data
                            }
                        }
                        ,
                        columns: [{
                            dataField: "Name",
                            caption: "Business Entity Name"
                        },
                            {
                                dataField: "Description",
                                caption: "Description"
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
