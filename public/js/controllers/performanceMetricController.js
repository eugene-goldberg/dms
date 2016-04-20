var app = angular.module('inspinia');
app.controller('performanceMetricController',['$scope', '$odataresource','toaster',
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
            $odataresource("http://windows-10:8080/PerformanceMetric")
                .odata()
                .expand("BusinessEntities")
                .expand("SubjectAreas")
                .expand("BusinessQuestions")
                .expand("AnalyticalMethods")
                .expand("BusinessGoals")
                .query(function(data)
                {
                    var performanceMetrics = [];

                    console.log("Performance Metric:  " + data[0].Name);

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
                    var sourceToolId = 711;
                    var odsDataAttributeId = 811;
                    var dataEntity = undefined;
                    var subjectArea = undefined;
                    var businessQuestion = undefined;
                    var analyticalMethod = undefined;
                    var performanceMetric = undefined;
                    var businessGoal = undefined;
                    var businessInitiative = undefined;
                    var governance = undefined;
                    var sourceTool = undefined;
                    var businessEntity = undefined;

                    data.forEach(function(dataItem, dataIndex){

                        performanceMetric = {"id": performanceMetricId, "category": "Performance Metric", "title": dataItem.Name, "nodes": []};

                        dataItem.SubjectAreas.forEach(function(saItem, saIdex){
                            subjectArea = {"id": subjectAreaId,category: "Subject Area", "title": saItem.Name, "nodes": []};
                            subjectAreaId++;

                        });

                        dataItem.BusinessQuestions.forEach(function(bqItem, bqIdex){
                            businessQuestion = {"id": businessQuestionId,category: "Business Question", "title": bqItem.QuestionDefinition, "nodes": []};
                            businessQuestionId++;

                        });

                        dataItem.BusinessGoals.forEach(function(bgItem, bgIdex){
                            businessGoal = {"id": businessGoalId,category: "Business Goal", "title": bgItem.Name, "nodes": []};
                            businessGoalId++;

                        });

                        dataItem.AnalyticalMethods.forEach(function(amItem, amIdex){
                            analyticalMethod = {"id": analyticalMethodId,category: "Analytical Method", "title": amItem.MethodName, "nodes": []};
                            analyticalMethodId++;

                        });

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
                                businessEntity.nodes.push(dataEntity);
                            });
                        });


                        if(analyticalMethod){
                            performanceMetric.nodes.push(analyticalMethod);
                        }
                        if(businessGoal){
                            performanceMetric.nodes.push(businessGoal);
                        }
                        if(businessInitiative){
                            performanceMetric.nodes.push(businessInitiative);
                        }
                        if(businessQuestion){
                            performanceMetric.nodes.push(businessQuestion);
                        }
                        if(governance){
                            performanceMetric.nodes.push(governance);
                        }
                        if(subjectArea){
                            performanceMetric.nodes.push(subjectArea);
                        }
                        if(businessEntity){
                            performanceMetric.nodes.push(businessEntity);
                        }

                        performanceMetrics.push(performanceMetric);
                        performanceMetricId++;
                    });

                    $scope.performanceMetricData = performanceMetrics;

                }, function(err) {
                    console.log('There was an error: ', err);
                });
        }

        getData();
    }]);

