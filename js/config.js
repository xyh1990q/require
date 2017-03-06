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

        "angular.modal": "service/modal/modal",
        "angular.loadList": "service/loadList",
        "angular.leftMenu": "directive/leftMenu/leftMenu",
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
        "angular.leftMenu": {
            deps: ["angular"],   //依赖模块
        }
    }
});

require(["angular", "root"], function(angular){
    angular.bootstrap(document, ["myApp"]);//手动加载模块
});