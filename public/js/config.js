/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise("/dashboards/subject_area");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

        .state('dashboards', {
            abstract: true,
            url: "/dashboards",
            templateUrl: "views/common/content.html"
        })
        .state('dashboards.subject_area', {
            url: "/subject_area",
            templateUrl: "views/subject_area.html"
        })
        .state('dashboards.business_entity', {
            url: "/business_entity",
            templateUrl: "views/business_entity.html"
        })
        .state('dashboards.information_product', {
            url: "/information_product",
            templateUrl: "views/information_product.html"
        })
        .state('dashboards.business_function', {
            url: "/business_function",
            templateUrl: "views/business_function.html",
            data: { pageTitle: 'Business Functions' }
        })
        .state('dashboards_top', {
            abstract: true,
            url: "/dashboards_top",
            templateUrl: "views/common/content_top_navigation.html",
        })
        .state('dashboards.business_initiative', {
            url: "/business_initiative",
            templateUrl: "views/business_initiative.html"
        })
        .state('dashboards.business_goal', {
            url: "/business_goal",
            templateUrl: "views/business_goal.html"
        })
        .state('dashboards.performance_metric', {
            url: "/performance_metric",
            templateUrl: "views/performance_metric.html"
        })
        ;

}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
