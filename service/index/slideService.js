/**
 * Created by xuzhihan on 2017/3/6.
 */
(function(){
    'use strict';

    var ajaxUrl="json/slideList.json",
        slideService=function(url,$http){

            var $this=this;
            ajaxUrl=url||ajaxUrl;

            $this.getData=function(callback){
                $http.get(url).success(function(json){
                    callback(json);
                })
            };


        };




    myApp.provide.factory("slideService",["$q","$http",function($q,$http){
        //return function(url){
        //    return new slideService(url,$http);
        //};
        var listService = {}
        listService.send = function (method,url,param){
            var defer = $q.defer();
            $http({
                method: method,
                url: url,
                params: param,
            }).success(function(json){
                defer.resolve(json);
            });
            return defer.promise;
        }
        return listService;


    }])
})();