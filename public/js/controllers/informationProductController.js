var app = angular.module('inspinia');
app.controller('informationProductController',['$scope', '$odataresource','toaster',
    function($scope, $odataresource, toaster){

        function popAlert(){
            toaster.pop('success', "Submission Sent", "Your submission has been sent");
            console.log('popping alert');
        }

        $scope.proposedChanges = "";

        $scope.selectedInformationProduct="";

        $scope.submitChanges = function(){
            console.log('proposed changes for information product ' + $scope.selectedInformationProduct + ":  " + $scope.proposedChanges);

            var ChangeRecord = $odataresource('http://windows-10:8080/ChangeRecord', {},{},{odatakey : 'id'});
            var myChangeRecord = new ChangeRecord();
            myChangeRecord.ObjectType = "InformationProduct";
            myChangeRecord.ObjectName = $scope.selectedInformationProduct;
            myChangeRecord.ProposedChangeContent =  $scope.proposedChanges;
            myChangeRecord.$save();
            popAlert();
            $scope.proposedChanges = "";
        };

        function getData(){
            $odataresource("http://windows-10:8080/InformationProduct")
                .odata()
                //.expand('DataEntities')
                .query(function(data)
                {
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
                            caption: "Information Product"
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
                            $scope.selectedInformationProduct = selection.Name;
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

