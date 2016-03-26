var app = angular.module('inspinia');
app.controller('treeviewController',['$scope', 'datacontext', function($scope, datacontext){

    $scope.treeListItems = [];

    $scope.Description = "";

    datacontext.getSubjectAreas.then(function(data){
        $scope.treeListItems = data;
        //console.log(angular.toJson(data));
    });

    $scope.treeViewOptions = {
        width: 300,
        bindingOptions: {
            items: "treeListItems",
            searchValue: "searchValue"
        },
        onItemClick: function(e) {
            var item = e.itemData;
            $scope.Description = item.Description;
            console.log('item id: ' + item.id);
            console.log('item text: ' + item.text);
        }
    };
}]);