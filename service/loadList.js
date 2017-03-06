/**
 * Created by ai-situo on 2016/7/26.
 */
(function(w){
    var ajaxUrl="",
        loadList=function(url,$http){

            var $this=this;
            ajaxUrl=url||ajaxUrl;
            $this.param={}
            $this.setWhere=function(where,callback,url){
                ajaxUrl=url||ajaxUrl;
                $this.param=angular.extend($this.param,where);
                $this.load(callback);
            };

            $this.clearWhere=function(where,callback,url){
                ajaxUrl=url||ajaxUrl;
                $this.param=angular.extend({},where);
                $this.load(callback);
            }
            $this.nextPage=function(callback){
                var page=$this.param.page + 1;
                $this.setWhere({
                    page: page
                },callback)
            }
            $this.prevPage=function(callback){
                var page=$this.param.page - 1;
                if(page<0){
                    page=0;
                }
                $this.setWhere({
                    page: page
                },callback)
            }
            $this.load=function(callback){
                callback=callback||angular.noop;

                $http({
                    url:ajaxUrl,
                    method:'GET',
                    params:$this.param
                }).success(function(data){
                    callback(data);
                })
            }

        }

    myApp.provide.factory("loadList",["$http",function($http){
        return function(url){
            return new loadList(url,$http);
        };
    }])
})(window);