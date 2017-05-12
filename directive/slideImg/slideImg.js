/**
 * Created by xuzhihan on 2017/3/6.
 */
(function() {
    'use strict';
        myApp.compileProvider.directive('slideImg', ['$parse', function($parse) {
            return {
                restrict: 'A',
                priority: 100000,
                scope: {
                    "slideImg":"=?",
                    "list":"=?slideImg",
                },
                replace:true,
                templateUrl:"./directive/slideImg/slideImg.html",
                link: function($scope, element, attrs) {

                    console.log($scope.data)
                    $scope.activeIndexPrev = 0;
                    $scope.activeIndex = 1;
                    $scope.activeIndexNext = 2;



                }
            };
        }]);


}());