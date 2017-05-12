/**
 * Created by xuzhihan on 2016/10/8.
 */

var myApp;
define(["angular", "angular-route","bootstrap","ui-bootstrap"],function(){
    myApp=angular.module("myApp",["ngRoute","ui.bootstrap"])
        .config([
            "$routeProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$httpProvider", "$provide",
            function($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $httpProvider, $provide){
                /**
                 * 提供register用于外部注册
                 */
                myApp.controllerProvider = $controllerProvider;
                myApp.compileProvider = $compileProvider;
                myApp.provide = $provide;
                myApp.filterProvider = $filterProvider;

               // require(["angular.leftMenu"], function(){});


                $httpProvider.defaults.transformRequest = function(data) {
                    if (angular.isObject(data) && String(data) !== "[object File]") {
                        data = $.param(data)
                            .replace(/=true(&|$)/g, "=1$1")
                            .replace(/=false(&|$)/g, "=$1");
                    }
                    return data;
                };
                $httpProvider.defaults.headers.post = {
                    "Content-Type": "application/x-www-form-urlencoded"
                };


                $routeProvider
                    .when("/:page", {
                        templateUrl:function(param){
                            return "templates/"+param.page+".html"
                        },
                        resolve: {
                            load: ["$q","$route", function($q,$route) {

                                var page=$route.current.params.page;
                                var defer = $q.defer();
                                //$.loadCSS("css/"+page+".css"+ "?" + cloud.staticVersion);
                                require([
                                    "js/"+page+".js"+ "?" + cloud.staticVersion,
                                    "style!css/"+page+".css"
                                ], function() {
                                    defer.resolve();
                                });
                                return defer.promise;
                            }]
                        }
                    })
                    .otherwise({
                        redirectTo: "index"
                    });
            }
        ]);



    //公用主体
    myApp.controller("main-controller", [
        "$scope","$location","$rootScope","$sce","$http",
        function ($scope,$location,$rootScope,$sce,$http) {
            $scope.isShowLoading=false;
            $scope.$on("loading", function(e, isShowLoading) {
                $scope.isShowLoading=isShowLoading;
            });

            //页面跳转
            $scope.loadPage=function(url){
                $location.path(url);
            };
            $scope.page="";
            $scope.$on("$viewContentLoaded",function(event){
                $scope.page=$location.url();
                if($location.url()=="/index"){
                    document.title="首页";
                }else if($location.url()=="/article"){
                    document.title="我的文章";
                }else if($location.url()=="/addArticle"){
                    document.title="发表文章";
                }else if($location.url()=="/program"){
                    document.title="栏目管理";
                }else if($location.url()=="/material"){
                    document.title="素材管理";
                }else if($location.url()=="/faq"){
                    document.title="问答管理";
                }else if($location.url()=="/setting"){
                    document.title="账号设置";
                }
            });

            //转换图片视频音频链接
            $scope.trustSrc = function(url){
                return $sce.trustAsResourceUrl(url);
            };

            $scope.aa=123;

        }
    ]);



});


