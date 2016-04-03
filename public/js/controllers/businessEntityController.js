var app = angular.module('inspinia');
app.controller('businessEntityController',['$scope','$odataresource',
    function($scope, $odataresource){

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
                        selection: {
                            mode: "single"
                        },
                        hoverStateEnabled: true,
                        onSelectionChanged: function (selectedItems) {
                            var selection = selectedItems.selectedRowsData[0];
                            var s = selection;
                            console.log(selection.Name);
                        },
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
