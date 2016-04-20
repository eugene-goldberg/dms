var app = angular.module('inspinia');
app.controller('analyticalMethodController',['$scope', '$odataresource','toaster',
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
            $odataresource("http://windows-10:8080/AnalyticalMethod")
                .odata()
                .expand("BusinessEntities")
                .expand("BusinessQuestions")
                .expand("PerformanceMetrics")
                .query(function(data)
                {
                    var analyticalMethods = [];

                    console.log("Analytical Method:  " + data[0].MethodName);

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
                    var employeeId = 991;

                    var dataEntity = undefined;
                    var analyticalMethod = undefined;
                    var businessEntity = undefined;
                    var sourceTool = undefined;
                    var dataDeliveryChannel = undefined;
                    var dataSource = undefined;
                    var udmDataAttribute = undefined;
                    var udmDimension = undefined;
                    var udmFact = undefined;
                    var informationProduct = undefined;
                    var performanceMetric = undefined;
                    var businessInitiative = undefined;
                    var businessFunction = undefined;
                    var governance = undefined;
                    var businessQuestion = undefined;
                    var businessGoal = undefined;
                    var subjectArea = undefined;
                    var employee = undefined;

                    data.forEach(function(dataItem, dataIndex){

                        analyticalMethod = {"id": analyticalMethodId, "category": "Analytical Method", "title": dataItem.MethodName, "nodes": []};

                        dataItem.BusinessQuestions.forEach(function(bqItem, bqIdex){
                            businessQuestion = {"id": businessQuestionId,category: "Business Question", "title": bqItem.QuestionDefinition, "nodes": []};
                            businessQuestionId++;
                        });

                        dataItem.BusinessEntities.forEach(function(beItem, beIdex){
                            businessEntity = {"id": businessEntityId,category: "Business Entity", "title": beItem.Name, "nodes": []};
                            businessEntityId++;
                        });

                        dataItem.PerformanceMetrics.forEach(function(pmItem, pmIdex){
                            performanceMetric = {"id": performanceMetricId,category: "Performance Metric", "title": pmItem.MetricName, "nodes": []};
                            performanceMetricId++;
                        });

                        if(businessQuestion){
                            analyticalMethod.nodes.push(businessQuestion);
                        }
                        if(businessEntity){
                            analyticalMethod.nodes.push(businessEntity);
                        }
                        if(performanceMetric){
                            analyticalMethod.nodes.push(performanceMetric);
                        }

                        analyticalMethods.push(analyticalMethod);
                        analyticalMethodId++;
                    });

                    $scope.analyticalMethodData = analyticalMethods;

                }, function(err) {
                    console.log('There was an error: ', err);
                });
        }

        getData();
    }]);