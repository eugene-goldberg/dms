var app = angular.module('inspinia');
app.controller('dataSourceController',['$scope', '$odataresource','toaster',
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
            $odataresource("http://windows-10:8080/DataSource")
                .odata()
                .expand("DataEntities")
                .expand("SourceTools")
                .expand("DataDeliveryChannels")
                .query(function(data)
                {
                    var dataSources = [];

                    console.log("Data Source:  " + data[0].SourceSystemName);

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
                    var businessQuestionId = 191;
                    var analyticalMethodId = 211;
                    var performanceMetricId = 311;
                    var businessGoalId = 411;
                    var businessInitiativeId = 511;
                    var governanceId = 611;
                    var odsDataAttributeId = 811;

                    var dataEntity = undefined;
                    var udmDataAttribute = undefined;
                    var businessQuestion = undefined;
                    var udmMeasure = undefined;
                    var udmFact = undefined;
                    var udmDimension = undefined;
                    var dataDeliveryChannel = undefined;
                    var sourceTool = undefined;
                    var dataSource = undefined;

                    data.forEach(function(deItem, deIndex){

                        dataSource = {"id": dataSourceId, "category": "Data Source", "title": deItem.SourceSystemName, "nodes": []};

                        deItem.DataEntities.forEach(function(dItem, ideIdex){
                            dataEntity = {"id": dataEntityId,category: "Data Entity", "title": dItem.Name, "nodes": []};
                            dataEntityId++;
                            dItem.DataDeliveryChannels.forEach(function(ddcItem, ddcIndex){
                                dataDeliveryChannel = {"id": dataDeliveryChannelId,"category": "Data Delivery Channel", "title": ddcItem.SourceSystemName, "nodes": []};
                                dataEntity.nodes.push(dataDeliveryChannel);
                                dataDeliveryChannelId++;
                            });

                            dItem.SourceTools.forEach(function(stItem, stIndex){
                                sourceTool= {"id": sourceToolId,"category": "Source Tool", "title": stItem.ToolInstanceName, "nodes": []};
                                dataEntity.nodes.push(sourceTool);
                                sourceToolId++;
                            });

                            dItem.UdmDataAttributes.forEach(function(udaItem, udaIndex){
                                udmDataAttribute= {"id": udmDataAttributeId,"category": "UDM Data Attribute", "title": udaItem.EntityAttributeName, "nodes": []};
                                dataEntity.nodes.push(udmDataAttribute);
                                udmDataAttributeId++;
                            });

                            dItem.UdmDimensions.forEach(function(uddItem, uddIndex){
                                udmDimension= {"id": udmDimensionId,"category": "UDM Dimension", "title": uddItem.DimensionColumnName, "nodes": []};
                                dataEntity.nodes.push(udmDimension);
                                udmDimensionId++;
                            });

                            dItem.UdmFacts.forEach(function(udfItem, udfIndex){
                                udmFact= {"id": udmFactId,"category": "UDM Fact", "title": udfItem.EntityAttributeName, "nodes": []};
                                //console.log('EntityAttributeName: ' + udfItem.EntityAttributeName);
                                dataEntity.nodes.push(udmFact);
                                udmFactId++;
                            });

                            dItem.UdmMeasures.forEach(function(udmItem, udmIndex){
                                udmMeasure= {"id": udmMeasureId,"category": "UDM Measure", "title": udmItem.Measure, "nodes": []};
                                dataEntity.nodes.push(udmMeasure);
                                udmMeasureId++;
                            });
                            dataSource.nodes.push(dataEntity);
                        });


                        dataSources.push(dataSource);
                        dataSourceId++;
                    });

                    $scope.dataSourceData = dataSources;

                }, function(err) {
                    console.log('There was an error: ', err);
                });
        }

        getData();
    }]);

