var app = angular.module('inspinia');
app.controller('informationProductController',['$scope', '$odataresource','toaster',
    function($scope, $odataresource, toaster){

        function popAlert(){
            toaster.pop('success', "Submission Sent", "Your submission has been sent");
            console.log('popping alert');
        }

        $scope.selectedItemInfo="";

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

        $scope.showItem = function(item){
            //console.log('showItem: ');
            //console.log(item);
            var info = "";
            info = item.$modelValue.title;
            //console.log(info);
            $scope.selectedItemInfo = info;
        };

        function getData(){
            $odataresource("http://windows-10:8080/InformationProduct")
                .odata()
                .query(function(data)
                {
                    var informationProducts = [];

                    console.log("Information Product:  " + data[0].Name);

                    data.forEach(function(dataItem, dataIndex){
                        var informationProductId = 1;
                        var dataEntityId = 11;
                        var dataDeliveryChannelId = 111;
                        var informationProduct = {"id": informationProductId, "category": "Information Product", "title": dataItem.Name, "nodes": []};
                        dataItem.DataEntities.forEach(function(deItem, ideIdex){
                            var dataEntity = {"id": dataEntityId,category: "Data Entity", "title": deItem.Name, "nodes": []};
                            dataEntityId++;
                            //console.log('DataEntity:');
                            //console.log(deItem);
                            deItem.DataDeliveryChannels.forEach(function(ddcItem, ddcIndex){
                                var dataDeliveryChannel = {"id": dataDeliveryChannelId,"category": "Data Delivery Channel", "title": ddcItem.SourceSystemName, "nodes": []};
                                dataEntity.nodes.push(dataDeliveryChannel);
                                dataDeliveryChannelId++;
                                //console.log('DataDeliveryChannel:');
                                //console.log(ddcItem);
                            });
                            informationProduct.nodes.push(dataEntity);
                        });
                        informationProducts.push(informationProduct);
                        informationProductId++;
                    });

                    $scope.informationProductData = informationProducts;

                }, function(err) {
                    console.log('There was an error: ', err);
                });
        }

        getData();
    }]);

