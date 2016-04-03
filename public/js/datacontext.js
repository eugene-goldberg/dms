(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('inspinia')
        .factory(serviceId, ['$q','$http', datacontext]);

    function datacontext($q, $http) {
        //return {
        //    getSubjectAreas: (function(response) {
        //
        //        return $http.get('http://windows-10:8080/api/demo/')
        //            .then(function(response) {
        //                return response.data;
        //            });
        //    })()
        //};
    }
})();