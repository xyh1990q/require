/**
 * Created by xuzhihan on 2017/3/6.
 */
(function () {
    'use strict';
    myApp.compileProvider.directive('editor', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            priority: 100000,
            scope: {},
            replace: true,
            templateUrl: "./directive/editor/editor.html",
            link: function ($scope, element, attrs) {

                $scope.showMenu = false;


                $scope.showMenu = function () {
                    $scope.showMenu = true;
                };

                $scope.hideMenu = function () {
                    $scope.showMenu = false;
                };

                $scope.command = function () {

                };
            }
        };
    }]);


}());