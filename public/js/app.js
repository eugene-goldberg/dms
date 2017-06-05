/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function () {
    angular.module('inspinia', [
        'ui.router',                    // Routing
        'oc.lazyLoad',
        'ngAnimate',
        'toaster',
        'ui.bootstrap',                 // Ui Bootstrap
        'pascalprecht.translate',       // Angular Translate
        'ngIdle',                       // Idle timer
        'ngSanitize',
        'ODataResources',
        'ui.tree'
        //'dx',
        //'sticky'

    ])
})();

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad
