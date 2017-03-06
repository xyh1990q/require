/**
 * Created by xuzhihan on 2017/3/2.
 */
(function() {
    'use strict';

    console.log(myApp)
    myApp.compileProvider.directive('menu', ['$parse', function($parse) {
        console.log(1111)


        return {
            restrict: 'A',
            priority: 100000,
            replace : true,
            scope: {

            },
            link: function($scope, element, attrs) {
                console.log(1111)
            }
        };
    }]);
})();