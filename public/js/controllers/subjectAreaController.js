var app = angular.module('inspinia');
app.controller('subjectAreaController',['$scope', 'datacontext','$odataresource',
    function($scope, datacontext, $odataresource){

        $scope.proposedChanges = "";

        $scope.selectedSubjectArea="";

        $scope.submitChanges = function(){
            console.log('proposed changes for subject area ' + $scope.selectedSubjectArea + ":  " + $scope.proposedChanges);
        };

        function getData(){
            $odataresource("http://windows-10:8080/SubjectArea")
                .odata()
                .expand('BusinessEntities')
                .expand('BusinessFunctions')
                .query(function(data) {
                    $scope.gridOptions = {
                        dataSource:
                        {
                            store: {
                                type: "array",
                                data: data
                            }
                        },
                        bindingOptions: {
                            rowAlternationEnabled: "rowAlternationEnabled"
                        }
                        ,
                        columns: [{
                            dataField: "Name",
                            caption: "Subject Area"
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
                            $scope.selectedSubjectArea = selection.Name;
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
