var app = angular.module('inspinia');
app.controller('businessInitiativeController',['$scope', '$odataresource','toaster',
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
            console.log('proposed changes for information product ' + $scope.selectedItemCategory + "  " + $scope.selectedItemTitle + $scope.proposedChanges);

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
            $scope.selectedItemType=item.$modelValue.category;
            $scope.selectedItemName=item.$modelValue.title;
            $scope.selectedItemCategory = item.$modelValue.category;
            $scope.selectedItemTitle  = item.$modelValue.title;
        };

        function getData(){
            $odataresource("http://windows-10:8080/BusinessInitiative")
                .odata()
                .expand("BusinessEntities")
                .expand("BusinessFunctions")
                .expand("BusinessGoals")
                .expand("Governances")
                .expand("PerformanceMetrics")
                .expand("SubjectAreas")
                .query(function(data)
                {
                    var businessInitiatives = [];

                    console.log("Business Initiative:  " + data[0].Name);

                    var informationProductId = 1;
                    var dataEntityId = 11;
                    var dataDeliveryChannelId = 111;
                    var dataSourceId = 121;
                    var sourceToolId = 131;
                    var udmDataAttributeId = 141;
                    var udmDimensionId = 151;
                    var udmFactId = 161;
                    var udmMeasureId = 171;
                    var analyticalMethodId = 181;
                    var businessEntityId = 191;
                    var subjectAreaId = 291;
                    var performanceMetricId = 391;
                    var businessInitiativeId = 491;
                    var businessFunctionId = 591;
                    var governanceId = 691;
                    var businessQuestionId = 791;
                    var businessGoalId = 891;

                    var dataEntity = undefined;
                    var analyticalMethod = undefined;
                    var businessEntity = undefined;
                    var sourceTool = undefined;
                    var dataDeliveryChannel = undefined;
                    var dataSource = undefined;
                    var udmDataAttribute = undefined;
                    var udmDimension = undefined;
                    var udmFact = undefined;
                    var udmMeasure = undefined;
                    var performanceMetric = undefined;
                    var businessInitiative = undefined;
                    var businessFunction = undefined;
                    var governance = undefined;
                    var businessQuestion = undefined;
                    var businessGoal = undefined;
                    var subjectArea = undefined;

                    data.forEach(function(dataItem, dataIndex){

                        businessInitiative = {"id": businessInitiativeId, "category": "Business Initiative", "title": dataItem.Name, "nodes": []};

                        dataItem.BusinessEntities.forEach(function(beItem, beIdex){
                            businessEntity = {"id": businessEntityId,category: "Business Entity", "title": beItem.Name, "nodes": []};
                            businessEntityId++;

                            beItem.DataEntities.forEach(function(deItem, ideIdex){
                                dataEntity = {"id": dataEntityId,category: "Data Entity", "title": deItem.Name, "nodes": []};
                                dataEntityId++;
                                //console.log('DataEntity:');
                                //console.log(deItem);
                                deItem.DataDeliveryChannels.forEach(function(ddcItem, ddcIndex){
                                    dataDeliveryChannel = {"id": dataDeliveryChannelId,"category": "Data Delivery Channel", "title": ddcItem.SourceSystemName, "nodes": []};
                                    dataEntity.nodes.push(dataDeliveryChannel);
                                    dataDeliveryChannelId++;
                                    //console.log('DataDeliveryChannel:');
                                    //console.log(ddcItem);
                                });

                                deItem.DataSources.forEach(function(dsItem, dsIndex){
                                    dataSource = {"id": dataSourceId,"category": "Data Source", "title": dsItem.SourceSystemName, "nodes": []};
                                    dataEntity.nodes.push(dataSource);
                                    dataSourceId++;
                                });

                                deItem.SourceTools.forEach(function(stItem, stIndex){
                                    sourceTool= {"id": sourceToolId,"category": "Source Tool", "title": stItem.ToolInstanceName, "nodes": []};
                                    dataEntity.nodes.push(sourceTool);
                                    sourceToolId++;
                                });

                                deItem.UdmDataAttributes.forEach(function(udaItem, udaIndex){
                                    udmDataAttribute= {"id": udmDataAttributeId,"category": "UDM Data Attribute", "title": udaItem.EntityAttributeName, "nodes": []};
                                    dataEntity.nodes.push(udmDataAttribute);
                                    udmDataAttributeId++;
                                });

                                deItem.UdmDimensions.forEach(function(uddItem, uddIndex){
                                    udmDimension= {"id": udmDimensionId,"category": "UDM Dimension", "title": uddItem.DimensionColumnName, "nodes": []};
                                    dataEntity.nodes.push(udmDimension);
                                    udmDimensionId++;
                                });

                                deItem.UdmFacts.forEach(function(udfItem, udfIndex){
                                    udmFact= {"id": udmFactId,"category": "UDM Fact", "title": udfItem.EntityAttributeName, "nodes": []};
                                    //console.log('EntityAttributeName: ' + udfItem.EntityAttributeName);
                                    dataEntity.nodes.push(udmFact);
                                    udmFactId++;
                                });

                                deItem.UdmMeasures.forEach(function(udmItem, udmIndex){
                                    udmMeasure= {"id": udmMeasureId,"category": "UDM Measure", "title": udmItem.Measure, "nodes": []};
                                    dataEntity.nodes.push(udmMeasure);
                                    udmMeasureId++;
                                });
                            });

                            businessEntity.nodes.push(dataEntity);
                        });

                        dataItem.PerformanceMetrics.forEach(function(pmItem, pmIdex){
                            performanceMetric = {"id": performanceMetricId,category: "Performance Metric", "title": pmItem.MetricName, "nodes": []};
                            performanceMetricId++;
                        });

                        dataItem.BusinessFunctions.forEach(function(bfItem, bfIdex){
                            businessFunction = {"id": businessFunctionId,category: "Business Function", "title": bfItem.Name, "nodes": []};
                            businessFunctionId++;
                        });

                        dataItem.Governances.forEach(function(gItem, gIdex){
                            governance = {"id": governanceId,category: "Governance", "title": gItem.Name, "nodes": []};
                            governanceId++;
                        });

                        dataItem.BusinessGoals.forEach(function(bgItem, bgIdex){
                            businessGoal = {"id": businessGoalId,category: "Business Goal", "title": bgItem.Name, "nodes": []};
                            businessGoalId++;
                        });

                        dataItem.SubjectAreas.forEach(function(saItem, saIdex){
                            subjectArea = {"id": subjectAreaId,category: "Subject Area", "title": saItem.Name, "nodes": []};
                            subjectAreaId++;
                        });

                        if(performanceMetric){
                            businessInitiative.nodes.push(performanceMetric);
                        }
                        if(businessFunction){
                            businessInitiative.nodes.push(businessFunction);
                        }
                        if(businessGoal){
                            businessInitiative.nodes.push(businessGoal);
                        }
                        if(governance){
                            businessInitiative.nodes.push(governance);
                        }
                        if(subjectArea){
                            businessInitiative.nodes.push(subjectArea);
                        }
                        if(businessEntity){
                            businessInitiative.nodes.push(businessEntity);
                        }

                        businessInitiatives.push(businessInitiative);
                        businessInitiativeId++;
                    });

                    $scope.businessInitiativeData = businessInitiatives;

                }, function(err) {
                    console.log('There was an error: ', err);
                });
        }

        getData();
    }]);