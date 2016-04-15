var app = angular.module('inspinia');
app.controller('businessEntityController',['$scope', '$odataresource','toaster',
    function($scope, $odataresource, toaster){

        function popAlert(){
            toaster.pop('success', "Submission Sent", "Your submission has been sent");
            console.log('popping alert');
        }

        $scope.selectedItemType="";
        $scope.selectedItemName="";

        $scope.proposedChanges = "";

        $scope.selectedItemCategory="";
        $scope.selectedItemTitle="";

        $scope.submitChanges = function(){
            console.log('proposed changes for business entity ' + $scope.selectedItemCategory + "  " + $scope.selectedItemTitle + $scope.proposedChanges);

            var ChangeRecord = $odataresource('http://windows-10:8080/ChangeRecord', {},{},{odatakey : 'id'});
            var myChangeRecord = new ChangeRecord();
            myChangeRecord.ObjectType = $scope.selectedItemCategory;
            myChangeRecord.ObjectName = $scope.selectedItemTitle;
            myChangeRecord.ProposedChangeContent =  $scope.proposedChanges;
            myChangeRecord.$save();
            popAlert();
            $scope.proposedChanges = "";
        };

        $scope.showItem = function(item){
            var info = "";
            info = item.$modelValue.title;
            //console.log(info);
            //$scope.selectedItemInfo = info;
            $scope.selectedItemType=item.$modelValue.category;
            $scope.selectedItemName=item.$modelValue.title;
            $scope.selectedItemCategory = item.$modelValue.category;
            $scope.selectedItemTitle  = item.$modelValue.title;
            //console.log('category: ' + item.$modelValue.category);
            //console.log('title: ' + item.$modelValue.title);
            //console.log($scope.selectedItemInfo);
        };

        function getData(){
            $odataresource("http://windows-10:8080/BusinessEntity")
                .odata()
                .expand("DataEntities")
                .expand("SubjectAreas")
                .query(function(data)
                {
                    var businessEntities = [];

                    console.log("Information Product:  " + data[0].Name);

                    data.forEach(function(dataItem, dataIndex){
                        var businessEntityId = 1;
                        var dataEntityId = 11;
                        var dataDeliveryChannelId = 111;
                        var dataSourceId = 121;
                        var sourceToolId = 131;
                        var udmDataAttributeId = 141;
                        var udmDimensionId = 151;
                        var udmFactId = 161;
                        var udmMeasureId = 171;
                        var subjectAreaId = 181;

                        var businessEntity = {"id": businessEntityId, "category": "Business Entity", "title": dataItem.Name, "nodes": []};

                        var dataEntity = undefined;
                        var subjectArea = undefined;

                        dataItem.SubjectAreas.forEach(function(saItem, saIdex){
                            subjectArea = {"id": subjectAreaId,category: "Subject Area", "title": saItem.Name, "nodes": []};
                            subjectAreaId++;

                        });

                        dataItem.DataEntities.forEach(function(deItem, ideIdex){
                            dataEntity = {"id": dataEntityId,category: "Data Entity", "title": deItem.Name, "nodes": []};
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

                            deItem.DataSources.forEach(function(dsItem, dsIndex){
                                var dataSource = {"id": dataSourceId,"category": "Data Source", "title": dsItem.SourceSystemName, "nodes": []};
                                dataEntity.nodes.push(dataSource);
                                dataSourceId++;
                            });

                            deItem.SourceTools.forEach(function(stItem, stIndex){
                                var sourceTool= {"id": sourceToolId,"category": "Source Tool", "title": stItem.ToolInstanceName, "nodes": []};
                                dataEntity.nodes.push(sourceTool);
                                sourceToolId++;
                            });

                            deItem.UdmDataAttributes.forEach(function(udaItem, udaIndex){
                                var udmDataAttribute= {"id": udmDataAttributeId,"category": "UDM Data Attribute", "title": udaItem.EntityAttributeName, "nodes": []};
                                dataEntity.nodes.push(udmDataAttribute);
                                udmDataAttributeId++;
                            });

                            deItem.UdmDimensions.forEach(function(uddItem, uddIndex){
                                var udmDimension= {"id": udmDimensionId,"category": "UDM Dimension", "title": uddItem.DimensionColumnName, "nodes": []};
                                dataEntity.nodes.push(udmDimension);
                                udmDimensionId++;
                            });

                            deItem.UdmFacts.forEach(function(udfItem, udfIndex){
                                var udmFact= {"id": udmFactId,"category": "UDM Fact", "title": udfItem.EntityAttributeName, "nodes": []};
                                //console.log('EntityAttributeName: ' + udfItem.EntityAttributeName);
                                dataEntity.nodes.push(udmFact);
                                udmFactId++;
                            });

                            deItem.UdmMeasures.forEach(function(udmItem, udmIndex){
                                var udmMeasure= {"id": udmMeasureId,"category": "UDM Measure", "title": udmItem.Measure, "nodes": []};
                                dataEntity.nodes.push(udmMeasure);
                                udmMeasureId++;
                            });


                        });

                        businessEntity.nodes.push(subjectArea);
                        businessEntity.nodes.push(dataEntity);
                        businessEntities.push(businessEntity);

                        businessEntityId++;
                    });

                    $scope.businessEntityData = businessEntities;

                }, function(err) {
                    console.log('There was an error: ', err);
                });
        }

        getData();
    }]);

