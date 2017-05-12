/**
 * Created by xuzhihan on 2017/3/2.
 */
requirejs.config({
    map: {
        "*": {
            "style": "lib/require-css/css.min.js"
        }
    },
    waitSeconds: 10,
    baseUrl: "./",
    paths: {
        "root": "js/root",
        "jquery": "lib/jquery/jquery",
        "angular": "lib/angular/angular.min",
        "angular-route": "lib/angular-route/angular-route.min",
        "bootstrap": "lib/bootstrap/dist/js/bootstrap",
        "ui-bootstrap": "lib/angular-bootstrap/ui-bootstrap-tpls.min",

        "jquery.nicescroll": "lib/jquery.nicescroll/jquery.nicescroll",
        "jquery.perfect-scrollbar": "lib/perfect-scrollbar/js/perfect-scrollbar",

        "angular.modal": "service/common/modal/modal",
        "angular.loadList": "service/common/loadList",
        "angular.slideService": "service/index/slideService",

        "angular.slideImg": "directive/slideImg/slideImg",
        "angular.editor": "directive/editor/editor",
        "angular.scrollbar": "directive/scrollbar/scrollbar",


        "angular.filter": "filter/commonFilter",
    },
    shim: {
        "angular": {
            exports: "angular"
        },
        "$": {
            exports: "jquery"
        },
        "angular-route": {
            deps: ["angular"],   //依赖模块
            exports: "ngRouteModule"
        },
        "bootstrap": {
            deps: ["jquery"],   //依赖模块
        },
        "ui-bootstrap": {
            deps: ["angular"],   //依赖模块
        },
        "angular.scrollbar": {
            deps: ["angular","jquery.perfect-scrollbar","style!./lib/perfect-scrollbar/css/perfect-scrollbar.min.css"]   //依赖模块
        },
        "angular.slideImg": {
            deps: ["angular","style!directive/slideImg/slideImg"]   //依赖模块
        },
        "angular.editor": {
            deps: ["angular","style!directive/editor/skin/editorFont.css","style!directive/editor/editor"]   //依赖模块
        }
    }
});

require(["angular", "root"], function(angular){
    angular.bootstrap(document, ["myApp"]);//手动加载模块
});