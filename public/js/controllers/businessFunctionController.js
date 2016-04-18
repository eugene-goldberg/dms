var app = angular.module('inspinia');
app.controller('businessFunctionController',['$scope', '$odataresource','toaster',
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
            $odataresource("http://windows-10:8080/BusinessFunction")
                .odata()
                .expand("BusinessGoals")
                .expand("BusinessInitiatives")
                .expand("BusinessQuestions")
                .expand("Governances")
                .expand("Employees")
                .expand("SubjectAreas")
                .query(function(data)
                {
                    var businessFunctions = [];

                    console.log("Business Function:  " + data[0].Name);

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
                    var udmMeasure = undefined;
                    var performanceMetric = undefined;
                    var businessInitiative = undefined;
                    var businessFunction = undefined;
                    var governance = undefined;
                    var businessQuestion = undefined;
                    var businessGoal = undefined;
                    var subjectArea = undefined;
                    var employee = undefined;

                    data.forEach(function(dataItem, dataIndex){

                        businessFunction = {"id": businessInitiativeId, "category": "Business Initiative", "title": dataItem.Name, "nodes": []};

                        dataItem.BusinessQuestions.forEach(function(bqItem, bqIdex){
                            businessQuestion = {"id": businessQuestionId,category: "Business Question", "title": bqItem.QuestionDefinition, "nodes": []};
                            businessQuestionId++;
                        });

                        dataItem.SubjectAreas.forEach(function(saItem, saIdex){
                            subjectArea = {"id": subjectAreaId,category: "Subject Area", "title": saItem.Name, "nodes": []};
                            subjectAreaId++;
                        });

                        dataItem.BusinessGoals.forEach(function(bgItem, bgIdex){
                            businessGoal = {"id": businessGoalId,category: "Business Goal", "title": bgItem.Name, "nodes": []};
                            businessGoalId++;

                        });

                        dataItem.Governances.forEach(function(gItem, gIdex){
                            governance = {"id": governanceId,category: "Governance", "title": gItem.Name, "nodes": []};
                            governanceId++;

                        });

                        dataItem.BusinessInitiatives.forEach(function(biItem, biIdex){
                            businessInitiative = {"id": businessInitiativeId,category: "Business Initiative", "title": biItem.Name, "nodes": []};
                            businessInitiativeId++;

                        });

                        dataItem.Employees.forEach(function(biItem, biIdex){
                            employee = {"id": employeeId,category: "Employee", "title": biItem.Name, "nodes": []};
                            employeeId++;

                        });


                        businessFunction.nodes.push(businessInitiative);
                        businessFunction.nodes.push(businessGoal);
                        businessFunction.nodes.push(businessQuestion);
                        businessFunction.nodes.push(governance);
                        businessFunction.nodes.push(employee);
                        businessFunction.nodes.push(subjectArea);


                        businessFunctions.push(businessFunction);
                        businessFunctionId++;
                    });

                    $scope.businessFunctionData = businessFunctions;

                }, function(err) {
                    console.log('There was an error: ', err);
                });
        }

        getData();
    }]);