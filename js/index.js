/**
 * Created by xuzhihan on 2017/3/1.
 */


define([
    "jquery.nicescroll",
    "angular.modal",
    "angular.loadList"
],function(){

    myApp.controllerProvider.register('index',[
        "$scope","loadList","$http","Modal",
            function ($scope) {
                $scope.page="index";

                console.log("ok")
            }]
    )
});
