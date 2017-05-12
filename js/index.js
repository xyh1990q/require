/**
 * Created by xuzhihan on 2017/3/1.
 */
define([
    "jquery.nicescroll",
    "angular.modal",
    "angular.slideService",
    "angular.slideImg",
    "angular.editor",
    "angular.loadList"
],function(){

    myApp.controllerProvider.register('index',[
        "$scope","slideService","loadList","$http","Modal",
            function ($scope,slideService) {
                $scope.page="index";

                $scope.api={
                    "slideList":"json/slideList.json"
                };

                $scope.slideData = slideService.send("get",$scope.api.slideList,{aa:1});
                //$scope.slideData=new slideService($scope.api.slideList);

                $scope.slideData.then(function(data){
                    console.log(data);
                });


                return;
                $scope.slideList=[];
                $scope.cc=[];
                $scope.slideData.getData(function(json){
                    $scope.slideList=json;
                    $scope.cc=json;
                    console.log($scope.cc)
                });
                console.log("ok");




                $("body").on("mouseup","#div",function(){
                    console.log("selected")
                    var range=window.getSelection().getRangeAt(0);
                    if(range.collapsed){//判断是否选取了内容
                        return;
                    }
                    //var container = window.document.createElement('span');
                    //container.appendChild(range.cloneContents());
                    //range.deleteContents();
                    //range.insertNode(container);


                });
            }]
    )
});
